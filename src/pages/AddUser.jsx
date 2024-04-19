import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import Navbar from '../components/navbar';
import { Form, Space } from 'antd';
import styles from '../styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

function AddUser() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("Token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ name, email, role }),
            redirect: "follow",
        };
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users', requestOptions);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            if (data.success) {
                toast.success('User added successfully');
                setName('');
                setEmail('');
                setRole('');
            } else {
                toast.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h1 style={styles.pageTitle}>Add User</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Form>
                    <Space direction="vertical" style={{ width: '100%', padding: 20 }}>
                        <Form.Item label="Name">
                            <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select placeholder="Role" value={role} onChange={value => setRole(value)}>
                                <Option value="admin">Admin</Option>
                                <Option value="member">Member</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleSubmit}>Add User</Button>
                        </Form.Item>
                    </Space>
                </Form>
            </div>
        </div>
    );
}

export default AddUser;