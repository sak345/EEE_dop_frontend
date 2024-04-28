import React from 'react';
import readXlsxFile from 'read-excel-file';
import './addJournals.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddJournals({ data, setData }) {

    const handleFileUpload = async event => {
        const file = event.target.files[0];
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

            const payload = JSON.stringify(newData);
            const payloadSize = new TextEncoder().encode(payload).length;
            console.log(payloadSize)

            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("Token"));
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Content-Length", payloadSize.toString());

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: payload,
                redirect: "follow",
            };

            const initialLength = data.length;
            const uploadPromise = fetch(process.env.REACT_APP_BACKEND_URL + "journals", requestOptions);

            toast.promise(
                uploadPromise,
                {
                    pending: 'Uploading journals...',
                    success: 'Journals uploaded successfully',
                    error: 'Error in uploading journals'
                }
            );

            uploadPromise
                .then(async (response) => {
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

                })
                .catch((error) => {
                    toast.error('Error adding journals');
                    console.error('There was an error!', error);
                });
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
