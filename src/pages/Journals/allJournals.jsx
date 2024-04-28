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
import SelectColumns from '../../components/SelectColumns';
import * as XLSX from 'xlsx';

function AllJournals() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumns, setSelectedColumns] = useState([
        'SlNo', 'UniqueId', 'Level', 'Authors', 'Article_Title', 'WebLink', 'Scopus', 'Web_Of_Sc', 'PUBMED', 'IEEE', 'Indian_Citation_Index', 'Google_Scholar', 'Year', 'Journal_Name', 'Scopus_Citation', 'WOS_Citation', 'IEEE_Citation', 'ICI_Citation', 'GS_Citation', 'Affiliation', 'Vol_No', 'Issue_No', 'B_Page', 'P_Page', 'SNIP', 'SJR', 'Impact_Factor', 'ISSN', 'ISBN', 'PublicationType', 'owner', 'Actions'
    ]);

    const downloadExcel = () => {
        const filteredData = data.filter(journal =>
            Object.values(journal).some(val =>
                val !== null && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        const dataWithSelectedColumns = filteredData.map(item => {
            let newItem = {};
            selectedColumns.forEach(column => {
                if (column !== 'Actions') {
                    newItem[column] = item[column];
                }
            });
            return newItem;
        });
        if (dataWithSelectedColumns.length === 0) {
            toast.error('No journals to download.');
            return;
        }

        const ws = XLSX.utils.json_to_sheet(dataWithSelectedColumns);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "Journals.xlsx");
    };

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
                setData(response.data.journals);
            })
            .catch((error) => {
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <SelectColumns selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={downloadExcel} style={{
                            backgroundColor: '#4CAF50', /* Green */
                            border: 'none',
                            color: 'white',
                            padding: '15px 32px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '4px 2px',
                            marginRight: '500px',
                            cursor: 'pointer',
                            borderRadius: '12px'
                        }}>Download</button>
                        <AddJournal data={data} setData={setData} />

                    </div>
                </div>
            </header>

            <TableComponent data={dataToDisplay} deleteJournal={deleteJournal} searchTerm={searchTerm} selectedColumns={selectedColumns} />
        </div>
    );
}

export default AllJournals;