import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Container, Modal } from 'react-bootstrap';
import axios from 'axios'; // Import axios for API requests
import '../App.css';
import OrderList from './OrderDetails';
import NavBar from './NavBar';

export class CustomerDetails extends Component {
    constructor() {
        super();
        this.state = {
            customers: [],
            selectedCustomerId: null,
            showModal: false,
            selectedCustomerDetails: null
        }
        this.selectCustomer = this.selectCustomer.bind(this);
    }

    componentDidMount() {
        const fetchedCustomers = [
            { id: 1, name: 'Edwin' },
            { id: 2, name: 'Alexa' },
            { id: 3, name: 'Mary' },
            { id: 4, name: 'Savvy' }
        ]
        this.setState({ customers: fetchedCustomers });
    }

    selectCustomer(id) {
        this.setState({ selectedCustomerId: id });
        this.fetchCustomerDetails(id);
    }

    fetchCustomerDetails(id) {
        axios.get(`http://localhost:5000/customers/${id}`)
            .then(response => {
                this.setState({ selectedCustomerDetails: response.data });
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
            });
    }

    handleDelete = () => {
        console.log('Delete customer with ID:', this.state.selectedCustomerId);
    }

    render() {
        const { customers, selectedCustomerDetails } = this.state;
        return (
            <div>

                <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center">
                            <div onClick={() => this.selectCustomer(customer.id)}>{customer.name}</div>
                            <div>
                                <Button as={Link} to={`../edit-customer/${customer.id}`} variant='outline-primary'>Edit</Button>
                                <Button variant='outline-danger' onClick={() => this.setState({ showModal: true })}>Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {selectedCustomerDetails && (
                    <Container fluid className='d-flex flex-column align-items-center'>
                        <h2>Selected Customer: {selectedCustomerDetails.id}</h2>
                        <div>Name: {selectedCustomerDetails.name}</div>
                        <div>Email: {selectedCustomerDetails.email}</div>
                        <div>Phone: {selectedCustomerDetails.phone}</div>
                        <OrderList customerId={selectedCustomerDetails.id} />
                    </Container>
                )}
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Cancel</Button>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CustomerDetails;
    