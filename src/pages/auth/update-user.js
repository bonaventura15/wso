import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';
import { useCallback, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { TopNav } from 'src/layouts/dashboard/top-nav';

const Page = () => {
    const router = useRouter();
    const auth = useAuth();
    const [selectedGender, setSelectedGender] = useState('');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [isBold, setIsBold] = useState(false);

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
        setIsBold(true);
        formik.handleChange('gender')(gender);
    };

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    const formik = useFormik({
        initialValues: {
            nama: '',
            gender: selectedGender,
            ulang_tahun: null,
        },
        validationSchema: Yup.object({
            nama: Yup.string().max(255),
            gender: Yup.string().max(255),
            ulang_tahun: Yup.date().nullable(),
        }),
        onSubmit: async (values, helpers) => {
            try {
                alert('User data successfully updated');
                const access_token = getCookie("access_token");

                await auth.updateuser(values.nama, values.gender, values.ulang_tahun);
                router.push('/');
            } catch (err) {
                console.error('Error updating user data:', err);
            }
        },
    });


    const handleSkip = useCallback(
        () => {
            auth.skip();
            router.push('/');
        },
        [auth, router]
    );


    return (
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
                    py: '117px',
                    width: '100%',
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{
                        textAlign: 'center',
                        color: '#D89F51',
                        fontFamily: 'Akaya Telivigala',
                        fontSize: '96px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                    }}>            Update User
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit} style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <TextField
                            error={!!(formik.touched.nama && formik.errors.nama)}
                            fullWidth
                            helperText={formik.touched.nama && formik.errors.nama}
                            label=" Your Name"
                            name="nama"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.nama}
                            InputLabelProps={{
                                style: {
                                    color: '#544238',
                                    fontSize: '14px',
                                },
                            }}
                        />
                        <ButtonGroup variant="text" aria-label="text button group" fullWidth style={{ marginBottom: '10px', border: '4px solid #C09B73', background: '#EADDD2', marginTop: '10px' }}>
                            <Button
                                value="pria"
                                onClick={() => {
                                    handleGenderClick('pria');
                                    formik.handleChange('gender')('pria');
                                }}
                                sx={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    textDecorationLine: 'underline',
                                    fontWeight: selectedGender === 'pria' ? 'bold' : 400,
                                }}
                            >
                                MALE
                            </Button>

                            <Button
                                value="perempuan"
                                onClick={() => {
                                    handleGenderClick('perempuan');
                                    formik.handleChange('gender')('perempuan');
                                }}
                                sx={{
                                    color: '#544238',
                                    fontFamily: 'IBM Plex Mono',
                                    fontSize: '22px',
                                    textDecorationLine: 'underline',
                                    fontWeight: selectedGender === 'perempuan' ? 'bold' : 400,
                                }}
                            >
                                FEMALE
                            </Button>
                        </ButtonGroup>

                        <TextField
                            error={!!(formik.touched.ulang_tahun && formik.errors.ulang_tahun)}
                            fullWidth
                            helperText={formik.touched.ulang_tahun && formik.errors.ulang_tahun}
                            label="Ulang Tahun"
                            name="ulang_tahun"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="date"
                            value={formik.values.ulang_tahun instanceof Date ? formik.values.ulang_tahun.toISOString().split('T')[0] : formik.values.ulang_tahun || ''}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    color: '#544238',
                                    fontSize: '14px',
                                },
                            }}
                        />
                        <ButtonGroup variant="text" aria-label="text button group" style={{ width: '500px', border: '4px solid #C09B73', background: '#EADDD2', marginTop: '40px' }} >
                            <Button
                                sx={{ color: '#544238', fontSize: '36px', width: '50%', fontFamily: 'IBM Plex Mono', fontWeight: 400, textDecorationLine: 'underline', fontStyle: 'normal' }}
                                type="submit"
                            >
                                UPDATE
                            </Button>
                            <Button
                                onClick={handleSkip}
                                sx={{ color: '#544238', fontSize: '36px', width: '50%', fontFamily: 'IBM Plex Mono', fontWeight: 400, textDecorationLine: 'underline', fontStyle: 'normal' }}
                            >
                                SKIP
                            </Button>
                        </ButtonGroup>
                    </form>
                </Stack>
            </Box>
        </Box>
    );
};

Page.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default Page;