// import React from 'react';
import React, { useEffect, useState } from "react";
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar';
import axios from "axios";
import Inputform from '../../components/form';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer } = Layout;


function OngoingProjectsPage() {

  const [data, setData] = useState([]);

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
      <Navbar />
      <ProjectHeader />
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
                {/* <th>Duration</th> */}
                <th>Approval Status</th>
                {/* <th>Start Date</th>
                <th>Completed Date</th>
                <th>Current Status</th>
                <th>End Date</th> */}


              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                if (data.status_p === "accepted") {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.funding_agency}</td>
                      <td>{data.agency_type}</td>
                      <td>{data.title}</td>
                      <td>{data.PI}</td>
                      <td>{data.coPI}</td>
                      <td>{data.amount}</td>
                      <td>{data.submission_date}</td>
                      {/* <td>{data.duration}</td> */}
                      <td>{data.status_p}</td>
                      {/* <td>{data.start_date}</td>
                      <td>{data.completed_date}</td>
                      <td>{data.status_c}</td>
                      <td>{data.end_date}</td> */}

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