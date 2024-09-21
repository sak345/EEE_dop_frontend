import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar';
// import datepicker from '../../components/datepicker';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import styles from '../../styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubmittedProjectsPage() {
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
          approvedDate: null,
          startedDate: null,
          endedDate: null
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
    if ((project.projectstatus === "rejected" && project.approvedDate !== null) || (project.projectstatus === "accepted" && project.approvedDate !== null && project.startedDate !== null && project.endedDate !== null && project.startedDate <= project.endedDate)) {
      if (project.projectstatus === "accepted") {
        project.projectstatus = "ongoing"
      }

      if (project.projectstatus !== "") {
        // Send PATCH request to server with _id and selected option
        let data = JSON.stringify({
          "_id": id,
          "status_p": project.projectstatus,
          "approved_date": project.approvedDate,
          "start_date": project.startedDate,
          "end_date": project.endedDate
        });

        try {
          const url = process.env.REACT_APP_BACKEND_URL + 'paper/update';

          const requestOptions = {
            method: 'PATCH',
            headers: {
              'Authorization': localStorage.getItem('Token'),
              'Content-Type': 'application/json'
            },
            body: data
          };

          const fetchPromise = fetch(url, requestOptions);

          toast.promise(
            fetchPromise,
            {
              pending: 'Updating paper...',
              success: 'Paper updated successfully',
              error: 'Error updating paper'
            }
          );

          fetchPromise
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              setData(prevData => prevData.filter(paper => paper._id !== id));
              // window.location.reload(); // Reload the page after successful request
            })
            .catch(error => {
              console.error('Error:', error);
              toast.dismiss();
              toast.error(`Error updating paper: ${error.message}`);
            });

        } catch (err) {
          console.error(err);
          toast.error(`Unexpected error: ${err.message}`);
        }
      }
    } else if (project.projectstatus === "") {
      toast.dismiss();
      toast.error('Please select a status');
    } else if (project.projectstatus === "accepted" && project.approvedDate === null) {
      toast.dismiss();
      toast.error('Please select an approval date');
    } else if (project.projectstatus === "accepted" && (project.startedDate === null || project.endedDate === null)) {
      toast.dismiss();
      toast.error('Please fill in start and end dates');
    }
    else if (project.projectstatus === "accepted" && project.startedDate > project.endedDate) {
      toast.dismiss();
      toast.error('Start date should be less than end date');
    } else if (project.projectstatus === "rejected" && project.approvedDate === null) {
      toast.dismiss();
      toast.error('Please select an approval date');
    } else if (project.projectstatus === "submitted") {
      toast.dismiss();
      toast.error('Project is already submitted');
    }
    else {
      toast.dismiss();
      toast.error('Please fill in all the fields');
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
        url: process.env.REACT_APP_BACKEND_URL + 'paper/delete',
        headers: {
          'Authorization': localStorage.getItem('Token'),
          'Content-Type': 'application/json'
        },
        data: data
      };
      console.log(data);
      axios.request(config)
        .then((response) => {
          if (response.status == 200) {
            console.log("deleted successfully")
          }
          setData(prevData => prevData.filter(paper => paper._id !== id));
          // window.location.reload(); // Reload the page after successful request
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
      <Navbar />
      <ProjectHeader />

      <div className="site-layout" style={{ paddingTop: 12, minHeight: 380, overflowX: 'auto' }}>

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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Current Status</th>
              <th>Edit Status</th>
              <th>Update </th>

              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              if (data.status_p === "submitted") {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.funding_agency}</td>
                    <td>{data.agency_type}</td>
                    <td className="_status">{data.title}</td>
                    <td className="_status">{data.PI}</td>
                    <td>{data.coPI}</td>
                    <td>{data.amount}</td>
                    <td>{data.submission_date ? data.submission_date.substring(0, 10) : ''}</td>
                    <td>
                      <input
                        type='date'
                        id="approvalDate"
                        required
                        onChange={(e) => handleInputChange(data._id, 'approvedDate', e.target.value)}
                      />
                    </td>

                    <td>
                      <input type='date' id="startDate"
                        required
                        onChange={(e) => handleInputChange(data._id, 'startedDate', e.target.value)}
                      />
                    </td>

                    <td>
                      <input type='date' id="endDate" required
                        onChange={(e) => handleInputChange(data._id, 'endedDate', e.target.value)}
                      />
                    </td>

                    <td className='_status'>{data.status_p}</td>
                    <td><select style={styles.dropMenu} data-id="1" defaultValue={data.status_p} onChange={(e) => handleInputChange(data._id, 'projectstatus', e.target.value)}>

                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="submitted">Submitted</option>
                    </select>
                    </td>
                    <td> <button type="submit" onClick={() => handleSubmit(data._id)}>Submit</button> </td>
                    <td><button type="submit" onClick={() => handleDelete(data._id)}>Delete</button></td>

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
  );
}

export default SubmittedProjectsPage;