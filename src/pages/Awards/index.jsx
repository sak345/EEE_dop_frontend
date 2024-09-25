import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAwards from './addAwards.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from '../../GlobalStyles';
import styles from '../../styles';
import Navbar from '../../components/navbar';
import { Select, MenuItem, Typography, Box, makeStyles } from '@material-ui/core';
import SearchBar from '../../components/SearchBar';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Count from '../../components/Count.jsx'
import useStyles from './styles.js';
import ManualAddAward from './manualAddAward.jsx';
import AwardTile from './awardTile.jsx';
import * as XLSX from 'xlsx';

function AwardsPage() {
    const classes = useStyles();
    const [awards, setAwards] = useState([]);
    let sheetNames = [...new Set(awards.map(award => award.sheetName))];
    const [selectedSheet, setSelectedSheet] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
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
                pending: 'Loading...',
                error: 'Error in loading data'
            }
        );

        fetchPromise
            .then((response) => {
                setAwards(response.data.awards);
            })
            .catch((error) => {
                console.log("Error in reading data", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const countInSelectedSheet = awards.filter(award =>
        award.sheetName === selectedSheet && JSON.stringify(award).toLowerCase().includes(searchTerm.toLowerCase())
    ).length;

    const downloadExcel = () => {
        const filteredData = awards.filter(award =>
            award.sheetName === selectedSheet && Object.values(award).some(val =>
                val !== null && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        if (filteredData.length === 0) {
            toast.error('No awards to download.');
            return;
        }

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, selectedSheet);
        XLSX.writeFile(wb, `Awards_${selectedSheet}.xlsx`);
    };

    return (
        <div className={loading ? classes.blur : ''}>
            <GlobalStyles />
            <Navbar />
            <header>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Awards
                    </Typography>
                </Box>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {awards && awards.length !== 0 && <Select
                            value={selectedSheet}
                            onChange={(e) => setSelectedSheet(e.target.value)}
                            className={classes.select}
                            placeholder='Select Year'
                            style={{
                                width: '150px', height: '40px', padding: '0 10px', borderRadius: '0.8rem',
                            }}
                        >
                            {sheetNames.map((name) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </Select>}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {localStorage.getItem('role') === 'admin' &&
                                <AddAwards data={awards} setData={setAwards} style={{ width: '80px' }} />
                            }
                            <ManualAddAward setAwards={setAwards} />
                        </div>
                    </div>
                    {awards && awards.length !== 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <Count data={countInSelectedSheet} />
                    </div>}
                </div>

                <AwardTile awards={awards} setAwards={setAwards} selectedSheet={selectedSheet} searchTerm={searchTerm} />
                {awards && awards.length !== 0 && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={downloadExcel} style={{
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        marginRight: '55px',
                        marginBottom: '20px',
                    }}>Download</button>
                </div>}
            </header>
        </div>
    );
}

export default AwardsPage;