import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleSignIn } from '../store/slices/authThunk';

const GoogleSignInButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const idToken = tokenResponse.id_token; 

      if (!idToken) {
        dispatch(googleSignIn.rejected(new Error('ID Token not received from Google.'), 'googleSignIn/rejected'));
        return;
      }

      const resultAction = await dispatch(googleSignIn(idToken));

      if (googleSignIn.fulfilled.match(resultAction)) {
        // Additional actions on success, if needed
      } else if (googleSignIn.rejected.match(resultAction)) {
        // Additional actions on failure, if needed
      }

    } catch (error) {
      dispatch(googleSignIn.rejected(new Error('An unexpected error occurred during Google sign-in.'), 'googleSignIn/rejected'));
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (errorResponse) => {
      dispatch(googleSignIn.rejected(new Error(`Google login client error: ${errorResponse.error || 'Unknown error'}`), 'googleSignIn/rejected'));
    },
  });

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => login()}
      sx={{
        backgroundColor: '#4285F4',
        color: 'white',
        '&:hover': {
          backgroundColor: '#357ae8',
        },
        mt: 2,
        width: '100%',
        textTransform: 'none',
      }}
    >
      Войти через Google
    </Button>
  );
};

export default GoogleSignInButton;