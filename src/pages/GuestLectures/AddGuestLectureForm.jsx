import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    speaker: yup.string().required('Speaker is required'),
    date: yup.date().required('Date is required'),
    time: yup.string().required('Time is required'),
    venue: yup.string().required('Venue is required'),
    description: yup.string().required('Description is required'),
    department: yup.string().required('Department is required'),
    contactInformation: yup.string(),
    registrationLink: yup.string().url('Enter a valid URL'),
    duration: yup.string(),
    attachments: yup.array().of(yup.string().url('Must be a valid URL')),
});

function AddGuestLectureForm({ onLectureAdded }) {
    // const [formData, setFormData] = useState({
    //     title: '',
    //     speaker: '',
    //     date: '',
    //     time: '',
    //     venue: '',
    //     description: '',
    //     department: '',
    //     contactInformation: '',
    //     registrationLink: '',
    //     duration: '',
    //     attachments: '',
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const config = {
    //         method: 'post',
    //         url: process.env.REACT_APP_BACKEND_URL + 'guestLectures',
    //         headers: {
    //             Authorization: localStorage.getItem('Token'),
    //             'Content-Type': 'application/json',
    //         },
    //         data: formData,
    //     };

    //     const submitPromise = axios.request(config);

    //     toast.promise(
    //         submitPromise,
    //         {
    //             pending: 'Adding guest lecture...',
    //             success: 'Guest lecture added successfully',
    //             error: 'Error in adding guest lecture',
    //         }
    //     );

    //     submitPromise
    //         .then((response) => {
    //             onLectureAdded(response.data);
    //             setFormData({
    //                 title: '',
    //                 speaker: '',
    //                 date: '',
    //                 time: '',
    //                 venue: '',
    //                 description: '',
    //                 department: '',
    //                 contactInformation: '',
    //                 registrationLink: '',
    //                 duration: '',
    //                 attachments: '',
    //             });
    //         })
    //         .catch((error) => {
    //             console.log('Error in adding guest lecture', error);
    //         });
    // };

    const formik = useFormik({
        initialValues: {
            title: '',
            speaker: '',
            date: '',
            time: '',
            venue: '',
            description: '',
            department: '',
            contactInformation: '',
            registrationLink: '',
            duration: '',
            attachments: [],
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const filteredValues = {
                ...values,
                attachments: values.attachments.filter(attachment => attachment.trim() !== ''),
            };
            const config = {
                method: 'post',
                url: process.env.REACT_APP_BACKEND_URL + 'guestLectures',
                headers: {
                    Authorization: localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
                data: values,
            };

            const submitPromise = axios.request(config);

            toast.promise(
                submitPromise,
                {
                    pending: 'Adding guest lecture...',
                    success: 'Guest lecture added successfully',
                    error: 'Error in adding guest lecture',
                }
            );

            submitPromise
                .then((response) => {
                    onLectureAdded(response.data);
                    resetForm();
                })
                .catch((error) => {
                    console.log('Error in adding guest lecture', error);
                });
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Add Guest Lecture
            </Typography>
            <TextField
                label="Title"
                name="title"
                // value={formData.title}
                // onChange={handleChange}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
                label="Speaker"
                name="speaker"
                // value={formData.speaker}
                // onChange={handleChange}
                value={formik.values.speaker}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                error={formik.touched.speaker && Boolean(formik.errors.speaker)}
                helperText={formik.touched.speaker && formik.errors.speaker}
            />
            <TextField
                label="Date"
                name="date"
                type="date"
                // value={formData.date}
                // onChange={handleChange}
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
            />
            <TextField
                label="Time"
                name="time"
                type="time"
                // value={formData.time}
                // onChange={handleChange}
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={formik.touched.time && Boolean(formik.errors.time)}
                helperText={formik.touched.time && formik.errors.time}
            />
            <TextField
                label="Venue"
                name="venue"
                // value={formData.venue}
                // onChange={handleChange}
                value={formik.values.venue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                error={formik.touched.venue && Boolean(formik.errors.venue)}
                helperText={formik.touched.venue && formik.errors.venue}
            />
            <TextField
                label="Description"
                name="description"
                // value={formData.description}
                // onChange={handleChange}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
                label="Department"
                name="department"
                // value={formData.department}
                // onChange={handleChange}
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                required
                margin="normal"
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
            />
            <TextField
                label="Contact Information"
                name="contactInformation"
                // value={formData.contactInformation}
                // onChange={handleChange}
                value={formik.values.contactInformation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
                error={formik.touched.contactInformation && Boolean(formik.errors.contactInformation)}
                helperText={formik.touched.contactInformation && formik.errors.contactInformation}
            />
            <TextField
                label="Registration Link"
                name="registrationLink"
                // value={formData.registrationLink}
                // onChange={handleChange}
                value={formik.values.registrationLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
                error={formik.touched.registrationLink && Boolean(formik.errors.registrationLink)}
                helperText={formik.touched.registrationLink && formik.errors.registrationLink}
            />
            <TextField
                label="Duration"
                name="duration"
                // value={formData.duration}
                // onChange={handleChange}
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
                error={formik.touched.duration && Boolean(formik.errors.duration)}
                helperText={formik.touched.duration && formik.errors.duration}
            />
            <TextField
                label="Attachments (comma separated URLs)"
                name="attachments"
                // value={formData.attachments}
                // onChange={handleChange}
                value={formik.values.attachments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
                error={formik.touched.attachments && Boolean(formik.errors.attachments)}
                helperText={formik.touched.attachments && formik.errors.attachments}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Lecture
            </Button>

        </Box>
    );
}

export default AddGuestLectureForm;