import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box } from '@mui/system';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PopUp } from 'src/sections/overview/PopUp';
import Cookies from 'js-cookie';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TypewriterEffect from 'src/sections/overview/mesintik'
import { useAuth } from 'src/hooks/use-auth';
import { Navbarb } from 'src/layouts/dashboard/NavBarB';

const CharacterTypography = ({ selectedCharacter }) => {
  return (
    <Typography style={{ color: 'white', marginLeft: '10px', fontStyle: 'italic', fontFamily: 'Anonymous Pro', fontSize: '44px' }}>
      {selectedCharacter}
    </Typography>
  );
};

const Page = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState("Chose Your karakter!!!");
  const [isModalOpen, setModalOpen] = useState(true);
  const selectedLanguage = getCookie("selectedLanguage");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioUrl = useRef(null);
  const accessToken = getCookie("access_token");
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [streamingAudioUrl, setStreamingAudioUrl] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const auth = useAuth();

  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  const handleAudioPause = () => {
    setIsAudioPlaying(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleButtonClick = (buttonNumber, characterName, speakerId) => {
    setSelectedButton(buttonNumber);
    setSelectedCharacter(characterName);
    setSelectedSpeakerId(speakerId);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks = [];
  
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
  
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          sendAudioToServer(audioBlob);
          setRecordingDuration(0);
        };
  
        mediaRecorder.current.start();
        setIsRecording(true);
        setRecordingDuration(0);
  
        const timer = setInterval(() => {
          setRecordingDuration((prevDuration) => prevDuration + 1);
        }, 1000);
  
        audioChunks.current = chunks;
        audioChunks.current.timerId = timer;
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };
  
  
  const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob);
    formData.append('bahasa', selectedLanguage);
  
    try {
      const { data, error } = await auth.becomewaifu(selectedSpeakerId, formData);
  
      if (error) {
        console.error('Error occurred while making the request:', error);
        return;
      }
  
      const streamingAudioUrl = data[1].streaming_audio;
  
      setStreamingAudioUrl(streamingAudioUrl);
  
      const firstEntry = data[0];
      setTranscript(firstEntry.transcript);
      setTranslation(firstEntry.translation);
  
      console.log('Success:', data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(audioChunks.current.timerId);
    }
  };

  useEffect(() => {
    return () => {
      if (audioChunks.current.timerId) {
        clearInterval(audioChunks.current.timerId);
      }
    };
  }, []);

  function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  }

  const boxStyle = {
    background: selectedButton === null ? 'url("/become0.png") lightgray 50% / cover no-repeat' : `url("/become${selectedButton}.png") lightgray 50% / cover no-repeat`,
  };

  const buttonStyle = {
    marginBottom: '25px',
    height: '57px',
    width: '480px',
    fontSize: '32px',
    color: 'rgba(0, 0, 0, 0.50)',
  };

  const gridContainerStyle = {
    marginBottom: '10px',
    marginLeft: '10px'
  };

  const inputProps = {
    style: {
      background: 'rgba(255, 255, 255, 0.45)',
      width: '400px',
      height: '60px',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px'
    },
  };


  return (
    <>
      <Head>
        <title>Asisten Waifu | WSO</title>
      </Head>
      <Box style={boxStyle}>
        <Navbarb />
        <PopUp open={isModalOpen} onClose={handleCloseModal} />
        <Box style={{ display: 'flex' }}>
          <Box flex={1} p={3}>
            <CharacterTypography selectedCharacter={selectedCharacter} />
            <Grid container spacing={0} alignItems="flex-end" style={gridContainerStyle}>
              <Grid item>
                <div style={{
                  width: '350px',
                  height: '50px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}>
                  <p style={{ margin: 0 }}>
                    {isRecording ? `Recording Duration: ${recordingDuration} Seconds` : 'Lets change!!'}
                  </p>
                </div>
              </Grid>
              <Grid style={{
                width: '8px',
                height: '51px',
                backgroundColor: 'rgba(0, 0, 0, 0.14)',
              }}></Grid>
              <Grid item>
                <button style={{
                  width: '50px',
                  height: '51px',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                  fontSize: '40px'
                }}
                  onClick={isRecording ? stopRecording : startRecording}>
                  {isRecording ? <GraphicEqIcon /> : <KeyboardVoiceIcon />}
                </button>
                {audioUrl.current && (
                  <audio controls>
                    <source src={audioUrl.current} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom style={{ color: 'white', marginTop: '20px', marginLeft: '10PX' }}>
              List Karakter
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', marginLeft: '10PX' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(1, "Kusukabe Tsumugi", 'kusukabe tsumugi')}
                  style={{
                    ...buttonStyle,
                    background: selectedButton === 1 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                    position: 'relative',
                    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    color: 'rgba(255, 255, 255, 0.80)',
                    textAlign: 'right',
                    paddingRight: '40px',
                    fontStyle: 'italic',
                    fontFamily: 'Anonymous Pro',
                  }}
                >
                  Kusukabe Tsumugi
                </Button>
                <img
                  src="/but1.png"
                  alt="Gambar"
                  style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    left: '0',
                    transform: 'translateY(-29%)',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(2, "Meimei Himari", 'meimei himari')}
                  style={{
                    ...buttonStyle,
                    background: selectedButton === 2 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                    position: 'relative',
                    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    color: 'rgba(255, 255, 255, 0.80)',
                    textAlign: 'right',
                    fontStyle: 'italic',
                    paddingRight: '90px',
                    fontFamily: 'Anonymous Pro',
                  }}
                >
                  Meimei Himari
                </Button>
                <img
                  src="/but2.png"
                  alt="Gambar"
                  style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    left: '0',
                    transform: 'translateY(-29%)',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(3, "NURSE-T", 'nurse-t')}
                  style={{
                    ...buttonStyle,
                    background: selectedButton === 2 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                    position: 'relative',
                    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    color: 'rgba(255, 255, 255, 0.80)',
                    textAlign: 'right',
                    paddingRight: '200px',
                    fontStyle: 'italic',
                    fontFamily: 'Anonymous Pro'
                  }}
                >
                  NURSE-T
                </Button>
                <img
                  src="/but3.png"
                  alt="Gambar"
                  style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    left: '0',
                    transform: 'translateY(-29%)',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(4, "SAYO", 'sayo')}
                  style={{
                    ...buttonStyle,
                    background: selectedButton === 4 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                    position: 'relative',
                    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    color: 'rgba(255, 255, 255, 0.80)',
                    textAlign: 'right',
                    paddingRight: '250px',
                    fontStyle: 'italic',
                    fontFamily: 'Anonymous Pro'
                  }}
                >
                  SAYO
                </Button>
                <img
                  src="/but4.png"
                  alt="Gambar"
                  style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    left: '0',
                    transform: 'translateY(-29%)',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(5, "NO.7", 'no 7')}
                  style={{
                    ...buttonStyle,
                    background: selectedButton === 5 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                    position: 'relative',
                    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    color: 'rgba(255, 255, 255, 0.80)',
                    textAlign: 'right',
                    paddingRight: '250px',
                    fontStyle: 'italic',
                    fontFamily: 'Anonymous Pro',
                  }}
                >
                  NO.7
                </Button>
                <img
                  src="/but5.png"
                  alt="Gambar"
                  style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    left: '0',
                    transform: 'translateY(-29%)',
                  }}
                />
              </div>
            </div>
            <Typography style={{ color: 'white' }}>Bahasa yang digunakan: {selectedLanguage}</Typography>
          </Box>
          <Box flex={1} p={6} style={{ display: 'flex' }}>
            <div style={{
              width: '0',
              height: '0',
              borderTop: '50px solid transparent',
              borderBottom: '50px solid transparent',
              borderRight: '100px solid rgba(0, 0, 0, 0.25)',
              marginLeft: '280px',
              marginTop: '290px',
            }}>
            </div>
            <div>
              <div style={{
                width: '300px', height: '250px', backgroundColor: 'rgba(0, 0, 0, 0.25)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', textAlign: 'center'
              }}>
                <Typography style={{ textAlign: 'center', fontSize: '40px', color: '#fff', textDecorationLine: 'underline', fontFamily: 'Anonymous Pro', fontWeight: 700, }}>Transkrip</Typography>
                <TypewriterEffect text={transcript} style={{ fontSize: '30px', marginLeft: '10px', color: '#fff', fontFamily: 'Anonymous Pro' }} />
              </div>
              <div style={{ width: '300px', height: '250px', backgroundColor: 'rgba(0, 0, 0, 0.25)', textAlign: 'center' }}>
                <Typography style={{ textAlign: 'center', fontSize: '40px', color: '#fff', textDecorationLine: 'underline', fontFamily: 'Anonymous Pro', fontWeight: 700 }}>Translate</Typography>
                <TypewriterEffect text={translation} style={{ fontSize: '30px', marginLeft: '10px', color: '#fff', fontFamily: 'Anonymous Pro'   }} />
              </div>
              <div style={{
                width: '300px', height: '80px', backgroundColor: 'rgba(0, 0, 0, 0.25)', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'
              }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundImage: `url(${isAudioPlaying ? 'suara.gif' : 'default.png'})`,
                    backgroundSize: 'cover',
                    marginLeft: '70%'
                  }}
                >
                  <div style={{ display: 'none' }}>
                    {streamingAudioUrl && (
                      <audio
                        ref={audioRef}
                        controls
                        autoPlay
                        onPlay={handleAudioPlay}
                        onPause={handleAudioPause}
                      >
                        <source src={streamingAudioUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Page;
