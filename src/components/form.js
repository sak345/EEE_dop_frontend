
 import { DatePicker } from 'antd';
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
import React, { useState } from "react";
import "./form.css";

function Form() {
  
  const [fundingAgency, setFundingAgency] = useState("");
  const [org, setOrg] = useState("");
  const [title, setTitle] = useState("");
  const [pi, setPi] = useState("");
  const [coPi, setCoPi] = useState("");
  const [amount, setAmount] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [duration, setDuration] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [formData, setFormData] = useState([]);

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
      duration,
      projectStatus
    };
    setFormData([...formData, newFormData]);
    setFundingAgency("");
    setOrg("");
    setTitle("");
    setPi("");
    setCoPi("");
    setAmount("");
    setSubmissionDate("");
    setDuration("");
    setProjectStatus("");
  };

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
          <option value="government">Government</option>
          <option value="private">Private</option>
          <option value="international">International</option>
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
          type="text"
          id="submissionDate"
          required
          value={submissionDate}
          onChange={(e) => setSubmissionDate(e.target.value)}
        />
            {/* <DatePicker/>  */}

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label htmlFor="projectstatus">Select Status:</label>
        <select
          id="projectstatus"
          required
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
        >
          <option value="">--Please select the current status of the project--</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="submitted">Submitted</option>
        </select>

        <button type="submit">Submit</button>
      </form>

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
      <th>Duration</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {formData.map((data, index) => (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{data.fundingAgency}</td>
        <td>{data.org}</td>
        <td>{data.title}</td>
        <td>{data.pi}</td>
        <td>{data.coPi}</td>
        <td>{data.amount}</td>
        <td>{data.submissionDate}</td>
        <td>{data.duration}</td>
        <td>{data.projectStatus}</td>
      </tr>
    ))}
  </tbody>
</table>

      
    </div>
  );
}

export default Form;
