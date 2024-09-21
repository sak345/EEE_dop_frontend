import React, { useState } from "react";
import "./form.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  const [formData, setFormData] = useState({
    funding_agency: '',
    agency_type: '',
    title: '',
    PI: '',
    coPI: '',
    amount: '',
    submission_date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("Token"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ...formData }),
      redirect: "follow",
    };

    const fetchPromise = fetch(`${process.env.REACT_APP_BACKEND_URL}paper`, requestOptions);

    toast.promise(
      fetchPromise,
      {
        pending: 'Submitting paper...',
        success: 'Paper submitted successfully',
        error: 'Error submitting paper'
      }
    );


    try {
      const response = await fetchPromise;
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Get the new paper from the response
      const paper = await response.json();
      toast.dismiss();

      // Clear the form
      setFormData({
        funding_agency: '',
        agency_type: '',
        title: '',
        PI: '',
        coPI: '',
        amount: '',
        submission_date: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fundingAgency">Funding Agency:</label>
        <input
          type="text"
          id="fundingAgency"
          required
          value={formData.funding_agency}
          onChange={(e) => setFormData({ ...formData, funding_agency: e.target.value })}
        />

        <label htmlFor="org">Select Organization:</label>
        <select
          id="org"
          required
          value={formData.agency_type}
          onChange={(e) => setFormData({ ...formData, agency_type: e.target.value })}
        >
          <option value="">--Please choose an organization--</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="International">International</option>
        </select>

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label htmlFor="pi">PI:</label>
        <input
          type="text"
          id="pi"
          required
          value={formData.PI}
          onChange={(e) => setFormData({ ...formData, PI: e.target.value })}
        />

        <label htmlFor="coPi">Co-PI:</label>
        <input
          type="text"
          id="coPi"
          value={formData.coPI}
          onChange={(e) => setFormData({ ...formData, coPI: e.target.value })}
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />

        <label htmlFor="submissionDate">Submission Date:</label>
        <input
          type='date'
          id="submissionDate"
          required
          value={formData.submission_date}
          onChange={(e) => setFormData({ ...formData, submission_date: e.target.value })}
        />

        <button type="submit-1">Submit</button>
      </form>
    </div>
  );
}

export default Form;
