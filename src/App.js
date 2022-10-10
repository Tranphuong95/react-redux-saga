import './App.css';
import ListRouter from './routes';
import NavbarMenu from './components/NavbarMenu';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

function App() {
  const {loading}= useSelector((state) => state.userReducers);
  return (
    <div className="App">
      <NavbarMenu/>
      <ListRouter/>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  );
}

export default App;
