import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
function AddUserModal({
  clear,
  first_name,
  last_name,
  setFirst_Name,
  setLast_Name,
  email,
  setEmail,
  gender,
  setGender,
  domain,
  setDomain,
  available,
  setAvailable,
  avatar,
  setAvatar,
  showAddModal,
  setShowAddModal,
  addNewUser
}) {
  return (
    <Modal
      show={showAddModal}
      onHide={() => {
        clear();
        setShowAddModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={first_name}
            placeholder="Enter First Name"
            onChange={(e) => {
              setFirst_Name(e.target.value);
            }}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={last_name}
            placeholder="Enter Last Name"
            onChange={(e) => {
              setLast_Name(e.target.value);
            }}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            value={gender}
            placeholder="Enter Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Domain</Form.Label>
          <Form.Control
            value={domain}
            placeholder="Enter Domain"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Availabilty</Form.Label>
          <Form.Check
            checked={available}
            onChange={(e) => {
              setAvailable(e.target.checked);
            }}
            type="switch"
          ></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Label>Avatar URL</Form.Label>
          <Form.Control
            value={avatar}
            placeholder="Enter URL"
            onChange={(e) => {
              setAvatar(e.target.value);
            }}
            type="text"
          ></Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addNewUser} variant="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
