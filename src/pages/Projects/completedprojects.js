// import React from 'react';
import React, { useEffect, useState } from "react";

import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';
import Inputform from '../../components/form';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from "axios";


const { Header, Content, Footer } = Layout;

// const handleOptionChange = (id, value) => {

//   //setProjectStatus(value)
//   // Send PATCH request to server with _id and selected option
//   let data = JSON.stringify({
//     "_id": id,
//     "status_p": value
//   });


//   try {
//     //? api patch req
//     let config = {
//       method: 'patch',
//       url: process.env.REACT_APP_BACKEND_URL+'paper/update',
//       headers: { 
//         'Authorization': localStorage.getItem('Token'),
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };

//     axios.request(config)
//       .then((response) => {
//       // console.log(JSON.stringify(response.data));
//       // setData(response.data.papers)
//       // console.log(response.data.papers)
//       if(response.status == 200) {
//         console.log("updated successfully")
//       }
//       // window.location.reload(); // Reload the page after successful request
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   } catch (err) {
//     console.error(err);
//   }
// };

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


function CompletedProjectsPage() {

  const [data, setData] = useState([]);
  const [projectstatus, setProjectStatus] = useState("");


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_BACKEND_URL + "paper/getall",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setData(response.data.papers);
        console.log(response.data.papers);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div>
        <Navbar/>
        <ProjectHeader/>
        <div className="site-layout" style={{ padding: '0 50px' }}>
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

                {/* <th>Duration</th> */}
                <th>Start Date</th>
                <th>Completed Date</th>
                <th>Current Status</th>
                <th>Edit Status</th>
                <th>Update</th>


              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                if (data.status_p === "completed") {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.funding_agency}</td>
                      <td>{data.agency_type}</td>
                      <td className="_status" >{data.title}</td>
                      <td className="_status">{data.PI}</td>
                      <td>{data.coPI}</td>
                      <td>{data.amount}</td>
                      <td>{data.submission_date}</td>
                      <td>{data.approval_date}</td>
                      <td>{data.start_date}</td>
                      <td>{data.completed_date}</td>
                      <td className="_status">{data.status_p}</td>
                      <td><select class="form-control edit-status-select" data-id="1" defaultValue={data.status_p} onChange={(e)=>setProjectStatus(e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                          <option value="submitted">Submitted</option>
                          </select>
                       </td>
                       <td> <button onClick={() => handleOptionChange(data._id, projectstatus)}>Submit</button> </td>


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

export default CompletedProjectsPage;