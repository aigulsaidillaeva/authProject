import { Button, TextField, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'; 
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router'; 
import { loginUser } from '../../store/slices/authThunk';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

 
  const { isAuth, role, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth && role === 'ADMIN') { 
      navigate('/admin'); 
    }
    
  }, [isAuth, role, navigate]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
        </Button> 
        {error && <Typography color="error" mt={2}>{error}</Typography>} 
      </form>
    </Container>
  );
}

export default SignIn;