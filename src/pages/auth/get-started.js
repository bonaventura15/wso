import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const [mainText, setMainText] = useState('Waifu-Set-On');
  const [subText, setSubText] = useState('Otaku, rasakan cinta waifu impian dengan dating simulation dan voice changger terbaik di WSO!');

  const handleSvgClick = (svgId) => {
    if (svgId === 1) {
      setMainText('Waifu-Set-On');
      setSubText('Otaku, rasakan cinta waifu impian dengan dating simulation dan voice changger terbaik di WSO!');
    } else if (svgId === 2) {
      setMainText('Become-Waifu');
      setSubText('Otaku, rasakan kedekatan waifu anda jadikan suara anda seperti waifu anda dan cintai diri sendiri di BW!');
    } else if (svgId === 3) {
      setMainText('Asisten-Waifu');
      setSubText('Otaku, rasakan cinta waifu impian dengan dating simulation terbaik AI-U pilih dari daftar karakter WSO!');
    }
  };
  
  const textStyle = {
    fontSize: '90px',
    marginBottom: '10px',
    fontWeight: 400,
    color: '#D89F51',
    fontFamily: 'Akaya Telivigala',
  };

  const subStyle = {
    fontSize: '32px',
    marginBottom: '10px',
    fontWeight: 'bold',
    width: '600px',
    color: '#544238',
    fontFamily: 'Akaya Telivigala', 
    fontWeight: 700
  };

  return (
    <>
      <Head>
        <title>
          Waifu-Set-On
        </title>
      </Head>
      <Box
        sx={{
          backgroundImage: `url("/bgpage.png")`,
          backgroundColor: '#E5E0D9',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '970px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: '15px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                padding: 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleSvgClick(1)}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: '2px' }}
                component={Button}
              >
                <circle cx="12.5" cy="12.5" r="11.5" fill="#C68A29" stroke="#77592A" strokeWidth="2" />
                <path d="M12.5 4L5 10.4286H6.875V19H10.625V14.7143H14.375V19H18.125V10.3643L20 10.4286L12.5 4Z" fill="#E3E2D9" />
              </svg>
            </Box>
            <div style={{
              border: '2px solid #77592A',
              background: '#C68A29',
              width: '25px',
              height: '25px',
              margin: '2px',
            }}>
            </div>
          </Box>
          <Box sx={{ display: 'flex', }}>
            <Box
              sx={{
                padding: 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleSvgClick(2)}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: '2px' }}
              >
                <circle cx="12.5" cy="12.5" r="11.5" fill="#C68A29" stroke="#77592A" stroke-width="2" />
                <path d="M12.5186 5.00782C12.435 5.02132 12.3524 5.04039 12.2713 5.0649C11.8421 5.16155 11.4597 5.40395 11.1891 5.75083C10.9186 6.09771 10.7766 6.52763 10.7873 6.96742V10.7725C10.7873 11.2771 10.9878 11.761 11.3446 12.1178C11.7014 12.4746 12.1853 12.675 12.6898 12.675C13.1944 12.675 13.6783 12.4746 14.0351 12.1178C14.3919 11.761 14.5924 11.2771 14.5924 10.7725V6.96742C14.6016 6.69774 14.5533 6.42918 14.4508 6.17958C14.3482 5.92998 14.1938 5.70505 13.9976 5.51972C13.8015 5.33438 13.5682 5.19289 13.3132 5.10464C13.0582 5.01638 12.7874 4.98338 12.5186 5.00782ZM7.64815 8.86995C7.45126 8.93614 7.28144 9.06496 7.16464 9.23673C7.04784 9.4085 6.99047 9.61378 7.00129 9.82122V10.7725C7.00129 13.5882 9.07505 15.8903 11.7576 16.3659V18.3826H10.8063C9.75996 18.3826 8.90382 19.2387 8.90382 20.2851H16.533C16.533 19.2387 15.6768 18.3826 14.6304 18.3826H13.6792V16.3659C16.3617 15.9093 18.4355 13.5882 18.4355 10.7725V9.82122C18.4355 9.56892 18.3353 9.32697 18.1569 9.14857C17.9785 8.97017 17.7365 8.86995 17.4842 8.86995C17.2319 8.86995 16.99 8.97017 16.8116 9.14857C16.6332 9.32697 16.533 9.56892 16.533 9.82122V10.7725C16.533 12.8843 14.8397 14.5775 12.7279 14.5775C10.6161 14.5775 8.92285 12.8843 8.92285 10.7725V9.82122C8.92515 9.68049 8.89619 9.541 8.83807 9.41281C8.77994 9.28463 8.6941 9.17094 8.58672 9.07994C8.47935 8.98894 8.35312 8.92291 8.21713 8.8866C8.08115 8.85028 7.9388 8.8446 7.80036 8.86995C7.76234 8.86767 7.72422 8.86767 7.6862 8.86995H7.64815Z" fill="#E3E2D9" />
              </svg>
            </Box>
            <Box
              sx={{
                padding: 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleSvgClick(3)}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: '2px' }}
              >
                <circle cx="12.5" cy="12.5" r="11.5" fill="#C68A29" stroke="#77592A" stroke-width="2" />
                <path d="M7.135 7.015C7.045 7.015 7 7.075 7 7.15V15.865C7 15.94 7.06 16 7.135 16H16L19 19V7.135C19 7.045 18.94 7 18.865 7H7.15L7.135 7.015Z" fill="#E5E0D9" />
              </svg>
            </Box>
          </Box>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '3%', marginBottom: '55px' }}>
          <svg width="10" height="540" viewBox="0 0 10 540" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0L5 540.006" stroke="url(#paint0_linear_1515_133)" stroke-width="10" />
            <defs>
              <linearGradient id="paint0_linear_1515_133" x1="5.5" y1="0" x2="5.5" y2="540.006" gradientUnits="userSpaceOnUse">
                <stop stop-color="#DFC39D" />
                <stop offset="1" stop-color="#E3E0D9" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ textAlign: 'left', marginLeft: '8px', marginTop: '3%' }}>
          <div style={textStyle}>{mainText}</div>
          <div style={subStyle}>{subText}</div>
          <svg width="460" height="2" viewBox="0 0 460 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H460" stroke="#D5C4BA" stroke-width="2" />
            </svg>
            <Stack spacing={2} direction="row" >
              <Button
                component={NextLink}
                href="/auth/login"
                sx={{
                  fontSize: '24px', padding: '10px 35px', fontWeight: 'bold', backgroundColor: '#EADDD2', border: '4px solid #C09B73', color: '#F7B453', marginTop: '8px', fontFamily: 'Segoe UI'
                }}
              >
                GET-STARTED
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Page;
