import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import styles from '../../styles';
import AddJournal from './addJournals';
import TableComponent from '../../components/TableComponent';
import axios from 'axios';
import GlobalStyles from '../../GlobalStyles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../../components/SearchBar';

function AllJournals() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const deleteJournal = async (journal) => {
        try {
            //? api patch req
            let config = {
                method: 'delete',
                url: `${process.env.REACT_APP_BACKEND_URL}journals/${journal._id}`,
                headers: {
                    Authorization: localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
            }
            console.log(config.url);
            axios
                .request(config)
                .then((response) => {
                    if (response.status == 200) {
                        toast.success('Journal deleted successfully');
                    }
                    const updatedData = data.filter(item => item._id !== journal._id);
                    setData(updatedData);
                })
                .catch((error) => {
                    console.log(error)
                    const errorMessage = error.response ? error.response.data : error.message;
                    toast.error(`Error deleting journal: ${errorMessage}`);
                })
        } catch (err) {
            console.error(err)
            toast.error(`Error deleting journal: ${err.message}`);
        }
    };

    useEffect(() => {

        const config = {
            method: "get",
            url: process.env.REACT_APP_BACKEND_URL + "journals",
            headers: {
                Authorization: localStorage.getItem("Token"),
            }
        };

        toast.info('Fetching data...');

        axios
            .request(config)
            .then((response) => {
                setData(response.data.journals);
                toast.dismiss();
            })
            .catch((error) => {
                toast.error(`Error in fetching data`);
                console.log("Error in reading data", error);
            });
    }, []);

    const filteredData = data.filter(journal =>
        Object.values(journal).some(val =>
            val !== null && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const dataToDisplay = searchTerm ? filteredData : data;

    return (
        <div>
            <GlobalStyles />
            <Navbar />
            <header>
                <h1 style={styles.pageTitle}>Journals</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <AddJournal data={data} setData={setData} />
            </header>

            <TableComponent data={dataToDisplay} deleteJournal={deleteJournal} searchTerm={searchTerm} />
        </div>
    );
}

export default AllJournals;
