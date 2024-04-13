import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import styles from '../../styles';
import AddJournal from './addJournals';
import TableComponent from '../../components/TableComponent';
import axios from 'axios';

function AllJournals() {

    const [data, setData] = useState([]);

    useEffect(() => {

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_BACKEND_URL + "journals",
            headers: {
                Authorization: localStorage.getItem("Token"),
            }
        };

        axios
            .request(config)
            .then((response) => {
                setData(response.data.journals);
                console.log("Data read from database")
            })
            .catch((error) => {
                console.log("Error in reading data", error);
            });
    }, [data]); // empty dependency array means this effect runs once on mount

    return (
        <div>
            <Navbar />
            <header>
                <h1 style={styles.pageTitle}>Journals</h1>
                <AddJournal setData={setData} />
            </header>

            <TableComponent data={data} />
        </div>
    );
}

export default AllJournals;