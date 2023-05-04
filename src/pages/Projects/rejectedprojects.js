import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar'; 
import axios from 'axios';

function RejectedProjectsPage() {
  const [data, setData] = useState([]);
  const [projectstatus, setProjectStatus] = useState("");

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

  const handleOptionChange = (id, value) => {
    if(value === "accepted" ){
      value = "ongoing";
    }

    if(value!==""){
      //setProjectStatus(value)
      // Send PATCH request to server with _id and selected option
      let data = JSON.stringify({
        "_id": id,
        "status_p": value
      });


      try {
        //? api patch req
        let config = {
          method: 'patch',
          url: process.env.REACT_APP_BACKEND_URL+'paper/update',
          headers: { 
            'Authorization': localStorage.getItem('Token'),
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
          // console.log(JSON.stringify(response.data));
          // setData(response.data.papers)
          // console.log(response.data.papers)
          if(response.status == 200) {
            console.log("updated successfully")
          }
          window.location.reload(); // Reload the page after successful request
        })
        .catch((error) => {
          console.log(error);
        });

      } catch (err) {
        console.error(err);
      }
    }
  };


  const handleDelete = (id) => {

    //setProjectStatus(value)
    // Send PATCH request to server with _id and selected option
    let data = JSON.stringify({
      "_id": id
    });


    try {
      //? api patch req
      let config = {
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL+'paper/delete',
        headers: { 
          'Authorization': localStorage.getItem('Token'),
          'Content-Type': 'application/json'
        },
        data: data
      };
      console.log(data);
      axios.request(config)
        .then((response) => {
        // console.log(JSON.stringify(response.data));
        // setData(response.data.papers)
        // console.log(response.data.papers)
        if(response.status == 200) {
          console.log("deleted successfully")
        }
        window.location.reload(); // Reload the page after successful request
      })
      .catch((error) => {
        console.log(error);
      });

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <Navbar/>
      <ProjectHeader/>
      
      <div className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>

        <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Funding Agency</th>
            <th>Organization</th>
            <th>Title</th>
            <th>PI</th>
            <th>Co-PI</th>
            <th>Amount</th>
            <th>Submission Date</th>
            <th>Approval Date</th>
            <th>Approval Status</th>
            <th>Edit Status</th>
            <th>Update </th>

            <th>Delete </th>
          </tr>
        </thead>
        <tbody>
              {data.map((data, index) => {
                if (data.status_p === "rejected" ) {
                  return (
                    <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.funding_agency}</td>
              <td>{data.agency_type}</td>
              <td className="_status">{data.title}</td>
              <td className="_status">{data.PI}</td>
              <td>{data.coPI}</td>
              <td>{data.amount}</td>
              <td>{data.submission_date}</td>
              <td>{data.approval_date}</td>
              {/* <td>
              <input
               type='date'
              id="submissionDate"
                required
              />
              </td> */}

              <td className='_status'>{data.status_p}</td>
              {/* <td><select class="form-control edit-status-select" data-id="1" defaultValue={data.status_p}  onChange={(e) => handleOptionChange(data._id, e.target.value)} > */}
              <td><select class="form-control edit-status-select" data-id="1" defaultValue={data.status_p} onChange={(e)=>setProjectStatus(e.target.value)}>
                 <option value="rejected">Rejected</option>
                 <option value="submitted">Submitted</option>
                </select>
              </td>
              <td> <button onClick={() => handleOptionChange(data._id, projectstatus)}>Submit</button> </td>
              {/* <td> <button onClick={() => handleOptionChange(data._id, projectstatus)}>Submit</button> </td> */}
              <td><button onClick={() => handleDelete(data._id) }>Delete</button></td>
  
            </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
      </table>

        </div>
      </div>
      
     
      

    </div>
  );
}

export default RejectedProjectsPage;