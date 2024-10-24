import React, { useState, useEffect } from "react";
 import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const UserTable = ({ rows = [] }) => {
  const [customers, setCustomers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id:"",
    name: "",
    contact: "",
    address: "",
    email: "",
    nic: ""
  });
  const api = process.env.REACT_URL;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`${api}/customers`)
      .then((response) => {
        setCustomers(response.data || []);
        console.log(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`${api}/customers/${id}`)
        .then((response) => {
          alert(response.data.message);
          setCustomers(customers.filter((customer) => customer._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
          alert("Failed to delete customer");
        });
    }
  };

  const handleUpdateClick = (customer) => {
    setSelectedCustomer(customer);
    setUpdatedData({
      id: customer.id,
      name: customer.name,
      contact: customer.contact,
      address: customer.address,
      email: customer.email,
      nic: customer.nic
    });
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdateSubmit = () => {
    const { id, name, contact, address, email, nic } = updatedData;

    axios
    .put(`${api}/updateProfile`, {
      id,
      name,
      contact,
      address,
      email,
      nic,
    })
    .then((response) => {
      alert(response.data.message);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === selectedCustomer._id
            ? { ...customer, name, contact, address, email, nic }
            : customer
        )
      );
      setShowUpdateModal(false);
    })
    .catch((error) => {
      console.error("Error updating customer:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to update customer");
    });
  };

  return (
    <>
      <Table striped bordered hover className="table-light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.contact}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.nic}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleUpdateClick(customer)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Update Customer Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={updatedData.contact}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={updatedData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formNic">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="nic"
                value={updatedData.nic}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
