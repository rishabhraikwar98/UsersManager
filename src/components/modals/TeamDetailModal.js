import React from 'react'
import { Modal,Button,Image } from 'react-bootstrap';
import List from '../List';
function TeamDetailModal({
    showTeamDetail,
    setShowTeamDetail,
    selectedTeamName,
    setSelectedTeamName,
    selectedTeamMembers,
    setSelectedTeamMembers
}) {
  return (
    <Modal
    show={showTeamDetail}
    onHide={() => {
      setShowTeamDetail(false);
    }}
    fullscreen
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ fontSize: 30 }}>
        {selectedTeamName}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedTeamMembers && selectedTeamMembers.length ? (
        selectedTeamMembers.map((item) => {
          return <List key={item._id} member={item} />;
        })
      ) : (
        <div>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
          </div>
          <h2 style={{ textAlign: "center" }}>No Data</h2>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        size="md"
        onClick={() => {
          setShowTeamDetail(false);
          setSelectedTeamName("");
          setSelectedTeamMembers([]);
        }}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default TeamDetailModal