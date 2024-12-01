import React, { useState ,useRef, useEffect} from 'react';
import './header.css'
import './Home.js'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = ({ logo ,loggedin,setloggedin}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownref= useRef(null)
  const navigate=useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    const handleclickoutside=(event)=>{
      if(dropdownref.current && !dropdownref.current.contains(event.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown',handleclickoutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleclickoutside);
    };
  },[dropdownref])
  const handleLogout=(e)=>{
    e.preventDefault();
    setloggedin(false)
    navigate('/')
  }

  return (
    <div className='header'>
      <img src={logo} alt="Logo" />
      <h1 className='title'>KLIC studios</h1>
      
      {/* Hamburger menu for mobile */ }
      <div className="hamburger" onClick={toggleDropdown}>
        &#9776;
      </div>
      
      {/* Navigation links */}
      <div className={`pagenav ${isOpen ? 'open' : ''}`} ref={dropdownref}  >
        <Link  to='/'style={{ textDecoration: 'none' }} ><p>Home</p></Link>
        <Link style={{ textDecoration: 'none' }} to={loggedin ? '/requestpage' : '/loginpage'}><p >Request Page</p></Link>
        <Link style={{ textDecoration: 'none' }} to='/handlerequests'><p >Handle Events</p></Link>
        <p>What we do?</p>
        <p>Members</p>
        <p ><a style={{ textDecoration: 'none' }} className='about-link' href="#About">About</a></p>
        <p id ='remdec'onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
};

export default Header;
