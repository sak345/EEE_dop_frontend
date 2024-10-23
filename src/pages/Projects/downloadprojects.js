import React, { useEffect, useState } from 'react';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar';
import styles from '../../styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DownloadProjectsPage = () => {
  const [csvData, setCsvData] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("ongoing");

  const handleFetch = async () => {
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : null;

    let data = JSON.stringify({
      "start_date": formattedStartDate,
      "end_date": formattedEndDate,
      "status": status
    });

    let url = `${process.env.REACT_APP_BACKEND_URL}admin/paper/download`;
    const token = localStorage.getItem('Token');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseText = await response.text();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
        toast.dismiss();
        toast.info(parsedResponse.message);
        setCsvData("");
      } catch (error) {
        toast.dismiss();
        toast.success("Fetch complete");
        setCsvData(responseText);
      };

    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while fetching the data");
      setCsvData("");
    }
  };
  return (
    <div>
      <Navbar />
      <ProjectHeader />

      <div className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Fetch</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <input type='date' id="startDate" required
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </td>

              <td>
                <input type='date' id="endDate" required
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </td>

              <td>
                <select style={styles.dropMenu} data-id="1" onChange={(e) => setStatus(e.target.value)}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                  <option value="submitted">Submitted</option>
                  <option value="all">All Projects</option>
                </select>
              </td>

              <td><button disabled={startDate === null || endDate === null} onClick={(e) => handleFetch(e)}>Fetch</button></td>
              < td > {csvData && (
                <a
                  href={`data:text/csv;charset=utf-8,${(csvData)}`}
                  download={`${status}_projects.csv`}
                  onClick={() => setCsvData("")}
                >
                  Download
                </a>
              )}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default DownloadProjectsPage;
