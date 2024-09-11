import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import styles from '../styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './homepage.css';


function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {

    const params = new URLSearchParams(location.search);
    if (params.get('notAuthorized') === 'true') {
      params.delete('notAuthorized');
      toast.error('You are not authorized to access that page.');
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    }, { replace: true });
  }, []);

  return (
    <div>
      <Navbar />

      <div style={styles.homeContainer} >
        <div className='page-content'>
          {/* <Link to="/project"><button className="button home"> Project</button></Link> */}
          <Link to="/project"><div className="card project">
            <div className="content">
              <h2 className="title">Projects</h2>
              <p className="copy"></p>
              <button className="btn">View Projects</button>
            </div>
          </div></Link>
          <Link to="/journals"><div className="card journal">
            <div className="content">
              <h2 className="title">Journals</h2>
              <p className="copy"></p>
              <button className="btn">View Journals</button>
            </div>
          </div></Link>
          <Link to="/awards"><div className="card theses">
            <div className="content">
              <h2 className="title">Awards</h2>
              <p className="copy"></p>
              <button className="btn">View Awards</button>
            </div>
          </div></Link>
          <Link to="/guestlectures"><div className="card research">
            <div className="content">
              <h2 className="title">Guest Lectures</h2>
              <p className="copy"></p>
              <button className="btn">View Lectures</button>
            </div>
          </div></Link>
        </div>
      </div>

    </div>
  );
}

export default HomePage;