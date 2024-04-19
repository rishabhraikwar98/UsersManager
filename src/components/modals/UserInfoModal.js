import React from "react";
import { Modal, Row, Col, Card, Image } from "react-bootstrap";
function UserInfoModal({
  showUserModal,
  gender,
  first_name,
  last_name,
  domain,
  email,
  avatar,
  available,
  setShowUserModal,
  clear,
}) {
  return (
    <Modal
      size="lg"
      show={showUserModal}
      onHide={() => {
        clear();
        setShowUserModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ height: "42vh" }}>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title style={{ fontSize: 40, marginBottom: 35 }}>
                  {first_name + " " + last_name}
                </Card.Title>
                <Card.Subtitle style={{ marginBottom: 20, fontSize: 20 }}>
                  Domain: {domain}
                </Card.Subtitle>
                <Card.Text
                  style={{
                    fontWeight: 500,
                    marginBottom: 20,
                    fontSize: 20,
                  }}
                >
                  Email: {email}
                </Card.Text>
                <Card.Text
                  style={{
                    fontWeight: 500,
                    marginBottom: 20,
                    fontSize: 20,
                  }}
                >
                  Gender: {gender}
                </Card.Text>
                <Card.Text style={{ fontWeight: 500, fontSize: 20 }}>
                  Availabilty Status:{" "}
                  {available ? "Available" : "Not Available"}
                </Card.Text>
              </Col>
              <Col>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Image width="180" height="180" src={avatar}></Image>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default UserInfoModal;
