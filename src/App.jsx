
import { Route, Routes } from 'react-router'
import SignIn from './pages/signIn/SignIn'
import SignUp from './pages/signUp/SignUp'
import AdminPanel from './pages/AdminPanel'


const App = () => {
  return (
  <Routes>
    <Route path='/admin' element={<AdminPanel/>}/>
    <Route path='/login' element={<SignIn/>}/>        
   <Route path='/register' element={<SignUp/>}/>
  </Routes>
  )
}



export default App