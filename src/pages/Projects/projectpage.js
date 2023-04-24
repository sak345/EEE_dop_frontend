import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar'; 
import axios from 'axios';

function ProjectPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BACKEND_URL+'paper/getall',
    headers: { 
      'Authorization': localStorage.getItem('Token')
    },
  };

    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setData(response.data.papers)
      console.log(response.data.papers)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])


  return (
    <div>
      <Navbar/>
      <ProjectHeader/>
      
      <p>This is an empty template for your project page.</p>
      <p>{JSON.stringify(data)}</p>
      {/* <Link to="/submittedproject"><button>Submitted Projects</button></Link>
      <Link to="/ongoingproject"><button>Ongoing Projects</button></Link>
      <Link to="/completedproject"><button>Completed Projects</button></Link> */}


    </div>
  );
}

export default ProjectPage;