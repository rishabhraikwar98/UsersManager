import React from "react";
import { Modal, Card, Button,Image} from "react-bootstrap";
function TeamsListModal({
  showTeamsList,
  setShowTeamsList,
  teams,
  viewTeamDetails,
  setShowTeamDetail,
}) {
  return (
    <Modal
      size="lg"
      show={showTeamsList}
      onHide={() => {
        setShowTeamsList(false);
      }}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Teams</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {teams && teams.length ? (
          teams.map((team) => {
            return (
              <Card
                key={team._id}
                style={{ marginBottom: 20, marginInline: 10 }}
              >
                <Card.Header>
                  <Card.Title style={{ fontSize: 24 }}>
                    {team.teamName}
                  </Card.Title>
                </Card.Header>
                <Card.Body
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Card.Subtitle style={{ fontSize: 16 }}>
                    Memebers: {team.members.length}
                  </Card.Subtitle>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      viewTeamDetails(team._id);
                      setShowTeamDetail(true);
                    }}
                  >
                    View Team
                  </Button>
                </Card.Body>
              </Card>
            );
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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default TeamsListModal;
