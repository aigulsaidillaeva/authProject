import { Button, TextField, Typography, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../../store/slices/authThunk';

 const SignUp=()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
}
export default SignUp