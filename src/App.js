import './App.css';
import Header from './Header';
import Home from './Home';
import logo from './images/logo.png';
import homepic from './images/homepic.jpg'
import camimg from './images/camimg.jpg'
import advisor from './images/adv.jpeg'
import { Route,Routes } from 'react-router-dom';
import RequestPage from './RequestPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HandleEvents from './HandleEvents';
import { useState } from 'react';
function App() {
  const [loggedin,setloggedin]=useState(false)
  return(
    <div className='App'>
          <Header logo={logo} 
          loggedin={loggedin}
          setloggedin={setloggedin} />
          <Routes> 
            <Route path='/' element={<Home homepic={homepic}
            camimg={camimg}
            advisor={advisor}
            loggedin={loggedin}
            />}/>
            <Route path='/loginpage' element={<LoginPage
            setloggedin={setloggedin}
            />}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/requestpage' element={<RequestPage/>}/>
            <Route path='/handlerequests' element={<HandleEvents/>}/>
          </Routes>
          
    </div>
  )
}

export default App;
