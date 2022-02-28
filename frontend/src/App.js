import logo from './logo.svg';
import './App.css';
import SignIn from './Components/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import AppOne from './Components/Video/AppOne';
import Call from './Components/Video/Call';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video" element={<AppOne /> } />
        <Route path="/screen" element={<Call />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
