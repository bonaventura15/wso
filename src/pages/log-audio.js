import { useState, useRef, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { Box } from '@mui/system';
import { NavbarC } from 'src/layouts/dashboard/NavBarC';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useAuth } from 'src/hooks/use-auth';

const Page = () => {
    const auth = useAuth();
    const [audioLogs, setAudioLogs] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAudioLog, setSelectedAudioLog] = useState(null);

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const fetchAudioLogs = async () => {
        try {
            const result = await auth.getaudiolog();

            if (Array.isArray(result) && result.length > 0) {
                setAudioLogs(result);
            } else {
                console.error('Error fetching audio logs: Unexpected response structure or empty result', result);
            }
        } catch (error) {
            console.error('Error fetching audio logs:', error);
        }
    };

    useEffect(() => {
        fetchAudioLogs();
    }, [auth]);

    const handleDeleteAudioLog = async () => {
        if (!selectedAudioLog) {
            console.error('Selected audio log is not defined');
            return;
        }

        try {
            await auth.deleteauidolog(selectedAudioLog.audio_id);
            const updatedLogs = await auth.getaudiolog();
            setAudioLogs(updatedLogs);
        } catch (error) {
            console.error('Error deleting audio log:', error.message);
        } finally {
            closeDrawer();
        }
    };

    const handleDownloadAudio = () => {
        if (!selectedAudioLog) {
            console.error('Selected audio log is not defined');
            return;
        }

        const { audio_download, audio_id } = selectedAudioLog;

        const link = document.createElement('a');
        link.href = audio_download;
        link.download = `audio_${audio_id}.mp3`;

        link.click();
    };

    const renderRow = ({ index, style }) => {
        const audioLog = audioLogs[index];

        if (!audioLog) {
            return null;
        }

        return (
            <ListItem style={style} key={audioLog.audio_id} component="div" disablePadding>
                <ListItemButton
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        setDrawerOpen(true);
                        setSelectedAudioLog(audioLog);
                    }}
                >
                    <ListItemText
                        sx={{ '& .MuiTypography-root': { fontSize: '30px !important', fontFamily: 'Anonymous Pro', color: '#fff' } }}
                        primary={`${audioLog.transcript}`}
                    />
                    <Divider style={{ width: '100%' }} />
                    <ListItemText
                        sx={{ '& .MuiTypography-root': { fontSize: '30px !important', fontFamily: 'Anonymous Pro', fontStyle: 'italic', color: '#fff' } }}
                        primary={`${audioLog.translate}`}
                    />
                </ListItemButton>
            </ListItem>
        );
    };

    const boxStyle = {
        background: 'url("/bglog-audio.png") lightgray 50% / cover no-repeat',
    };


    return (
        <>
            <Head>
                <title>Log-Audio | BecomeWaifu</title>
            </Head>
            <Box style={boxStyle}>
                <div style={{ marginLeft: '25%' }}>
                    <NavbarC />
                </div>
                <Typography
                    style={{
                        fontFamily: 'Anonymous Pro',
                        fontSize: '50px',
                        color: '#fff',
                        textAlign: 'center',
                        marginTop: '20px',
                        marginTop: '60px',
                    }}
                >
                    LOG-AUDIO
                </Typography>
                {audioLogs.length > 0 ? (
                    <Box sx={{ width: '100%', height: 500, maxWidth: 500, marginLeft: '35%', marginTop: '20px' }}>
                        <FixedSizeList
                            height={500}
                            width={500}
                            itemSize={116}
                            itemCount={audioLogs.length}
                            overscanCount={5}
                        >
                            {({ index, style }) => renderRow({ index, style })}
                        </FixedSizeList>
                    </Box>
                ) : (
                    <p>Loading audio logs...</p>
                )}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={closeDrawer}
                    sx={{
                        width: 365,
                        '& .MuiDrawer-paper': {
                            width: 305,
                            height: '600px',
                            marginTop: '6%',
                            borderRadius: '46px 0px 0px 46px',
                            background: 'none',
                            borderTop: '4px solid #FFF',
                            borderBottom: '4px solid #FFF',
                            borderLeft: '4px solid #FFF'
                        },
                    }}
                >
                    <List>
                        <ListItem>
                            <Typography style={{ fontSize: '54px', fontFamily: 'Anonymous Pro', textAlign: 'center', margin: 'auto', color: '#fff' }} >
                                OPTIONS
                            </Typography>
                        </ListItem>
                        <div style={{ textAlign: 'center' }}>
                            <Divider
                                sx={{
                                    width: '200px',
                                    borderBottomWidth: '5px',
                                    borderBottomStyle: 'solid',
                                    margin: 'auto',
                                }}
                            />
                        </div>
                        <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button onClick={handleDeleteAudioLog} style={{ marginTop: '10px', flexDirection: 'column' }}>
                                <Typography style={{ marginBottom: '5px', color: '#fff' }}>Delete Audio</Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 75 75" fill="none">
                                    <path d="M14.0089 75C11.6161 75 9.575 74.2517 7.88572 72.7552C6.2 71.2587 5.35714 69.4467 5.35714 67.3193V8.41788H0V3.66202H21.4286V0H53.5714V3.66202H75V8.41788H69.6429V67.3193C69.6429 69.507 68.8179 71.3332 67.1679 72.798C65.5143 74.266 63.4554 75 60.9911 75H14.0089ZM64.2857 8.41788H10.7143V67.3193C10.7143 68.1722 11.0232 68.8729 11.6411 69.4214C12.2589 69.9699 13.0482 70.2441 14.0089 70.2441H60.9911C61.8125 70.2441 62.5679 69.9398 63.2571 69.331C63.9429 68.7191 64.2857 68.0485 64.2857 67.3193V8.41788ZM25.7571 60.7324H31.1143V17.9296H25.7571V60.7324ZM43.8857 60.7324H49.2429V17.9296H43.8857V60.7324Z" fill="white" />
                                </svg>
                            </Button>
                            <Button style={{ marginTop: '10px', flexDirection: 'column' }}>
                                <Typography style={{ marginBottom: '5px', color: '#fff' }}>Save To Drive</Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 75 67" fill="none">
                                    <path d="M71.861 52.068L65.4195 63.2254C64.8179 64.2669 63.9727 65.147 62.9564 65.7902C61.9401 66.4334 60.7829 66.8206 59.5842 66.9185L58.9742 66.9445H16.0293C15.1032 66.9445 14.2069 66.7734 13.3664 66.4499L12.7527 66.1821L20.8977 52.068H71.861ZM24.773 1.26079L33.208 15.8733L7.7319 60.0046L0.996541 48.3488C0.343695 47.2181 0 45.9354 0 44.6297C0 43.324 0.343695 42.0413 0.996541 40.9105L22.4709 3.71914C23.051 2.71497 23.8432 1.88189 24.773 1.26079ZM46.0911 9.62163e-07C47.2938 -0.000610691 48.4787 0.29041 49.5442 0.84812C50.6098 1.40583 51.5242 2.21359 52.2091 3.20218L52.5289 3.71914L74.0033 40.9105C74.5574 41.8701 74.881 42.9189 74.9702 43.99L75 44.6297H58.3978L32.6315 9.62163e-07H46.0874H46.0911ZM37.5036 23.3116L49.814 44.6297H25.1933L37.5036 23.3116Z" fill="white" />
                                </svg>
                            </Button>
                            <Button onClick={handleDownloadAudio} style={{ marginTop: '10px', flexDirection: 'column' }}>
                                <Typography style={{ marginBottom: '5px', color: '#fff' }}>Download Audio</Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 75 68" fill="none">
                                    <path d="M75 41.1229V62.5515C75 63.9723 74.4356 65.3349 73.4309 66.3395C72.4263 67.3442 71.0637 67.9086 69.6429 67.9086H5.35714C3.93634 67.9086 2.57373 67.3442 1.56907 66.3395C0.564411 65.3349 0 63.9723 0 62.5515V41.1229C0 39.7021 0.564411 38.3395 1.56907 37.3348C2.57373 36.3302 3.93634 35.7658 5.35714 35.7658H18.75C19.4604 35.7658 20.1417 36.048 20.644 36.5503C21.1464 37.0526 21.4286 37.7339 21.4286 38.4443C21.4286 39.1547 21.1464 39.836 20.644 40.3384C20.1417 40.8407 19.4604 41.1229 18.75 41.1229H5.35714V62.5515H69.6429V41.1229H56.25C55.5396 41.1229 54.8583 40.8407 54.356 40.3384C53.8536 39.836 53.5714 39.1547 53.5714 38.4443C53.5714 37.7339 53.8536 37.0526 54.356 36.5503C54.8583 36.048 55.5396 35.7658 56.25 35.7658H69.6429C71.0637 35.7658 72.4263 36.3302 73.4309 37.3348C74.4356 38.3395 75 39.7021 75 41.1229ZM35.6049 40.3394C35.8537 40.5885 36.1491 40.786 36.4743 40.9208C36.7994 41.0556 37.148 41.125 37.5 41.125C37.852 41.125 38.2006 41.0556 38.5257 40.9208C38.8509 40.786 39.1463 40.5885 39.3951 40.3394L55.4665 24.268C55.9691 23.7654 56.2515 23.0837 56.2515 22.3729C56.2515 21.6621 55.9691 20.9804 55.4665 20.4778C54.9639 19.9752 54.2822 19.6928 53.5714 19.6928C52.8606 19.6928 52.1789 19.9752 51.6763 20.4778L40.1786 31.9789V3.62291C40.1786 2.91251 39.8964 2.2312 39.394 1.72887C38.8917 1.22654 38.2104 0.944336 37.5 0.944336C36.7896 0.944336 36.1083 1.22654 35.606 1.72887C35.1036 2.2312 34.8214 2.91251 34.8214 3.62291V31.9789L23.3237 20.4778C22.8211 19.9752 22.1394 19.6928 21.4286 19.6928C20.7178 19.6928 20.0361 19.9752 19.5335 20.4778C19.0309 20.9804 18.7485 21.6621 18.7485 22.3729C18.7485 23.0837 19.0309 23.7654 19.5335 24.268L35.6049 40.3394ZM61.6071 51.8372C61.6071 51.0425 61.3715 50.2657 60.93 49.605C60.4885 48.9443 59.861 48.4293 59.1269 48.1252C58.3927 47.8211 57.5848 47.7415 56.8054 47.8965C56.0261 48.0516 55.3101 48.4342 54.7482 48.9961C54.1863 49.558 53.8037 50.274 53.6486 51.0533C53.4936 51.8327 53.5732 52.6406 53.8773 53.3748C54.1814 54.1089 54.6964 54.7364 55.3571 55.1779C56.0178 55.6194 56.7946 55.855 57.5893 55.855C58.6549 55.855 59.6768 55.4317 60.4303 54.6782C61.1838 53.9247 61.6071 52.9028 61.6071 51.8372Z" fill="white" />
                                </svg>
                            </Button>
                            <Button style={{ marginTop: '10px', flexDirection: 'column' }}>
                                <Typography style={{ marginBottom: '5px', color: '#fff' }}>Share to SMD</Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 75 69" fill="none">
                                    <path d="M73.902 32.0075L43.9017 2.00714C43.3773 1.48285 42.7091 1.12582 41.9818 0.981194C41.2545 0.836564 40.5006 0.910826 39.8155 1.19459C39.1303 1.47836 38.5447 1.95889 38.1327 2.57543C37.7206 3.19197 37.5006 3.91685 37.5004 4.65842V17.9523C27.2564 18.9003 17.7348 23.6369 10.799 31.2351C3.86312 38.8333 0.0122691 48.7462 0 59.034V64.6591C0.000591965 65.4375 0.243414 66.1964 0.694785 66.8307C1.14616 67.4649 1.7837 67.9429 2.519 68.1984C3.25429 68.454 4.05088 68.4743 4.79829 68.2568C5.54569 68.0392 6.20685 67.5944 6.69007 66.9841C10.364 62.6151 14.8717 59.0221 19.95 56.4151C25.0283 53.808 30.5752 52.2392 36.2666 51.8002C36.4541 51.7777 36.9229 51.7402 37.5004 51.7027V64.6591C37.5006 65.4006 37.7206 66.1255 38.1327 66.742C38.5447 67.3586 39.1303 67.8391 39.8155 68.1229C40.5006 68.4066 41.2545 68.4809 41.9818 68.3363C42.7091 68.1917 43.3773 67.8346 43.9017 67.3103L73.902 37.31C74.6051 36.6068 75 35.6531 75 34.6587C75 33.6644 74.6051 32.7107 73.902 32.0075ZM45.0005 55.6065V47.7839C45.0005 46.7893 44.6054 45.8355 43.9021 45.1322C43.1988 44.4289 42.245 44.0338 41.2504 44.0338C40.2942 44.0338 36.3904 44.2213 35.3929 44.3526C25.286 45.2838 15.6655 49.1237 7.69508 55.4077C8.59976 47.1367 12.5234 39.4901 18.7148 33.9318C24.9061 28.3736 32.9302 25.2943 41.2504 25.2836C42.245 25.2836 43.1988 24.8885 43.9021 24.1853C44.6054 23.482 45.0005 22.5282 45.0005 21.5336V13.711L65.9482 34.6587L45.0005 55.6065Z" fill="white" />
                                </svg>
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </>
    );
};

export default Page;
