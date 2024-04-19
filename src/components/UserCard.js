import React from "react";
import { Card, Button, Image } from "react-bootstrap";
function UserCard({
  user,
  handleOpenEditUser,
  handleMembers,
  handleOpenUserInfo,
  members,
}) {
  return (
    <Card
      style={{
        width: "18rem",
        margin: 15,
        padding: 5,
        borderRadius: 15,
      }}
      key={user.id}
    >
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Image width="100" src={user.avatar}></Image>
      </div>
      <Card.Body>
        <Card.Title>{user.first_name + " " + user.last_name}</Card.Title>
        <Card.Subtitle style={{ marginBottom: 5 }}>{user.domain}</Card.Subtitle>
        <Card.Text>{user.email}</Card.Text>
        <Card.Text>{user.gender}</Card.Text>

        <Card.Text
          style={{
            color: user.available ? "green" : "red",
            fontWeight: 500,
          }}
        >
          {user.available ? "Available" : "Not Available"}
        </Card.Text>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              handleOpenUserInfo(user.id);
            }}
            variant="info"
            size="sm"
          >
            View
          </Button>
          {!members.filter((item) => {
            return item.id === user.id;
          })[0] ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                handleMembers(user);
              }}
            >
              Add to Team
            </Button>
          ) : (
            <Button size="sm" disabled variant="light">
              Added
            </Button>
          )}
          <Button
            onClick={() => {
              handleOpenEditUser(user.id);
            }}
            variant="dark"
            size="sm"
          >
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
