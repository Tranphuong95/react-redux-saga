import './App.css';
import ListRouter from './routes';
import NavbarMenu from './components/NavbarMenu';

function App() {
  return (
    <div className="App">
      <NavbarMenu/>
      <ListRouter/>
    </div>
  );
}

export default App;
