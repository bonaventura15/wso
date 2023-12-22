import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import {
    Button,
    Card,
    Modal
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShieldIcon from '@mui/icons-material/Shield';
import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import Cookies from 'js-cookie';


export const PopUp = ({ open, onClose }) => {
    const bahasa = ['bahasa indonesia', 'English', '日本語', 'basa jawa', '한국어', 'русский язык'];

    const handleLanguageClick = (selectedLanguage) => {
        Cookies.set('selectedLanguage', selectedLanguage);

        onClose();

    };

    return (
        <Modal open={open} onClose={onClose}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Card sx={{ width: 500, height: 350, backgroundColor: '#272739', borderRadius: '30px' }}>
                <CardContent>
                    <Typography style={{
                        color: '#FFF',
                        fontFamily: 'Anonymous Pro',
                        fontSize: '30px',
                        fontWeight: '400px',
                        textAlign: 'center'
                    }}>
                        Bahasa yang anda gunakan
                    </Typography>
                    <Typography style={{
                        color: '#FFF',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontWeight: '100px',
                        textAlign: 'center',
                        marginLeft: '20px',
                        marginRight: '20px'
                    }}>
                        Pilih bahasa yang ingin anda gunakan untuk berbicara ketika menggunakan fitur BW
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                    {[0, 1, 2].map((rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {bahasa.slice(rowIndex * 3, rowIndex * 3 + 3).map((language, index) => (
                                <Button
                                    key={index}
                                    style={{
                                        color: '#FFF',
                                        fontFamily: 'Anonymous Pro',
                                        fontSize: '20px',
                                    }}
                                    onClick={() => handleLanguageClick(language)}
                                >
                                    {language}
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </Box>
    </Modal>
    
    );
};

