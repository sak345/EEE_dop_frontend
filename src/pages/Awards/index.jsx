import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAwards from './addAwards.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from '../../GlobalStyles';
import styles from '../../styles';
import Navbar from '../../components/navbar';
import NoDataMessage from '../../components/NoDataMessage.jsx';
import { Container, Typography, Card, CardContent, Grid, Select, MenuItem, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/SearchBar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 200,
        backgroundColor: 'white',
        margin: theme.spacing(1),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));


const handleDelete = (id, deleteAward) => {
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this award?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteAward(id)
            },
            {
                label: 'No',
                onClick: () => { }
            }
        ]
    });
};

function AwardsPage() {
    const classes = useStyles();
    const [awards, setAwards] = useState([]);
    let sheetNames = [...new Set(awards.map(award => award.sheetName))];
    const [selectedSheet, setSelectedSheet] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAwards()
    }, []);
    useEffect(() => {
        let sheetNames = [...new Set(awards.map(award => award.sheetName))];
        if (sheetNames.length > 0) {
            setSelectedSheet(sheetNames[0]);
        }
    }, [awards]);

    const fetchAwards = async () => {
        const config = {
            method: "get",
            url: process.env.REACT_APP_BACKEND_URL + "awards",
            headers: {
                Authorization: localStorage.getItem("Token"),
            }
        };

        const fetchPromise = axios.request(config);

        toast.promise(
            fetchPromise,
            {
                pending: 'Fetching data...',
                success: 'Data fetched successfully',
                error: 'Error in fetching data'
            }
        );

        fetchPromise
            .then((response) => {
                setAwards(response.data.awards);
            })
            .catch((error) => {
                console.log("Error in reading data", error);
            });
    };

    const deleteAward = async (id) => {
        try {
            //? api patch req
            let config = {
                method: 'delete',
                url: `${process.env.REACT_APP_BACKEND_URL}awards/${id}`,
                headers: {
                    Authorization: localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
            }
            axios
                .request(config)
                .then((response) => {
                    if (response.status == 200) {
                        toast.success('Award deleted successfully');
                    }
                    const updatedData = awards.filter(item => item._id !== id);
                    setAwards(updatedData);
                })
                .catch((error) => {
                    console.log(error)
                    const errorMessage = error.response ? error.response.data : error.message;
                    toast.error(`Error deleting award: ${errorMessage}`);
                })
        } catch (err) {
            console.error(err)
            toast.error(`Error deleting award: ${err.message}`);
        }
    };

    return (
        <div>
            <GlobalStyles />
            <Navbar />
            <header>
                <h1 style={styles.pageTitle}>Awards</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Select
                        value={selectedSheet}
                        onChange={(e) => setSelectedSheet(e.target.value)}
                        className={classes.select}
                        placeholder='Select Year'
                        style={{
                            height: '40px', padding: '0 10px', borderRadius: '0.8rem', margin: '10px 2px',
                        }}
                    >
                        {sheetNames.map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                    <AddAwards data={awards} setData={setAwards} />
                </div>
                <Container style={{ maxWidth: '100%', justifyContent: 'space-between' }}>
                    {awards.length === 0 ? (
                        <NoDataMessage data={"Award"} />
                    ) : (
                        <Grid container spacing={3} style={{ padding: '20px' }}>
                            {awards.filter(award => award.sheetName === selectedSheet && JSON.stringify(award).toLowerCase().includes(searchTerm.toLowerCase())).map((award) => (
                                <Grid item xs={12} sm={6} md={4} key={award._id}>
                                    <Card style={{ height: '300px', overflow: 'auto', margin: '10px', padding: '20px', borderRadius: '15px' }}>
                                        <CardContent>
                                            <Typography variant="h5" style={{ marginBottom: 20 }}>{award.facultyName}</Typography>
                                            {award.award && <Typography><strong>Award:</strong> {award.award}</Typography>}
                                            {award.awardingAgency && <Typography><strong>Awarding Agency:</strong> {award.awardingAgency}</Typography>}
                                            {award.date && <Typography><strong>Date:</strong> {award.date}</Typography>}
                                            {award.document && <Typography><strong>Document:</strong> {award.document}</Typography>}
                                        </CardContent>
                                        {localStorage.getItem('role') === 'admin' && (
                                            <CardActions>
                                                <Button size="small" color="secondary" onClick={() => handleDelete(award._id, deleteAward)}>Delete</Button>
                                            </CardActions>
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container >
            </header>
        </div>




    );
}

export default AwardsPage;