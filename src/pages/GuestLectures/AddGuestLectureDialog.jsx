import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import AddGuestLectureForm from './AddGuestLectureForm';

function AddGuestLectureDialog({ onLectureAdded }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLectureAdded = (newLecture) => {
        onLectureAdded(newLecture);
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Guest Lecture
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                {/* <DialogTitle>Add Guest Lecture</DialogTitle> */}
                <DialogContent>
                    <AddGuestLectureForm onLectureAdded={handleLectureAdded} handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddGuestLectureDialog;