// import React from 'react';
import React, { useEffect, useState } from "react";
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar';
import axios from "axios";
import Inputform from '../../components/form';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink } from "react-router-dom";
import styles from '../../styles';


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
//   console.log("data: ", data);
// };



function OngoingProjectsPage() {

  const [data, setData] = useState([]);
  const [projectstatus, setProjectStatus] = useState("");
  const [completedDate, setCompletedDate] = useState(null); //? to store date
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    let confi = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_BACKEND_URL+'user/me',
      headers: { 
        'Authorization': localStorage.getItem('Token')
      },
    };
    // Make a GET request to the server to get the user's role
    axios.get(confi).then((response) => {
      const { role } = response.data;

      // If the user is an admin, set the state to true
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);


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



  const handleOptionChange = (id, value) => {

  if((value == "completed" && completedDate !== null) || (value == "submitted") || (value == "rejected")){
    
    if(value === "accepted" ){
      value = "ongoing";
    }

    if(value!==""){
      //setProjectStatus(value)
      // Send PATCH request to server with _id and selected option
      let data = JSON.stringify({
        "_id": id,
        "status_p": value,
        "completed_date": completedDate
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
  } else {
    alert("completed date not selected")
  }
};

  if(isAdmin)
  {
    return (
      <div>
        <Navbar />
        {/* <ProjectHeader /> */}
        <header >
              <h1 style={styles.pageTitle}>Projects</h1>
  
              <nav style={styles.nav}>
                  <ul style={styles.navContainer}>
                      <li style={styles.firstChild}>
                          <NavLink to="/enterproject"><button className="button-nav">Enter Project</button></NavLink>
                      </li>
                      <li>
                          <NavLink to="/project"><button className="button-nav">All Projects</button></NavLink>
                      </li>
                      <li>
                          <NavLink to="/submittedproject"><button className="button-nav">Submitted Projects</button></NavLink>
                      </li>
                      <li>
                          <NavLink to="/rejectedproject"><button className="button-nav">Rejected Projects</button></NavLink>
                      </li>
                      <li>
                          <NavLink to="/ongoingproject"><button className="button-nav-1">Ongoing Projects</button></NavLink>
                      </li>
                      <li>
                          <NavLink to="/completedproject"><button className="button-nav">Completed Projects</button></NavLink>
                      </li>
                      <li style={styles.lastChild}>
                          <NavLink to="/downloadproject"><button className="button-nav">Download Projects</button></NavLink>
                      </li>
                  </ul>
              
              </nav>
          </header>
  
  
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
  
                  {/* <th>Duration</th> */}
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Completed Date</th>
                  <th>Current Status</th>
  
                  <th>Edit Status</th>
                  <th>Update</th>
  
  
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => {
                  if (data.status_p === "ongoing" ) {
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
                        <td>{data.approved_date}</td>
                        {/* <td>{data.duration}</td> */}
                        <td>{data.start_date}</td>
                        <td>{data.end_date}</td>
  
                        <td>
                          <input type='date' id="endDate" required 
                          // value={completedDate}
                          onChange={(e) => setCompletedDate(e.target.value)}
                          />
                        </td>
                       
          
                        <td className='_status'>{data.status_p}</td>
  
                        <td><select style={styles.dropMenu}  type="submit" data-id="1" defaultValue={data.status_p} onChange={(e)=>setProjectStatus(e.target.value)}>
                              <option value="ongoing">Ongoing</option>
                              <option value="completed">Completed</option>
                              <option value="rejected">Rejected</option>
                              <option value="submitted">Submitted</option>
  
                            </select>
                        </td>
                        <td> <button type="submit" onClick={() => handleOptionChange(data._id, projectstatus)}>Submit</button> </td>
    
  
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

  return (
    <div>
      <Navbar />
      {/* <ProjectHeader /> */}
      <header >
            <h1 style={styles.pageTitle}>Projects</h1>

            <nav style={styles.nav}>
                <ul style={styles.navContainer}>
                    <li style={styles.firstChild}>
                        <NavLink to="/enterproject"><button className="button-nav">Enter Project</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/project"><button className="button-nav">All Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/submittedproject"><button className="button-nav">Submitted Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/rejectedproject"><button className="button-nav">Rejected Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ongoingproject"><button className="button-nav-1">Ongoing Projects</button></NavLink>
                    </li>
                    <li style={styles.lastChild}>
                        <NavLink to="/completedproject"><button className="button-nav">Completed Projects</button></NavLink>
                    </li>
                    {/* <li style={styles.lastChild}>
                        <NavLink to="/downloadproject"><button className="button-nav">Download Projects</button></NavLink>
                    </li> */}
                </ul>
            
            </nav>
        </header>


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

                {/* <th>Duration</th> */}
                <th>Start Date</th>
                <th>End Date</th>
                <th>Completed Date</th>
                <th>Current Status</th>

                <th>Edit Status</th>
                <th>Update</th>


              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                if (data.status_p === "ongoing" ) {
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
                      <td>{data.approved_date}</td>
                      {/* <td>{data.duration}</td> */}
                      <td>{data.start_date}</td>
                      <td>{data.end_date}</td>

                      <td>
                        <input type='date' id="endDate" required 
                        // value={completedDate}
                        onChange={(e) => setCompletedDate(e.target.value)}
                        />
                      </td>
                     
        
                      <td className='_status'>{data.status_p}</td>

                      <td><select style={styles.dropMenu}  type="submit" data-id="1" defaultValue={data.status_p} onChange={(e)=>setProjectStatus(e.target.value)}>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                            <option value="submitted">Submitted</option>

                          </select>
                      </td>
                      <td> <button type="submit" onClick={() => handleOptionChange(data._id, projectstatus)}>Submit</button> </td>
  

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

export default OngoingProjectsPage;