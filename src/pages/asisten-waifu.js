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
import zIndex from '@mui/material/styles/zIndex';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TypewriterEffect from 'src/sections/overview/mesintik'
import { useAuth } from 'src/hooks/use-auth';
import { ResponsiveAppBar } from 'src/layouts/dashboard/NavBarA';

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
  const [userInput, setUserInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [streamingAudio, setStreamingAudio] = useState("");
  const audioPlayerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const auth = useAuth();

  const handleButtonClick = (buttonNumber, characterName) => {
    setSelectedButton(selectedButton === buttonNumber ? null : buttonNumber);
    setSelectedCharacter(selectedButton === buttonNumber ? "Chose Your Character!!!" : characterName);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleSendClick = async () => {
    try {
      const response = await auth.asistenwaifu(selectedCharacter, userInput);
  
      console.log('Response from asistenwaifu:', response);
  
      const { data, error } = response;
  
      if (error) {
        console.error('Error occurred while fetching data:', error);
        return;
      }
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: userInput, character: selectedCharacter, response: data[0].response },
      ]);
  
      if (data[1]?.streaming_audio) {
        setStreamingAudio(data[1].streaming_audio);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  
  useEffect(() => {
    if (audioPlayerRef.current && streamingAudio) {
      audioPlayerRef.current.src = streamingAudio;
      audioPlayerRef.current.play();
    }
  }, [streamingAudio]);

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  const boxStyle = {
    background: selectedButton === null ? 'url("/rawr.png") lightgray 50% / cover no-repeat' : `url("/background${selectedButton}.png") lightgray 50% / cover no-repeat`,
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
      width: '450px',
      height: '58px',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderRadius: '0px'
    },
  };



  return (
    <>
      <Head>
        <title>Asisten Waifu | WSO</title>
      </Head>
      <Box style={boxStyle}>
      <ResponsiveAppBar />
        <Box style={{ display: 'flex' }}>
          <Box flex={1} p={3}>
            <CharacterTypography selectedCharacter={selectedCharacter} />
            <Grid container spacing={0} alignItems="flex-end" style={gridContainerStyle}>
              <Grid item style={{ marginBottom: '7px'}}>
                <TextField
                  variant="outlined"
                  InputProps={inputProps}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleInputKeyPress}
                />
              </Grid>
              <Grid style={{
                width: '8px',
                height: '58px',
                backgroundColor: 'rgba(0, 0, 0, 0.14)',
                marginBottom: '7px'
              }}></Grid>
              <Grid item >
                <svg
                  width="76"
                  height="61"
                  viewBox="0 0 106 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: 'pointer' }}
                  onClick={handleSendClick}
                >
                  <path d="M0 0H96C101.523 0 106 4.47715 106 10V71C106 76.5229 101.523 81 96 81H0V0Z" fill="#717E95" fillOpacity="0.52" />
                  <g filter="url(#filter0_i_1766_1015)">
                    <path d="M83 10L23 40L45.5 47.5L53 70L83 10Z" fill="#4E525B" />
                  </g>
                  <defs>
                    <filter id="filter0_i_1766_1015" x="23" y="10" width="60" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1766_1015" />
                    </filter>
                  </defs>
                </svg>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom style={{ color: 'white', marginTop: '20px', marginLeft: '10PX' }}>
              List Karakter
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', marginLeft: '10PX' }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(1, "Kusukabe Tsumugi")}
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
                  onClick={() => handleButtonClick(2, "Meimei Himari")}
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
                  onClick={() => handleButtonClick(3, "NURSE-T")}
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
                  onClick={() => handleButtonClick(4, "SAYO")}
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
                  onClick={() => handleButtonClick(5, "NO.7")}
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
          </Box>
          <Box flex={1} p={3} style={{ marginTop: '22%' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  backgroundColor: 'rgba(238, 214, 186, 0.20)',
                  width: '800px',
                  height: '280px',
                  overflow: 'hidden',
                  overflowY: 'auto',
                  boxShadow: '-11px 11px 0px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{ flexDirection: 'column' }}>
                  {messages.map((message, index) => (
                    <React.Fragment key={index}>
                      <div
                        style={{
                          backgroundColor: '#4D4D4D',
                          margin: '10px',
                          borderRadius: '6px',
                          width: 'fit-content',
                          maxWidth: '480px',
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: '16px',
                            fontFamily: 'Anonymous Pro',
                            fontWeight: '400',
                            color: '#FFF',
                            marginLeft: '10px',
                            marginRight: '10px'
                          }}
                        >
                          USER:
                        </Typography>
                        <TypewriterEffect
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Anonymous Pro',
                            fontWeight: '400',
                            color: '#FFF',
                            marginLeft: '10px',
                            marginRight: '10px',
                          }}
                          text={message.user}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: 'left',
                          marginLeft: '37%',
                          backgroundColor: '#4D4D4D',
                          width: '480px',
                          borderRadius: '6px',
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: '16px',
                            fontFamily: 'Anonymous Pro',
                            fontWeight: '400',
                            color: '#FFF',
                            marginLeft: '10px',
                          }}
                        >
                          {message.character}:
                        </Typography>
                        <TypewriterEffect
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Anonymous Pro',
                            fontWeight: '400',
                            color: '#FFF',
                            marginLeft: '10px',
                          }}
                        
                          text={message.response}
                        />
                        <img
                        src="/suara.gif"
                        alt="Background Sound"
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                      <div style={{ display: index === messages.length - 1 ? 'none' : 'none' }}>
                      {streamingAudio && (
                        <audio ref={audioPlayerRef} controls autoPlay>
                          Your browser does not support the audio tag.
                        </audio>
                      )}
                    </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};


export default Page;
