import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 200,
        backgroundColor: 'white',
        margin: theme.spacing(1),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textField: {
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-root': {
            margin: '10px -10px',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        marginLeft: theme.spacing(1),
    },
}));

function ManualAddJournal({ data, setData }) {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        UniqueId: '',
        Level: '',
        Authors: '',
        Article_Title: '',
        WebLink: '',
        Scopus: '',
        Web_Of_Sc: '',
        PUBMED: '',
        IEEE: '',
        Indian_Citation_Index: '',
        Google_Scholar: '',
        Year: 0,
        Journal_Name: '',
        Scopus_Citation: 0,
        WOS_Citation: 0,
        IEEE_Citation: 0,
        ICI_Citation: 0,
        GS_Citation: 0,
        Affiliation: '',
        Vol_No: '',
        Issue_No: '',
        B_Page: '',
        P_Page: '',
        SNIP: 0,
        SJR: 0,
        Impact_Factor: 0,
        ISSN: '',
        ISBN: '',
        PublicationType: '',
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (Array.isArray(data)) {
            // Determine the highest serial number in the existing journals
            const maxSlNo = data.reduce((max, journal) => Math.max(max, journal.SlNo), 0);
            // Set the initial serial number for the new journal entry
            setFormData(prevFormData => ({
                ...prevFormData,
                SlNo: maxSlNo + 1
            }));
        } else {
            console.error('Data is not an array:', data);
        }
    }, [data]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Handling submit")
        const owner = localStorage.getItem('name');

        // Increment the serial number for the new journal entry
        setFormData(prevFormData => ({
            ...prevFormData,
            SlNo: prevFormData.SlNo + 1
        }));

        const newJournal = { ...formData, owner };
        console.log(newJournal);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("Token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify([newJournal]),
        };

        const fetchPromise = fetch(process.env.REACT_APP_BACKEND_URL + "journals", requestOptions);

        toast.promise(
            fetchPromise,
            {
                pending: 'Adding Journal...',
                // success: 'Journal added successfully!',
                // error: 'Error adding journal'
            }
        );

        fetchPromise
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', response);
                    console.error('Error details:', errorText);
                    if (response.status === 409) {
                        const errorData = JSON.parse(errorText);
                        toast.error(errorData.message);
                        console.error('Conflict details:', errorData.conflicts);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {

                    // Get the new journal from the response
                    const journal = await response.json();
                    toast.dismiss();
                    toast.success('Journal added successfully!');

                    // Add the new journal to the existing journals state variable
                    setData(prevJournals => [...prevJournals, journal]);

                    // Clear the form
                    setFormData({
                        UniqueId: '',
                        Level: '',
                        Authors: '',
                        Article_Title: '',
                        WebLink: '',
                        Scopus: '',
                        Web_Of_Sc: '',
                        PUBMED: '',
                        IEEE: '',
                        Indian_Citation_Index: '',
                        Google_Scholar: '',
                        Year: 0,
                        Journal_Name: '',
                        Scopus_Citation: 0,
                        WOS_Citation: 0,
                        IEEE_Citation: 0,
                        ICI_Citation: 0,
                        GS_Citation: 0,
                        Affiliation: '',
                        Vol_No: '',
                        Issue_No: '',
                        B_Page: '',
                        P_Page: '',
                        SNIP: 0,
                        SJR: 0,
                        Impact_Factor: 0,
                        ISSN: '',
                        ISBN: '',
                        PublicationType: '',
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.dismiss();
                toast.error('Error adding journal');
            });
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ width: '150px', height: '40px', border: 'solid', marginTop: '10px' }}>
                Add Journal
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Journal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="UniqueId"
                        label="Unique ID"
                        type="text"
                        fullWidth
                        value={formData.UniqueId}
                        onChange={handleInputChange}
                        required
                        className={classes.textField}
                    />
                    <TextField
                        margin="dense"
                        id="Level"
                        label="Level"
                        type="text"
                        fullWidth
                        value={formData.Level}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Authors"
                        label="Authors"
                        type="text"
                        fullWidth
                        value={formData.Author}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Article_Title"
                        label="Article Title"
                        type="text"
                        fullWidth
                        value={formData.Article_Title}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="WebLink"
                        label="Web Link"
                        type="text"
                        fullWidth
                        value={formData.WebLink}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Scopus"
                        label="Scopus"
                        type="text"
                        fullWidth
                        value={formData.Scopus}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Web_Of_Sc"
                        label="Web of Sc"
                        type="text"
                        fullWidth
                        value={formData.Web_Of_Sc}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="PUBMED"
                        label="PUBMED"
                        type="text"
                        fullWidth
                        value={formData.PUBMED}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="IEEE"
                        label="IEEE"
                        type="text"
                        fullWidth
                        value={formData.IEEE}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Indian_Citation_Index"
                        label="Indian Citation Index"
                        type="text"
                        fullWidth
                        value={formData.Indian_Citation_Index}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Google_Scholar"
                        label="Google Scholar"
                        type="text"
                        fullWidth
                        value={formData.Google_Scholar}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Year"
                        label="Year"
                        type="number"
                        fullWidth
                        value={formData.Year}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Journal_Name"
                        label="Journal_Name"
                        type="text"
                        fullWidth
                        value={formData.Journal_Name}
                        onChange={handleInputChange}
                        className={classes.textField}

                    /><TextField
                        margin="dense"
                        id="Scopus_Citation"
                        label="Scopus_Citation"
                        type="number"
                        fullWidth
                        value={formData.Scopus_Citation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    /><TextField
                        margin="dense"
                        id="WOS_Citation"
                        label="WOS Citation"
                        type="number"
                        fullWidth
                        value={formData.WOS_Citation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    /><TextField
                        margin="dense"
                        id="IEEE_Citation"
                        label="IEEE Citation"
                        type="number"
                        fullWidth
                        value={formData.IEEE_Citation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="ICI_Citation"
                        label="ICI Citation"
                        type="number"
                        fullWidth
                        value={formData.ICI_Citation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="GS_Citation"
                        label="GS Citation"
                        type="number"
                        fullWidth
                        value={formData.GS_Citation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Affiliation"
                        label="Affiliation"
                        type="text"
                        fullWidth
                        value={formData.Affiliation}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Vol_No"
                        label="Vol No"
                        type="text"
                        fullWidth
                        value={formData.Vol_No}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Issue_No"
                        label="Issue No"
                        type="text"
                        fullWidth
                        value={formData.Issue_No}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="B_Page"
                        label="B Page"
                        type="text"
                        fullWidth
                        value={formData.B_Page}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="P_Page"
                        label="P Page"
                        type="text"
                        fullWidth
                        value={formData.P_Page}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="SNIP"
                        label="SNIP"
                        type="numnber"
                        fullWidth
                        value={formData.SNIP}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="SJR"
                        label="SJR"
                        type="numnber"
                        fullWidth
                        value={formData.SJR}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="Impact_Factor"
                        label="Impact Factor"
                        type="numnber"
                        fullWidth
                        value={formData.Impact_Factor}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="ISSN"
                        label="ISSN"
                        type="text"
                        fullWidth
                        value={formData.ISSN}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="ISBN"
                        label="ISBN"
                        type="text"
                        fullWidth
                        value={formData.ISBN}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                    <TextField
                        margin="dense"
                        id="PublicationType"
                        label="Publication Type"
                        type="text"
                        fullWidth
                        value={formData.PublicationType}
                        onChange={handleInputChange}
                        className={classes.textField}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(event) => { handleClose(); handleSubmit(event) }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManualAddJournal;