import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';
const Home = ({ homepic ,camimg,advisor,loggedin}) => {
  const sectionStyle = {
    backgroundImage: `url(${homepic})`,
    width: '100vw', // Ensure it spans full width of viewport
    minHeight: '100vh', // Ensures it has a minimum height
  };
  const sectionStyle1 = {
    backgroundImage: `url(${camimg})`,
    width: '100vw', // Ensure it spans full width of viewport
    minHeight: '100vh', // Ensures it has a minimum height
  };
  const sectionStyle2 = {
    backgroundColor:'black',
    width: '100vw', // Ensure it spans full width of viewport
    minHeight: '100vh', // Ensures it has a minimum height
    opacity:'0.9'
  };

  return (
    <div>
      <section className="vision" style={sectionStyle}>
        <div className='visioncontent'>
            <h1>Vision</h1>
            <p>"Our vision is to cultivate a dynamic community of aspiring photographers at the Coimbatore Institute of Technology, dedicated to exploring, capturing, and sharing the diverse narratives of our world. We aim to empower our members through skill development, collaborative projects, and creative expression, enhancing their photographic journey. By actively engaging in local events and initiatives, we strive to foster a spirit of appreciation for art and storytelling, leaving a positive impact on both our campus and the broader community."</p>
        </div>
      </section>
      <div className='bookbtn'>
        <form onSubmit={(e) => e.preventDefault()}>
            <Link to={loggedin ? '/requestpage' : '/loginpage'}><button>Book to cover an event</button></Link>
        </form>
    </div>
      
      <section className='vision1' style={sectionStyle1}>
      <div className='visioncontent'>
            <h1>Mission</h1>
            <p>"Our mission is to create an inclusive and inspiring environment for students at the Coimbatore Institute of Technology to explore the art of photography. We strive to provide educational resources, hands-on workshops, and opportunities for collaboration that enhance technical skills and creative vision. By organizing events, exhibitions, and community outreach projects, we aim to promote the appreciation of photography as a powerful medium of storytelling and self-expression. Together, we seek to empower our members to capture and share their unique perspectives, fostering a community that celebrates creativity and innovation."</p>
        </div>
      </section>
      <section className='vision2' style={sectionStyle2} id='About'> 
  <div className='visioncontent2'>
    <div className='club-details'>
      <h2 style={{ color: 'black' }}>Club Details</h2>
      <p>
        The Photography Club at CIT is a community for photography enthusiasts to learn, share, and collaborate.
      </p>
      <h3 style={{ color: 'green' }}>Objectives:</h3>
      <ul>
        <li>Promote photography as an artistic expression.</li>
        <li>Enhance technical skills through workshops and tutorials.</li>
        <li>Organize photo walks and exhibitions to showcase members' work.</li>
      </ul>
      <h3 style={{ color: 'green' }}>Activities:</h3>
      <ul>
        <li>Workshops: Covering camera techniques and editing skills.</li>
        <li>Photo Walks: Group outings to practice photography.</li>
        <li>Exhibitions: Displaying members' photographs on campus.</li>
        <li>Competitions: Encouraging creativity and skill development.</li>
      </ul>
    </div>

    <div className='advisor-details'>
      <h2 style={{ color: 'black' }}>Club Advisor</h2>
      <img src={advisor} alt="Advisor" className='advisor-image' style={{ marginLeft: '230px' }} />
      <p>Advisor Name:yyyy</p>
      <p>Department: Mechanical Engineering</p>
      <p>Office Number: yy</p>
      <p>Mobile: yyy</p>
      <p>Email: <a href="mailto:xx" className='remdec'>yy</a></p>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
