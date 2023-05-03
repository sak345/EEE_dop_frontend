import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar'; 
import axios from 'axios';

function DownloadProjectsPage() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [status, setStatus] = useState("ongoing")
  
  const handleDownload=()=>{
    let data = JSON.stringify({
      "start_date": startDate,
      "end_date": endDate,
      "status": status
    })

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_BACKEND_URL + "paper/download",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
        data: data
      };
      console.log("uri:",process.env.REACT_APP_BACKEND_URL + "paper/download", "start_date:", startDate,
      "end_date:", endDate,
      "status: ", status);
      axios.request(config)
          .then((response) => {
          // console.log(JSON.stringify(response.data));
          // setData(response.data.papers)
          // console.log(response.data.papers)
          if(response.status == 200) {
            console.log("Downloaded succesfully")
          }
          // window.location.reload(); // Reload the page after successful request
        })
        .catch((error) => {
          console.log(error);
        });

      } catch (err) {
        console.error(err);
      }
    }
    

  return (
    <div>
      <Navbar/>
      <ProjectHeader/>

      <div className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>

        <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Download</th>

          </tr>
        </thead>
        <tbody>

            <td>
                 <input type='date' id="startDate" required
                 // value={submissionDate}
                 onChange={(e) => setStartDate(e.target.value)}
                 />
            </td>

            <td>
                 <input type='date' id="endDate" required
                 // value={submissionDate}
                 onChange={(e) => setEndDate(e.target.value)}
                 />
            </td>

            <td>
            <select class="form-control edit-status-select" data-id="1" onChange={(e)=>setStatus(e.target.value)}>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                      <option value="submitted">Submitted</option>
                      <option value="all_projects">All Projects</option>
            </select>
            </td>

            <td><button onClick={(e) => handleDownload(e)}>Download</button></td>

        </tbody>
      </table>

        </div>
      </div>
      
      

        
       
      

        
      
     
      

    </div>
  );
}

export default DownloadProjectsPage;