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
    blur: {
        filter: 'blur(5px)',
        pointerEvents: 'none',
        userSelect: 'none',
    },
    loadingMessage: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        fontSize: '1.5em',
        textAlign: 'center',
    },
}));

export default useStyles;