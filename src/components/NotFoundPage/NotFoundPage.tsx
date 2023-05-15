import {Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';


export function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1" style={{color: 'black'}}>
                404
            </Typography>
            <Typography variant="h6" style={{color: 'black', marginBottom: '20px'}}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant={'contained'}>
                <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Back Home</Link>
            </Button>
        </Box>
    );
}