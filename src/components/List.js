import React from 'react'
import {Card,Row ,Col,Image} from "react-bootstrap"
function List({member}) {
  return (
    <Card key={member.id} style={{ margin: 20, padding: 5 }}>
    <Card.Body>
      <Row>
        <Col>
          <Card.Title style={{fontSize:24, marginBottom:20}}>
            {member.first_name + " " + member.last_name}
          </Card.Title>
          <Card.Subtitle style={{ marginBottom: 15 }}>
            Domain: {member.domain}
          </Card.Subtitle>
          <Card.Text style={{ fontWeight: 600 }}>
            Email: {member.email}
          </Card.Text>
          <Card.Text style={{ fontWeight: 600 }}>
            Gender: {member.gender}
          </Card.Text>
          <Card.Text style={{ color:member.available?"green":"red",fontWeight:500}}>
            {member.available
              ? "Available"
              : "Not Available"}
          </Card.Text>
        </Col>
        <Col>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Image
              width="100"
              height="100"
              src={member.avatar}
            ></Image>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
  )
}

export default List