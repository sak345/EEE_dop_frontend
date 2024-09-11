import React from 'react';
import { Container, Typography, Card, CardContent, Grid, CardActions, Button } from '@material-ui/core';
import NoDataMessage from '../../components/NoDataMessage.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function AwardTile({ awards, setAwards, selectedSheet, searchTerm }) {

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
    );
}

export default AwardTile;