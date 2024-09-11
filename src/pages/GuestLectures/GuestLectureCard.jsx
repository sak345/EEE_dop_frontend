import React from 'react';
import { Card, Box, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 400,
        minHeight: 350,
        maxHeight: 350,
        overflowY: 'auto',
        margin: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        transition: 'transform 0.3s, box-shadow 0.3s',
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%), url("https://source.unsplash.com/random/400x200")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[10],
        },
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: theme.shape.borderRadius,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.light,
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
                background: theme.palette.primary.main,
            },
        },
    },
    cardContent: {
        padding: theme.spacing(3),
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: theme.shape.borderRadius,
    },
    typography: {
        marginBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    list: {
        padding: 0,
    },
    listItem: {
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

function isMeetingLink(link) {
    const meetingDomains = ['zoom.us', 'meet.google.com', 'teams.microsoft.com'];
    try {
        const url = new URL(link);
        return meetingDomains.some(domain => url.hostname.includes(domain));
    } catch (e) {
        return false;
    }
}

function GuestLectureCard({ lecture, onDelete }) {
    console.log(lecture)
    const classes = useStyles();
    const { title, speaker, date, time, venue, description, department, contactInformation, registrationLink, duration, attachments } = lecture;
    const isMeeting = isMeetingLink(venue);

    const handleDelete = () => {
        onDelete(lecture._id);
    };

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="div" className={classes.typography}>
                    {title}
                </Typography>
                <Typography variant="body2" className={classes.typography}>
                    {description}
                </Typography>
                <Typography className={classes.typography}>
                    Speaker: {speaker}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.typography}>
                    Date & Time: {new Date(date).toLocaleDateString()} at {time}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.typography}>
                    Department: {department}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.typography}>
                    {isMeeting ? (
                        <p>Meeting Link: <a href={venue} target="_blank" rel="noopener noreferrer" className={classes.link}>
                            {venue}
                        </a></p>
                    ) : (
                        `Venue: ${venue}`
                    )}
                </Typography>
                {contactInformation && (
                    <Typography variant="body2" color="textSecondary" className={classes.typography}>
                        Contact Information: {contactInformation}
                    </Typography>
                )}
                {registrationLink && (
                    <Typography variant="body2" color="textSecondary" className={classes.typography}>
                        Registration <a href={registrationLink} target="_blank" rel="noopener noreferrer" className={classes.link}>{registrationLink}</a>
                    </Typography>
                )}
                {duration && (
                    <Typography variant="body2" color="textSecondary" className={classes.typography}>
                        Duration: {duration}
                    </Typography>
                )}
                {attachments && attachments.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="body2" color="textSecondary" className={classes.typography}>
                            Attachments:
                        </Typography>
                        <List className={classes.list}>
                            {attachments.map((attachment, index) => (
                                <ListItem key={index} className={classes.listItem}>
                                    <ListItemText>
                                        <a href={attachment} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                            Attachment {index + 1}
                                        </a>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" className={classes.button} onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default GuestLectureCard;