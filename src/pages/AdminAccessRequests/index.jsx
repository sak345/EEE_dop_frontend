// AdminAccessRequests.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Select, message } from 'antd';
import Navbar from '../../components/navbar';

const { Option } = Select;

function AdminAccessRequests() {
    const [accessRequests, setAccessRequests] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});

    useEffect(() => {
        const fetchAccessRequests = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("Token"));
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/access-requests`, requestOptions);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${response.status} - ${errorText}`);
                }
                const data = await response.json();
                setAccessRequests(data.accessRequests);
            } catch (error) {
                console.error('Error fetching access requests:', error);
                message.error('Error fetching access requests');
            }
        };

        fetchAccessRequests();
    }, []);

    const handleUpdateRequest = async (id, status) => {
        const role = selectedRoles[id] || 'member'; // Default role if not selected

        const myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("Token"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({ id, status, role }),
            redirect: "follow",
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/access-requests`, requestOptions);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            message.success(`Access request ${status}`);
            setAccessRequests(prevRequests => prevRequests.filter(request => request._id !== id));
        } catch (error) {
            console.error('Error updating access request:', error);
            message.error('Error updating access request');
        }
    };

    const handleRoleChange = (id, value) => {
        setSelectedRoles(prevRoles => ({ ...prevRoles, [id]: value }));
    };

    const columns = [
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Date', dataIndex: 'date', key: 'date', render: date => new Date(date).toLocaleString() },
        {
            title: 'Set Role',
            key: 'role',
            render: (text, record) => (
                <Select
                    defaultValue="member"
                    style={{ width: 120 }}
                    onChange={(value) => handleRoleChange(record._id, value)}
                >
                    <Option value="admin">Admin</Option>
                    <Option value="member">Member</Option>
                </Select>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleUpdateRequest(record._id, 'approved')}>Approve</Button>
                    <Button type="danger" onClick={() => handleUpdateRequest(record._id, 'rejected')}>Reject</Button>
                    {record.status === 'rejected' && <span style={{ color: 'red' }}>(Rejected)</span>}
                </>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Table dataSource={accessRequests} columns={columns} rowKey="_id" />
        </>
    );
}

export default AdminAccessRequests;