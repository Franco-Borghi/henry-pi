import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

function LandingPage() {
  
  React.useEffect(() => {
    document.querySelector('Nav').style.display = 'none';

    return () => {
      document.querySelector('Nav').style.display = '';
    }
  }, [])

  return (
    <div className='landing-page-container'>
      <h1 className='arcoiris'>Henry Videogames</h1>
      
      <Link to='/home'></Link>
    
      <p onClick={() => window.open('https://www.linkedin.com/in/franco-j-borghi/', '_blank')} className='small-text'>© Franco Borghi</p>
    </div>
  )
}

export { LandingPage };