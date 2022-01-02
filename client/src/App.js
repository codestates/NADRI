import './App.css'
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import Login from './components/Modals/Login'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const LoginModalstate = useSelector(state => state.loginReducer.state);

  
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
      {
        LoginModalstate ? <Login />
        : ''
      }
    </div>
  );
}

export default App;
