import { Button, TextField, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../store/slices/authThunk';
import GoogleSignInButton from '../../components/GoogleSignInButton';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, role, isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuth && role === 'ADMIN') {
      navigate('/admin');
    }
  }, [isAuth, role, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </form>
      <GoogleSignInButton />
    </Container>
  );
}

export default SignIn;
