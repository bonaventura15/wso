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
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { TopNav } from 'src/layouts/dashboard/top-nav';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);


  const formik = useFormik({
    initialValues: {
      emailORname: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      emailORname: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email or name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await auth.signIn(values.emailORname, values.password);
        if (res != 'eror'){
          window.location.href = res;
        }
        else{
        const customErrorMessage = 'something wrong';
        setErrorMessage(customErrorMessage);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: customErrorMessage });
        helpers.setSubmitting(false);
        }
      } catch (err) {
        const customErrorMessage = err.message;
        setErrorMessage(customErrorMessage);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: customErrorMessage });
        helpers.setSubmitting(false);
      }
    }
  });
  
  return (
    <>
      <Head>
        <title>
          Login | WAIFU-SET-ON
        </title>
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
            marginTop: '5%',
            maxWidth: 550,
            px: 3,
            width: '100%',
            py: '30px',
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                sx={{
                  color: '#D89F51',
                  fontFamily: 'Akaya Telivigala',
                  fontSize: '96px',
                  fontWeight: 400,
                }}
              >
                Login-WSO
              </Typography>
            </Stack>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email Address or Name"
                    name="emailORname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.emailORname}
                    InputLabelProps={{
                      style: {
                        color: '#544238',
                        fontSize: '14px',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                <Box
                  position="absolute"
                  top="2%"
                  left="35%"
                  transform="translate(-50%, -50%)"
                  zIndex={999}
                  width="30%"
                >
                  {errorMessage && (
                    <Alert severity="error" onClose={() => setErrorMessage(null)}>
                      {errorMessage}
                    </Alert>
                  )}
                </Box>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  style={{
                    backgroundColor: '#EADDD2', border: '4px solid #C09B73', borderRadius: '8px', color: '#544238', fontFamily: 'IBM Plex Mono, monospace', fontSize: '28px'
                  }}
                >
                  LOGIN
                </Button>
              </form>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              <Link
                component={NextLink}
                href="/auth/register"
                underline="hover"
                variant="subtitle2"
                sx={{
                  color: '#C09B73',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                }}
              >
                Forget password?
              </Link>
            </Typography>
            <Typography
              color="text.secondyar"
              variant="body2"
            >
              <Link
                component={NextLink}
                href="/auth/register"
                underline="hover"
                variant="subtitle2"
                sx={{
                  color: '#C09B73',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                }}                      >
                Register now!
              </Link>
            </Typography>
          </div>
          <Stack
            spacing={1}
            sx={{ mt: 3 }}

          >
            <Typography
              sx={{
                textAlign: 'center',
                color: '#C09B73',
                fontFamily: 'IBM Plex Mono',
                fontSize: '22px',
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
              href="http://127.0.0.1:8000/api/auth/google/autentikasi"
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
