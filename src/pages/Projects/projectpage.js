import React, { useEffect, useState } from 'react'
import ProjectHeader from '../../components/projectheader'
import Navbar from '../../components/navbar'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProjectPage() {
  const [data, setData] = useState([])
  console.log("data: ", data)

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
        console.log(response)
        if (response.status == 404) {
          toast.dismiss();
          toast.error('No papers found');
        } else if (!response.ok) {
          console.error('Fetch error:', response.status, response.statusText);
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.papers);
        toast.dismiss();
      } catch (error) {
        console.error('Error:', error);
        toast.dismiss();
        toast.error(`Error fetching papers: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Send PATCH request to server with _id and selected option
    let data = JSON.stringify({
      _id: id,
    })

    try {
      //? api patch req
      let config = {
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + 'paper/delete',
        headers: {
          Authorization: localStorage.getItem('Token'),
          'Content-Type': 'application/json',
        },
        data: data,
      }
      axios
        .request(config)
        .then((response) => {
          if (response.status == 200) {
            console.log('deleted successfully')
          }
          window.location.reload() // Reload the page after successful request
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Navbar />
      <ProjectHeader />

      <div className='site-layout' style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <table>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Funding Agency</th>
                <th>Organn</th>
                <th>Title</th>
                <th>PI</th>
                <th>Co-PI</th>
                <th>Amount</th>
                <th>Submission Date</th>
                <th>Approval Date</th>
                <th>Approval Status</th>

                <th>Delete </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.funding_agency}</td>
                    <td>{data.agency_type}</td>
                    <td className='_status'>{data.title}</td>
                    <td className='_status'>{data.PI}</td>
                    <td>{data.coPI}</td>
                    <td>{data.amount}</td>
                    <td>{data.submission_date ? data.submission_date.substring(0, 10) : ''}</td>
                    <td>{data.approved_date ? data.approved_date.substring(0, 10) : ''}</td>

                    <td className='_status'>{data.status_p}</td>
                    <td>
                      <button
                        type='submit'
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
