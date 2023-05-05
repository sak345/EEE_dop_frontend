//  import { DatePicker } from 'antd';
// import { useState } from 'react';
// const { Option } = Select;
// const Inputform = () => {
//   const { token } = theme.useToken();
//   const [form] = Form.useForm();
//   const [expand, setExpand] = useState(false);
//   const formStyle = {
//     maxWidth: 'none',
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     padding: 24,
//   };

//   const getFields = () => {
//     const count = expand ? 10 : 6;
//     const children = [];

//       children.push(

//         <Col span={9} >
//         <Form.Item
//           name={`Funding Agency`}
//           label={`Funding Agency`}
//           rules={[
//             {
//               required: true,
//               message: 'This Field is required!',
//             },
//           ]}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`Govt/Pvt/Int`}
//           label={`Govt/Pvt/Int`}
//           rules={[
//             {
//               required: true,
//               message: 'This Field is required!',
//             },
//           ]}
//         >
//             <Select placeholder="Select from dropmenu">
//               <Option value="1">Government </Option>
//               <Option value="2">Private</Option>
//               <Option value="2">International</Option>
//             </Select>
//         </Form.Item>

//         <Form.Item
//           name={`Title`}
//           label={`Title`}
//           rules={[
//             {
//               required: true,
//               message: 'This Field is required!',
//             },
//           ]}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`PI`}
//           label={`PI`}
//           rules={[
//             {
//               required: true,
//               message: 'This Field is required!',
//             },
//           ]}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`Co-PI`}
//           label={`Co-PI`}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`Amount`}
//           label={`Amount`}
//           rules={[
//               {
//                 required: true,
//                 message: 'This Field is required!',
//               },
//             ]}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`Submission Date`}
//           label={`Submission Date`}
//           rules={[
//               {
//                 required: true,
//                 message: 'This Field is required!',
//               },
//             ]}
//         >
//             <DatePicker/>
//         </Form.Item>

//         <Form.Item
//           name={`Duration`}
//           label={`Duration`}
//           rules={[
//               {
//                 required: true,
//                 message: 'This Field is required!',
//               },
//             ]}
//         >
//             <Input placeholder="placeholder" />
//         </Form.Item>

//         <Form.Item
//           name={`Status`}
//           label={`Status`}
//           rules={[
//               {
//                 required: true,
//                 message: 'This Field is required!',
//               },
//             ]}
//         >
//             <Select placeholder="Select from dropmenu">
//               <Option value="1">Accepted </Option>
//               <Option value="2">Rejected</Option>
//               <Option value="2">Submitted</Option>
//             </Select>
//         </Form.Item>
//       </Col>,
//       );
//     return children;
//   };

//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };
//   return (
//     <Form form={form} name="List" style={formStyle} onFinish={onFinish}>
//       <Row gutter={24}>{getFields()}</Row>
//       <Row>
//         <Col
//           span={24}
//           style={{
//             textAlign: 'right',
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//           <Button
//             style={{
//               margin: '0 8px',
//             }}
//             onClick={() => {
//               form.resetFields();
//             }}
//           >
//             Clear
//           </Button>

//         </Col>
//       </Row>
//     </Form>
//   );
// };
// // const App = () => {
// //   const { token } = theme.useToken();
// //   const listStyle = {
// //     lineHeight: '200px',
// //     textAlign: 'center',
// //     background: token.colorFillAlter,
// //     borderRadius: token.borderRadiusLG,
// //     marginTop: 16,
// //   };
// //   return (
// //     <div>
// //       <AdvancedSearchForm />
// //       <div style={listStyle}>Search Result List</div>
// //     </div>
// //   );
// // };
// export default Inputform;
// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";




function Form() {
  const [fundingAgency, setFundingAgency] = useState("");
  const [org, setOrg] = useState("");
  const [title, setTitle] = useState("");
  const [pi, setPi] = useState("");
  const [coPi, setCoPi] = useState("");
  const [amount, setAmount] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [formData, setFormData] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  //? FOR PROJECTS RECIEVED FROM get request
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = {
      fundingAgency,
      org,
      title,
      pi,
      coPi,
      amount,
      submissionDate,
    };

    setFormData([...formData, newFormData]);
    setFundingAgency("");
    setOrg("");
    setTitle("");
    setPi("");
    setCoPi("");
    setAmount("");
    setSubmissionDate("");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("Token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: newFormData.title,
      agency_type: newFormData.org,
      funding_agency: newFormData.fundingAgency,
      PI: newFormData.pi,
      submission_date: newFormData.submissionDate,
      coPI: newFormData.coPi,
      amount: newFormData.amount,
      status_p: "submitted"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_BACKEND_URL + "paper/create", requestOptions)
      .then((response) => {
        console.log(response.body);
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setFormSubmitted(!formSubmitted);
  };

  //? get all projects
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
          setData(response.data.papers);
        })
        .catch((error) => {
          console.log(error);
        });
    
  }, [formSubmitted]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fundingAgency">Funding Agency:</label>
        <input
          type="text"
          id="fundingAgency"
          required
          value={fundingAgency}
          onChange={(e) => setFundingAgency(e.target.value)}
        />

        <label htmlFor="org">Select Organization:</label>
        <select
          id="org"
          required
          value={org}
          onChange={(e) => setOrg(e.target.value)}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="pi">PI:</label>
        <input
          type="text"
          id="pi"
          required
          value={pi}
          onChange={(e) => setPi(e.target.value)}
        />

        <label htmlFor="coPi">Co-PI:</label>
        <input
          type="text"
          id="coPi"
          value={coPi}
          onChange={(e) => setCoPi(e.target.value)}
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="submissionDate">Submission Date:</label>
        <input
          type='date'
          id="submissionDate"
          required
          value={submissionDate}
          onChange={(e) => setSubmissionDate(e.target.value)}
        />
        {/* <DatePicker/>  */}

        {/* <label htmlFor="projectstatus">Select Status:</label>
        <select
          id="projectstatus"
          required
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
        >
          <option value="">
            --Please select the current status of the project--
          </option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="submitted">Submitted</option>
        </select> */}

        <button type="submit-1">Submit</button>
      </form>

      
    </div>
  );
}

export default Form;
