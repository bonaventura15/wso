import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Menu } from 'src/layouts/dashboard/menu';

const Page = () => {
    const [userData, setUserData] = useState(null);
    const auth = useAuth();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userData) {
                    await auth.userinformation();
                    setUserData(auth.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [auth.userinformation, userData])

    const formatDate = (dateString) => {
        if (dateString) {
            const dateParts = dateString.split('-');
            if (dateParts.length === 3) {
                const [year, month, day] = dateParts;
                return `${year}/${month}/${day}`;
            }
        }
        return 'Invalid Date';
    };

    const handleDeleteAccount = async () => {
        try {
            await auth.deleteaccount();
            router.push('/auth/login');
        } catch (error) {
            console.error('Error deleting user account:', error);
        }
    };

    return (
        <>
            <Head>
                <title>WAIFU-SET-ON</title>
            </Head>
            <Box
                sx={{
                    backgroundImage: `url("/bgpage.png")`,
                    backgroundColor: '#E5E0D9',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '970px',
                    alignItems: 'right',
                    display: 'flex',
                    justifyContent: 'right',
                    height: '730px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        right: '0',
                        width: '80px',
                        height: '80px',
                        marginTop: '10px'
                    }}
                >
                    <Menu />
                </div>
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '57px',
                        width: '100%',
                    }}
                >
                    <Typography sx={{
                        mb: 3, textAlign: 'center', color: '#D89F51', fontSize: '70px', fontFamily: 'Akaya Telivigala, sans-serif', fontWeight: 400
                    }}>
                        User Information
                    </Typography>
                    {userData && (
                        <div>
                            <div style={{
                                width: '500px',
                                height: '60px',
                                borderRadius: '6px',
                                border: '4px solid #C09B73',
                                background: '#EADDD2'
                            }}>
                                <Typography style={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    textAlign: 'Left',
                                    marginTop: '10px',
                                    marginLeft: '10px'
                                }}>{userData.email}</Typography>
                            </div>
                            <div style={{
                                width: '500px',
                                height: '60px',
                                borderRadius: '6px',
                                border: '4px solid #C09B73',
                                background: '#EADDD2',
                                marginTop: '20px'
                            }}>
                                <Typography style={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    textAlign: 'Left',
                                    marginTop: '10px',
                                    marginLeft: '10px'
                                }}>{userData.nama}</Typography>
                            </div>
                            <div style={{
                                width: '500px',
                                height: '60px',
                                borderRadius: '6px',
                                border: '4px solid #C09B73',
                                background: '#EADDD2',
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                }}>
                                    <Typography style={{
                                        color: '#544238',
                                        fontFamily: 'IBM Plex Mono',
                                        fontSize: '22px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        marginTop: '10px',
                                        marginLeft: '10px'
                                    }}>***********</Typography>
                                </div>
                                <div
                                    style={{
                                        marginTop: '4px',
                                        marginRight: '10px'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M27.5 0C20.6 0 15 5.6 15 12.5C15 13.3 15 14.1 15.15 14.85L0 30V40H15V30H25V25L25.15 24.85C25.9 25 26.7 25 27.5 25C34.4 25 40 19.4 40 12.5C40 5.6 34.4 0 27.5 0ZM30 5C32.75 5 35 7.25 35 10C35 12.75 32.75 15 30 15C27.25 15 25 12.75 25 10C25 7.25 27.25 5 30 5Z" fill="#544238" />
                                    </svg>
                                </div>
                            </div>
                            <div style={{
                                width: '500px',
                                height: '60px',
                                borderRadius: '6px',
                                border: '4px solid #C09B73',
                                background: '#EADDD2',
                                marginTop: '20px'
                            }}>
                                <Typography style={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    textAlign: 'Left',
                                    marginTop: '10px',
                                    marginLeft: '10px'
                                }}>{userData.gender}</Typography>
                            </div>
                            <div style={{
                                width: '500px',
                                height: '60px',
                                borderRadius: '6px',
                                border: '4px solid #C09B73',
                                background: '#EADDD2',
                                marginTop: '20px'
                            }}>
                                <Typography style={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    textAlign: 'Left',
                                    marginTop: '10px',
                                    marginLeft: '10px'
                                }}>{formatDate(userData['ulang tahun'])}</Typography>

                            </div>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            <Link
                                component={NextLink}
                                href="/"
                                underline="hover"
                                variant="subtitle2"
                                sx={{
                                    color: '#C09B73',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                }}
                            >
                                Your waifu List!
                            </Link>
                        </Typography>
                        <Typography
                            color="text.secondyar"
                            variant="body2"
                        >
                            <Link
                                component={NextLink}
                                href="/auth/update-data"
                                underline="hover"
                                variant="subtitle2"
                                sx={{
                                    color: '#C09B73',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                }}                      >
                                Let’s update!
                            </Link>
                        </Typography>
                    </div>
                    <div style={{
                        width: '500px',
                        height: '60px',
                        borderRadius: '4px',
                        background: '#534A41',
                        marginTop: '15px'
                    }}>
                        <Button
                            onClick={handleClickOpen}
                            style={{
                                width: '400px',
                                height: '50px',
                                borderRadius: '2px',
                                background: '#E3CCB9',
                                marginTop: '1%',
                                marginLeft: '10%',
                                fontSize: '30px',
                                fontFamily: 'IBM Plex Mono',
                                color: '#544238'
                            }}
                        >
                            Delete My Account
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Pemberitahuan Penting"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Apakah Anda yakin ingin melanjutkan dan menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data yang terkait dengan akun ini akan hilang secara permanen
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}> Disagree</Button>
                                <Button onClick={handleDeleteAccount} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Page;