import Main from './Pages/Main'
import './App.css'
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import { Routes, Route, useNavigate, Navigate, BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      {/* <Routes>
        <Route path='/'element={<Main />} />
      </Routes> */}
      <Footer />
    </div>
  );
}

export default App;
