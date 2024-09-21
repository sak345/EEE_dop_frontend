// import React from 'react';
import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';
import styles from '../../styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CompletedProjectsPage() {

  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const role = localStorage.getItem('role');
      const url = role === 'admin'
        ? `${process.env.REACT_APP_BACKEND_URL}admin/paper/getall`
        : `${process.env.REACT_APP_BACKEND_URL}paper/getall`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', localStorage.getItem('Token'));

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const fetchPromise = fetch(url, requestOptions);

      toast.promise(
        fetchPromise,
        {
          pending: 'Fetching papers...',
          success: 'Papers fetched successfully',
          error: 'Error fetching papers'
        }
      );

      try {
        const response = await fetchPromise;
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.papers);
        setProjects(result.papers.map(paper => ({
          id: paper._id,
          projectstatus: "",
        })));
        toast.dismiss();
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Error fetching papers: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (id, field, value) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleSubmit = (id) => {
    const project = projects.find(project => project.id === id);
    if (project.projectstatus === "" || project.projectstatus === "completed") {
      toast.dismiss();
      toast.error('Project is already completed');
    } else {
      // Send PATCH request to server with _id and selected option
      let data = JSON.stringify({
        "_id": id,
        "status_p": project.projectstatus
      });


      try {
        //? api patch req
        const url = `${process.env.REACT_APP_BACKEND_URL}paper/update`;
        const requestOptions = {
          method: 'PATCH',
          headers: {
            Authorization: localStorage.getItem('Token'),
            'Content-Type': 'application/json',
          },
          body: data,
        };

        const fetchPromise = fetch(url, requestOptions);

        toast.promise(
          fetchPromise,
          {
            pending: 'Updating project...',
            success: 'Project updated successfully',
            error: 'Error updating project'
          }
        );

        fetchPromise
          .then((response) => {
            if (response.status == 200) {
              console.log('updated successfully');
            }
            setData(prevData => prevData.filter(paper => paper._id !== id));
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.dismiss();
            toast.error(`Error updating paper: ${error.message}`);
          });
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Error updating paper: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <ProjectHeader />

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
                      <td>{data.submission_date ? data.submission_date.substring(0, 10) : ''}</td>
                      <td>{data.approved_date ? data.approved_date.substring(0, 10) : ''}</td>

                      <td>{data.start_date ? data.start_date.substring(0, 10) : ''}</td>
                      <td>{data.completed_date ? data.completed_date.substring(0, 10) : ''}</td>
                      <td className="_status">{data.status_p}</td>
                      <td><select style={styles.dropMenu} data-id="1" defaultValue={data.status_p} onChange={(e) => handleInputChange(data._id, 'projectstatus', e.target.value)}>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="submitted">Submitted</option>
                      </select>
                      </td>
                      <td> <button type="submit" onClick={() => handleSubmit(data._id)}>Submit</button> </td>


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