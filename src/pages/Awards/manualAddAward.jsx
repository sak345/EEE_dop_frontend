import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import useStyles from './styles';

function ManualAddAward({ setAwards }) {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        facultyName: '',
        award: '',
        awardingAgency: '',
        date: '',
        document: '',
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.facultyName = formData.facultyName ? "" : "This field is required.";
        tempErrors.award = formData.award ? "" : "This field is required.";
        tempErrors.awardingAgency = formData.awardingAgency ? "" : "This field is required.";
        tempErrors.date = formData.date ? "" : "This field is required.";

        // Date format validation
        const datePattern = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
        if (formData.date && !datePattern.test(formData.date)) {
            tempErrors.date = "Date must be in 'Month Year' format.";
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        if (!validate()) return;

        handleClose();

        event.preventDefault();
        console.log("Handling submit")
        let formattedDate = '';
        if (formData.date) {
            let date = new Date(formData.date);
            // formattedDate = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
            formattedDate = date.getFullYear();
        }

        const newAward = { ...formData, sheetName: formattedDate };

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("Token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newAward),
        };

        const fetchPromise = fetch(process.env.REACT_APP_BACKEND_URL + "awards", requestOptions);

        toast.promise(
            fetchPromise,
            {
                pending: 'Adding award...',
                // success: 'Award uploaded successfully',
                // error: 'Error uploading award'
            }
        );

        fetchPromise
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Get the new award from the response
                const award = await response.json();
                toast.dismiss();
                toast.success('Award added successfully');

                // Add the new award to the awards state
                setAwards(prevAwards => [...prevAwards, award]);

                // Clear the form
                setFormData({
                    facultyName: '',
                    award: '',
                    awardingAgency: '',
                    date: '',
                    document: '',
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ width: '150px', height: '40px', border: 'solid', marginTop: '10px' }}>
                Add Award
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Award</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="facultyName"
                        label="Faculty Name"
                        type="text"
                        fullWidth
                        value={formData.facultyName}
                        onChange={handleInputChange}
                        required
                        className={classes.textField}
                        error={!!errors.facultyName}
                        helperText={errors.facultyName}
                    />
                    <TextField
                        margin="dense"
                        id="award"
                        label="Award Name"
                        type="text"
                        fullWidth
                        value={formData.award}
                        onChange={handleInputChange}
                        required
                        className={classes.textField}
                        error={!!errors.award}
                        helperText={errors.award}

                    />
                    <TextField
                        margin="dense"
                        id="awardingAgency"
                        label="Awarding Agency"
                        type="text"
                        fullWidth
                        value={formData.awardingAgency}
                        onChange={handleInputChange}
                        required
                        className={classes.textField}
                        error={!!errors.awardingAgency}
                        helperText={errors.awardingAgency}
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        label="Date"
                        type="text"
                        fullWidth
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder='Month Year'
                        required
                        className={classes.textField}
                        error={!!errors.date}
                        helperText={errors.date}
                    />
                    <TextField
                        margin="dense"
                        id="document"
                        label="Document"
                        type="text"
                        fullWidth
                        value={formData.document}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(event) => { handleSubmit(event); }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManualAddAward;