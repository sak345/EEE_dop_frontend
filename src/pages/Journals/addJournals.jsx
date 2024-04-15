import React from 'react';
import readXlsxFile from 'read-excel-file';
import './addJournals.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddJournals({ data, setData }) {

    const handleFileUpload = async event => {
        const file = event.target.files[0];
        toast.info('Uploading Excel file...');
        readXlsxFile(file).then(async (rows) => {
            // transform array of arrays into array of objects
            let newData = rows.slice(1).map(row => {
                let obj = {};
                row.forEach((value, index) => {
                    obj[rows[0][index]] = value;
                });
                obj.owner = localStorage.getItem("name");
                return obj;
            });


            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("Token"));
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(newData),
                redirect: "follow",
            };

            const initialLength = data.length;
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + "journals", requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Update data only with the journals returned from the server

                const response2 = await axios.get(process.env.REACT_APP_BACKEND_URL + "journals", {
                    headers: {
                        Authorization: localStorage.getItem("Token"),
                    }
                });
                const updatedData = response2.data;
                const NoOfJournalsAdded = updatedData.journals.length - initialLength;
                toast.dismiss()
                toast.success(`${NoOfJournalsAdded} journal(s) added!`);

                setData(updatedData.journals);

            } catch (error) {
                toast.error('Error adding journals');
                console.error('There was an error!', error);
            }
        });
    };

    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">
                Add Journal
            </label>
            <input id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </div >
    );
}

export default AddJournals;
