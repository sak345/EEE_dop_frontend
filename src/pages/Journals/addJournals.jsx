import React from 'react';
import readXlsxFile from 'read-excel-file';
import axios from 'axios';


function AddJournals({ setData }) {

    const handleFileUpload = event => {
        const file = event.target.files[0];
        readXlsxFile(file).then((rows) => {
            // transform array of arrays into array of objects
            let newData = rows.slice(1).map(row => {
                let obj = {};
                row.forEach((value, index) => {
                    obj[rows[0][index]] = value;
                });
                obj.owner = localStorage.getItem("userId");
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

            fetch(process.env.REACT_APP_BACKEND_URL + "journals", requestOptions)
                .then((response) => {
                    console.log(response);
                    response.text();
                })
                .then((result) => console.log(result))
                .catch((error) => console.log('There was an error!', error));

            // send a POST request to your backend
            // axios.post('/api/journals', newData)
            //     .then(response => {
            //         console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.error('There was an error!', error);
            //     });

            setData(newData);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} style={{ marginBottom: 10 }} />
        </div >
    );
}

export default AddJournals;
