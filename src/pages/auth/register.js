import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { TopNav } from 'src/layouts/dashboard/top-nav';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      token: '',
      password: '',
      konfirmasi_password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      token: Yup.string()
        .max(255)
        .required('Token is required'),
      password: Yup.string()
        .max(255)
        .required('Password is required'),
      konfirmasi_password: Yup.string()
        .max(255)
        .required('Confirmation password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values, helpers) => {
      const { email, token, password, konfirmasi_password } = values;
      try {
        const res = await auth.signUp(email, token, password, konfirmasi_password);
        if (res != 'eror'){
          window.location.href = res;
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },

  });


  const getToken = async (email) => {
    try {
      const token = await auth.getToken(email);
      formik.setFieldValue('token', token);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const gridButton = {
    width: '70px',
    height: '55px',
    fontSize: '22px',
    color: '#544238',
    fontFamily: 'IBM Plex Mono',
    borderTop: '4px solid #C09B73',
    borderRight: '4px solid #C09B73',
    borderBottom: '4px solid #C09B73',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };





  return (
    <>
      <Head>
        <title>Register | WAIFU-SET-ON </title>
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
          <TopNav />
        </div>
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '45px',
            width: '100%',
          }}
        >
          <div>
            <Typography
              sx={{
                color: '#D89F51',
                fontFamily: 'Akaya Telivigala',
                fontSize: '86px',
                fontStyle: 'normal',
                fontWeight: 400,
              }}
            >
              Register-WSO
            </Typography>
          </div>
          <div>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  InputLabelProps={{
                    style: {
                      color: '#544238',
                      fontSize: '14px',
                    },
                  }}
                />
                <Grid container spacing={0} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Konfirmasi Token"
                      name="token"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.token}
                      InputLabelProps={{
                        style: {
                          color: '#544238',
                          fontSize: '16px',
                        },
                      }}
                      sx={{
                        width: '430px',
                        '& .MuiOutlinedInput-root': {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      }}
                    /></Grid>
                  <Grid item>
                    <Button
                      onClick={() => getToken(formik.values.email)}
                      style={gridButton}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword1 ? 'text' : 'password'}
                  value={formik.values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword1(!showPassword1)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#544238',
                      fontSize: '14px',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="konfirmasi_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword2 ? 'text' : 'password'}
                  value={formik.values.konfirmasi_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword2(!showPassword2)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#544238',
                      fontSize: '14px',
                    },
                  }}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3, backgroundColor: '#EADDD2', border: '4px solid #C09B73', borderRadius: '8px', color: '#544238', fontFamily: 'IBM Plex Mono', fontSize: '22px', textDecorationLine: 'underline'
                }}
                type="submit"
              >
                REGISTER
              </Button>
            </form>
          </div>
          <svg width="500" height="3" viewBox="0 0 500 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.00390625 1.25146L500.002 1.25146" stroke="#D5C4BA" stroke-width="2" />
          </svg>
          <Stack
            spacing={1}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: '#C09B73',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 400,
              }}
            >
              More Register Methods
            </Typography>
          </Stack>
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <Button
              component={NextLink}
              href="http://localhost:8000/api/auth/google/autentikasi"
              style={{
                background: 'url("/google.png"), lightgray 50% / cover no-repeat',
                width: '80px',
                height: '80px',
                borderRadius: '50%'
              }}>
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;