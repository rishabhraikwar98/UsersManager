import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
function UserEditModal({
  showEditModal,
  setShowEditModal,
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
  deleteUser,
  updateUser,
}) {
  return (
    <Modal
      show={showEditModal}
      onHide={() => {
        clear();
        setShowEditModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={first_name}
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
            onChange={(e) => {
              setGender(e.target.value);
            }}
            type="email"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Domain</Form.Label>
          <Form.Control
            value={domain}
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
            onChange={(e) => {
              setAvatar(e.target.value);
            }}
            type="email"
          ></Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteUser} variant="danger">
          Delete User
        </Button>
        <Button onClick={updateUser} variant="primary">
          Update Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UserEditModal;
