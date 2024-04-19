import React from "react";
import { Row, Col, Modal, Form, Button, Image } from "react-bootstrap";
import List from "../List";
function TeamMembersModal({
  members,
  setMembers,
  openTeamModal,
  setOpenTeamModal,
  teamName,
  setTeamName,
  createTeam,
}) {
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openTeamModal}
      onHide={() => {
        setOpenTeamModal(false);
        setTeamName("");
      }}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Team Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Team Name:</Form.Label>
              <Form.Control
                value={teamName}
                autoFocus
                placeholder="Enter Team Name"
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {members.length ? (
          <div>
            <Row>
              <Col>
                {members.map((member) => {
                  return <List key={member._id} member={member} />;
                })}
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
            </div>
            <h5 style={{ textAlign: "center" }}>Add Memebers</h5>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setMembers([]);
            setOpenTeamModal(false);
            setTeamName("");
          }}
        >
          Cancel
        </Button>
        <Button onClick={createTeam} variant="primary">
          Create Team
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TeamMembersModal;
