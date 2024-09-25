import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Tabs, Tab, Box } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GuestLectureCard from './GuestLectureCard';
import Navbar from '../../components/navbar';
import GlobalStyles from '../../GlobalStyles';
import AddGuestLectureDialog from './AddGuestLectureDialog';
import NoDataMessage from '../../components/NoDataMessage.jsx';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    blur: {
        filter: 'blur(5px)',
        pointerEvents: 'none',
        userSelect: 'none',
    },
}));

function GuestLecturesPage() {
    const classes = useStyles();
    const [upcomingLectures, setUpcomingLectures] = useState([]);
    const [pastLectures, setPastLectures] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLectures = async () => {
            setLoading(true);
            const config = {
                method: "get",
                url: process.env.REACT_APP_BACKEND_URL + "guestLectures",
                headers: {
                    Authorization: localStorage.getItem("Token"),
                }
            };
            const fetchPromise = axios.request(config);
            toast.promise(
                fetchPromise,
                {
                    pending: 'Please wait...',
                    error: 'Error in loading data'
                }
            );
            fetchPromise
                .then((response) => {
                    console.log(response.data);
                    const lectures = response.data;
                    const now = new Date();
                    setUpcomingLectures(lectures.filter(lecture => new Date(lecture.date) > now));
                    setPastLectures(lectures.filter(lecture => new Date(lecture.date) <= now));
                })
                .catch((error) => {
                    console.error('Error fetching guest lectures:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchLectures();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLectureAdded = (newLecture) => {
        if (new Date(newLecture.date) > new Date()) {
            setUpcomingLectures([...upcomingLectures, newLecture]);
        } else {
            setPastLectures([...pastLectures, newLecture]);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this lecture?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleDelete = async (id) => {
        const config = {
            method: 'delete',
            url: `${process.env.REACT_APP_BACKEND_URL}guestLectures/${id}`,
            headers: {
                Authorization: localStorage.getItem('Token'),
                'Content-Type': 'application/json',
            },
        };

        const deletePromise = axios.request(config);

        toast.promise(
            deletePromise,
            {
                pending: 'Deleting guest lecture...',
                success: 'Guest lecture deleted successfully',
                error: 'Error in deleting guest lecture',
            }
        );

        deletePromise
            .then(() => {
                const newUpcomingLecture = upcomingLectures.filter(lecture => lecture.id !== id)
                const newPastLecture = pastLectures.filter(lecture => lecture.id !== id)
                setUpcomingLectures(newUpcomingLecture);
                setPastLectures(newPastLecture);
            })
            .catch((error) => {
                toast.error('Error deleting guest lecture');
                console.error('Error deleting guest lecture:', error);
            });
    };

    return (
        <div className={loading ? classes.blur : ''}>
            <GlobalStyles />
            <Navbar />
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Guest Lectures
                    </Typography>
                </Box>
                {localStorage.getItem('role') === 'admin' && <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddGuestLectureDialog onLectureAdded={handleLectureAdded} />
                </Box>}
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Upcoming Lectures" />
                    <Tab label="Past Lectures" />
                </Tabs>
                <Box sx={{ mt: 3 }}>
                    {tabValue === 0 && (
                        upcomingLectures && upcomingLectures.length !== 0 ? <Grid container spacing={3}>
                            {upcomingLectures.map(lecture => (
                                <Grid item xs={12} sm={6} md={4} key={lecture._id}>
                                    <GuestLectureCard key={lecture._id} lecture={lecture} onDelete={confirmDelete} />
                                </Grid>
                            ))}
                        </Grid> : <NoDataMessage data={"upcoming lecture"} />
                    )}
                    {tabValue === 1 && (
                        pastLectures && pastLectures.length !== 0 ? <Grid container spacing={3}>
                            {pastLectures.map(lecture => (
                                <Grid item xs={12} sm={6} md={4} key={lecture._id}>
                                    <GuestLectureCard key={lecture._id} lecture={lecture} onDelete={confirmDelete} />
                                </Grid>
                            ))}
                        </Grid> : <NoDataMessage data={"past lecture"} />
                    )}
                </Box>
            </Container>
        </div>
    );
}

export default GuestLecturesPage;