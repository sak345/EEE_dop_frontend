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

export default useStyles;