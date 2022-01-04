import './App.css'
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import Login from './components/Modals/LoginModal/Login'
import Signup from './components/Modals/SignupModal/Signup'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);


  // useEffect(() => { 새로고침 스크롤 TOP
  //   window.onbeforeunload = function pushRefresh() {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
      {
        LoginModalstate ? <Login />
        : ''
      }
      {
        SignupModalstate ? <Signup />
        : ''
      }
    </div>
  );
}

export default App;
