import React from 'react';
import readXlsxFile from 'read-excel-file';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Journals/addJournals.css'
import { read, utils } from 'xlsx';

function AddAwards({ data, setData }) {

    const handleFileUpload = async event => {
        const file = event.target.files[0];
        const initialLength = data.length;

        // Read the Excel file
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onloadend = (event) => {
            const arrayBuffer = fileReader.result;
            const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });

            // Get the names of all the sheets in the file
            const sheetNames = workbook.SheetNames;
            console.log(sheetNames)

            // Initialize an array to hold all the data
            let allData = [];

            // Loop through the sheet names
            sheetNames.forEach((sheetName) => {
                // Read the data from the sheet
                const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false });

                // Transform array of arrays into array of objects
                let newData = sheetData.slice(2).map(row => {
                    let obj = {};
                    let isEmpty = true; // Assume the row is empty until we find a non-empty value

                    row.slice(1).forEach((value, index) => {
                        if (value !== null && value !== undefined && value !== '') {
                            isEmpty = false; // We found a non-empty value
                        }
                        obj[sheetData[1][index + 1]] = value;
                    });
                    obj['sheetName'] = sheetName; // Add the sheet name to each row
                    return isEmpty ? null : obj;
                }).filter(obj => obj !== null); // Remove null values from the array

                // Add the data to the array
                allData.push(...newData);
            });

            console.log(allData)

            let uploadPromises = allData.map((award) => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", localStorage.getItem("Token"));
                myHeaders.append("Content-Type", "application/json");

                let formattedDate = '';
                if (award['Date']) {
                    let date = new Date(award['Date']);
                    formattedDate = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
                }

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({
                        facultyName: award['Faculty Name'],
                        award: award['Award'],
                        awardingAgency: award['Awarding Agency'],
                        date: formattedDate,
                        document: award['Any document?'],
                        sheetName: award['sheetName'],
                    }),
                };

                return fetch(process.env.REACT_APP_BACKEND_URL + "awards", requestOptions)
                    .catch(error => {
                        console.error('Error:', error);
                        return Promise.reject('Error uploading awards');
                    });
            });

            toast.promise(
                Promise.all(uploadPromises),
                {
                    pending: `Uploading ${file.name}...`,
                    success: 'All awards uploaded successfully',
                    error: 'Error uploading awards'
                }
            ).then(async () => {
                const response2 = await axios.get(process.env.REACT_APP_BACKEND_URL + "awards", {
                    headers: {
                        Authorization: localStorage.getItem("Token"),
                    }
                });
                const updatedData = response2.data;
                const NoOfAwardsAdded = updatedData.awards.length - initialLength;
                toast.dismiss();
                toast.success(`${NoOfAwardsAdded} award(s) added!`);

                setData(updatedData.awards);
            }).catch((error) => {
                toast.error('Error adding awards');
                console.error('There was an error!', error);
            });

            if (event.target.files[1]) {
                fileReader.readAsArrayBuffer(event.target.files[1]);
            }
        };
        fileReader.readAsArrayBuffer(file);

    };

    return (
        <div style={{ marginBottom: 90, position: 'relative' }}>
            <label htmlFor="file-upload" className="custom-file-upload">
                Upload
            </label>
            <input id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </div >
    );
}

export default AddAwards;