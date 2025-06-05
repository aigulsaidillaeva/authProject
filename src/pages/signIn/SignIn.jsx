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

  // Считываем состояние аутентификации из Redux
  const { isAuth, role, isLoading, error } = useSelector((state) => state.auth);

  // Используем useEffect для перенаправления после успешного входа
  useEffect(() => {
    if (isAuth && role === 'ADMIN') { // Проверяем, авторизован ли пользователь и является ли он админом
      navigate('/admin'); // Перенаправляем на путь /admin
    }
    // Если вы хотите перенаправить и обычного пользователя на другую страницу после входа,
    // вы можете добавить еще одно условие:
    // else if (isAuth && role === 'USER') {
    //   navigate('/user-dashboard'); // Например, на дашборд пользователя
    // }
  }, [isAuth, role, navigate]); // Зависимости: хук сработает при изменении этих значений

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