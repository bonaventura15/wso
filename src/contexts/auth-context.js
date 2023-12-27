import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  },
  [HANDLERS.USER_INFORMATION]: (state, action) => {
    const userData = action.payload;

    return {
      ...state,
      user: userData,
    };
  },
  [HANDLERS.DELETE_ACCOUNT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const api = 'http://waifu-set-on.wso:8000/api/'

  const characterEndpoints = {
    "Meimei Himari": "pesan-meimei-himari",
    "NURSE-T": "pesan-nurseT",
    "Kusukabe Tsumugi": "pesan-kusukabe-tsumugi",
    "NO.7": "pesan-no7",
    "SAYO": "pesan-sayo",
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };


  useEffect(
    () => {
      initialize();
    },
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (emailORname, password) => {
    try {
      const response = await fetch(`${api}auth/wso/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailORname: emailORname,
          password: password,
        }),
      });

      if (response.status === 200) {
        const rest = await response.json();
        return rest.url;
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
        throw new Error('Validation Error');
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      throw new Error('nama, email atau password yang anda masukan salah');
    }
  };
  

  
  const getToken = async (email) => {
    try {
      const tokenResponse = await fetch(`${api}auth/wso/register/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (tokenResponse.status === 200) {
        console.log('Token request successful');
        alert('Token Telah Terkirim Silahkan Cek Email Anda');
        return true; 
      } else if (tokenResponse.status === 422) {
        const errorData = await tokenResponse.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', tokenResponse.status);
      }
    } catch (err) {
      console.error(err);
    }
    return false; 
  };
  
  const signUp = async (email, token, password, confirmPassword) => {
    try {
      const requestBody = JSON.stringify({
        email,
        password,
        konfirmasi_password: confirmPassword,
        token,
      });
  
      const response = await fetch(`${api}auth/wso/simpan-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (response.status === 201) {
        const rest = await response.json();
        return rest.url;
      } else {
        const errorData = await response.json();
        console.error('Request failed with status:', response.status);
        console.error('Error Details:', errorData);
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };
  
  const updateuser = async (nama, gender, ulang_tahun) => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }
  
      const response = await fetch(`${api}user-root/update-data`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
        body: JSON.stringify({
          nama,
          gender,
          ulang_tahun,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: HANDLERS.SIGN_UP
        });
        console.log('User data updated successfully:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };
  
  const userinformation = async () => {
    try {
      const accessToken = getCookie('access_token');

      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }

      const response = await fetch(`${api}user-root/get-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
      dispatch({
        type: HANDLERS.USER_INFORMATION,
        payload: userData,
      });
        console.log('User data retrieved successfully:', userData);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error.message);
    }
  };

  const deleteaccount = async () => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }
  
      const response = await fetch(`${api}user-root/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });
  
      if (response.ok) {
        dispatch({
          type: HANDLERS.DELETE_ACCOUNT,
        });
        console.log('Account deleted successfully');
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };  

  const asistenwaifu = async (selectedCharacter, userInput) => {
    try {
      const endpoint = characterEndpoints[selectedCharacter];
      const apiUrl = `${api}aiu/${endpoint}?pesan=${encodeURIComponent(userInput)}`;
      const access_token = getCookie("access_token");

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': access_token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      } else {
        console.error('Error occurred while fetching data.');
        return { data: null, error: 'Error occurred while fetching data.' };
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return { data: null, error: 'Error occurred while fetching data.' };
    }
  };
  
  const becomewaifu = async (selectedSpeakerId, formData) => {
    try {
      const selectedLanguage = getCookie("selectedLanguage");
      const accessToken = getCookie('access_token');
      
      const response = await fetch(`${api}bw/change-voice/${selectedSpeakerId}?bahasa=${selectedLanguage}`, {
        method: 'POST',
        body: formData,
        headers: {
          'access-token': accessToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        const errorData = await response.json();
        console.error('Error:', response.statusText, errorData);
        return { error: 'An error occurred while making the request.' };
      }
    } catch (error) {
      console.error('An error occurred while making the request:', error);
      return { error: 'An error occurred while making the request.' };
    }
  };

  const getaudiolog = async () => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }
  
      console.log('Access Token:', accessToken);
  
      const response = await fetch(`${api}bw/get-all-audio-log`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const logData = await response.json();
        console.log('Audio log data retrieved successfully:', logData);
  
        if (Array.isArray(logData)) {
          return logData;
        } else {
          console.error('Unexpected response structure:', logData);
          return [];
        }
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
        return [];
      } else {
        console.error('Unexpected response status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error retrieving audio log data:', error.message);
      return [];
    }
  };
  
  const deleteauidolog = async (audioId) => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }
  
      const response = await fetch(`${api}bw/delete-audio-log/${audioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });
  
      if (response.ok) {
        console.log('Audio log deleted successfully');
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting audio log:', error.message);
    }
  };

  const savetodrive = async (audioId) => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }
  
      const response = await fetch(`${api}bw/save-to-drive-only?audio_id=${audioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Save to drive successful:', responseData);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error saving to drive:', error.message);
    }
  };

  const getaudiodata = async (audioId) => {
    try {
      const accessToken = getCookie('access_token');
  
      if (!accessToken) {
        console.error('Access token not found in cookies');
        return null;
      }
  
      const response = await fetch(`${api}bw/get-audio-data?audio_id=${audioId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
      });
  
      if (response.ok) {
        const audioData = await response.json();
        console.log('Audio data retrieved successfully:', audioData);
        return audioData;
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
        return null;
      } else {
        console.error('Unexpected response status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error retrieving audio data:', error.message);
      return null;
    }
  };

  const sharetosmd = async (audioId, caption, accessToken) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/bw/share-to-smd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
        body: JSON.stringify({
          audio_id: audioId,
          caption: caption,
        }),
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Share to SMD successful:', responseData);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };
  
  const forgotpassword = async (email) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user-root/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log('Password reset email sent successfully:', result);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const changepassword = async (password, confirmPassword) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user-root/change-password', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          konfirmasi_password: confirmPassword,
        }),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log('Password changed successfully:', result);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };
  
  const obrolangpt = async (accessToken, karakter, input) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/aiu/obrolan-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
        body: JSON.stringify({
          karakter,
          input
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Successful Response:', responseData);
        return responseData;
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation Error:', errorData);
        throw new Error('Validation Error');
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred');
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        getToken,
        updateuser,
        userinformation,
        deleteaccount,
        asistenwaifu,
        becomewaifu,
        getaudiolog,
        deleteauidolog,
        savetodrive,
        getaudiodata,
        forgotpassword,
        changepassword,
        sharetosmd,
        obrolangpt
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
