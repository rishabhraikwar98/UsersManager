import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PaginationComponent from "./PaginationButtons";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Image,
  Modal,
  Badge,
  Container,
  Spinner
} from "react-bootstrap";
import List from "./List";
import { BASE_URL } from "../API";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading,setIsLoading] = useState(false)

  // user Info
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [available, setAvailable] = useState(false);
  const [avatar, setAvatar] = useState("");

  // search and filters
  const [search, setSearch] = useState("");
  const [gendersList, setGendersList] = useState([]);
  const [domainsList, setDomainsList] = useState([]);
  const domainRef = useRef();
  const genderRef = useRef();
  const availabiltyRef = useRef();
  const searchRef = useRef();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // team
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [showTeamsList, setShowTeamsList] = useState(false);
  const [showTeamDetail, setShowTeamDetail] = useState(false);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedTeamMembers,setSelectedTeamMembers] = useState([])
  useEffect(() => {
    getUsers();
  }, [currentPage]);
  useEffect(() => {
    getFilterOptions();
  }, []);
  const getFilterOptions = () => {
    axios
      .get(`${BASE_URL}/users`, {
        params: { limit: "", page: "1" },
      })
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / 20));
        const res1 = res.data.map((item) => {
          return item.domain;
        });
        const res2 = res.data.map((item) => {
          return item.gender;
        });
        setDomainsList(Array.from(new Set(res1)));
        setGendersList(Array.from(new Set(res2)));
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  const getUsers = () => {
    const query = {
      domain: domainRef.current.value,
      gender: genderRef.current.value,
      search: searchRef.current.value,
      page: currentPage,
      limit: 20,
    };
    if (availabiltyRef.current.value === "Yes") {
      query.available = true;
    } else if (availabiltyRef.current.value === "No") {
      query.available = false;
    }
    axios
      .get(`${BASE_URL}/users`, { params: query })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleSearch = () => {
    setCurrentPage(1);
    getUsers();
  };
  const handleApplyFilter = () => {
    getUsers();
    setCurrentPage(1);
  };
  const getTeams = () => {
    axios
      .get(`${BASE_URL}/team`)
      .then((res) => {
        setTeams(res.data);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  const clear = () => {
    setUserId("");
    setFirst_Name("");
    setLast_Name("");
    setEmail("");
    setGender("");
    setAvailable("");
    setDomain("");
    setAvatar("");
  };
  const handleOpenUserInfo = (id) => {
    setShowUserModal(true);
    axios.get(`${BASE_URL}/users/${id}`).then((res) => {
      setUserId(id);
      setFirst_Name(res.data.first_name);
      setLast_Name(res.data.last_name);
      setEmail(res.data.email);
      setGender(res.data.gender);
      setAvailable(res.data.available);
      setDomain(res.data.domain);
      setAvatar(res.data.avatar);
    });
  };
  const handleOpenEditUser = (id) => {
    setShowEditModal(true);
    axios.get(`${BASE_URL}/users/${id}`).then((res) => {
      setUserId(res.data.id);
      setFirst_Name(res.data.first_name);
      setLast_Name(res.data.last_name);
      setEmail(res.data.email);
      setGender(res.data.gender);
      setAvailable(res.data.available);
      setDomain(res.data.domain);
      setAvatar(res.data.avatar);
    });
  };
  const updateUser = () => {
    const payload = {
      id: userId,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      domain: domain,
      available: available,
      avatar: avatar,
    };
    axios
      .put(`${BASE_URL}/users/${userId}`, payload)
      .then(() => {
        getUsers();
        window.alert("Upadated User Info");
        clear();
        setShowEditModal(false);
      })
      .catch((e) => {
        console.error(e.message);
        setShowEditModal(false);
      });
  };
  const openAddNewUser = () => {
    setShowAddModal(true);
  };
  const addNewUser = () => {
    const payload = {
      id: Math.random().toPrecision(6) * 1000000,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      domain: domain,
      available: available,
      avatar: avatar,
    };
    axios
      .post(`${BASE_URL}/users`, payload)
      .then(() => {
        getUsers();
        window.alert("Added User");
        setShowAddModal(false);
      })
      .catch((e) => {
        console.error(e.message);
        setShowAddModal(false);
      });
  };
  const deleteUser = () => {
    axios
      .delete(`${BASE_URL}/users/${userId}`)
      .then(() => {
        setShowEditModal(false);
        getUsers();
        window.alert("Deleted User");
      })
      .catch((e) => {
        console.error(e.message);
        setShowEditModal(false);
      });
  };
  const handleMembers = (user) => {
    let existingArr = [...members];
    const [duplicateDomain] = existingArr.filter((item) => {
      return item.domain === user.domain;
    });
    if (!duplicateDomain) {
      existingArr.push(user);
      setMembers(existingArr);
    } else {
      window.alert("Add Memebers from diffrent Domain");
      return;
    }
  };
  const createTeam = () => {
    if (!teamName) {
      window.alert("Must Add Team Name");
      return;
    } else if (!members.length) {
      window.alert("Must Add Members");
      return;
    }
    const payload = {
      teamName: teamName,
      members: members,
    };
    axios
      .post(`${BASE_URL}/team`, payload)
      .then((res) => {
        window.alert("Team Created");
        setOpenTeamModal(false);
        setMembers([]);
        setTeamName("");
      })
      .catch((e) => {
        setOpenTeamModal(false);
        setTeamName("");
        console.error(e.message);
      });
  };
  const viewTeamDetails = (id) => {
    axios
      .get(`${BASE_URL}/team/${id}`)
      .then((res) => {
        setSelectedTeamName(res.data.teamName);
        setSelectedTeamMembers(res.data.members)
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 25,
          }}
        >
          <Col xs={12} xl={9}>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search Users"
                ref={searchRef}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
                size="lg"
                value={search}
              />
            </Form.Group>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                setOpenTeamModal(true);
              }}
              variant="danger"
            >
              Team Members
              <Badge style={{ marginLeft: 5 }} bg="primary">
                {members.length ? members.length : ""}
              </Badge>
            </Button>
            <Button
              variant="light"
              onClick={() => {
                getTeams();
                setShowTeamsList(true);
              }}
            >
              View Teams
            </Button>
          </Col>
        </Row>
        <Row style={{ margin: 12 }}>
          <Col xs={12} xl={3} md={4}>
            <Form.Group>
              <Form.Select ref={domainRef}>
                <option value="">Select Domain</option>
                {domainsList.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} xl={3} md={4}>
            <Form.Group>
              <Form.Select ref={genderRef}>
                <option value="">Select Gender</option>
                {gendersList.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} xl={3} md={4}>
            <Form.Group>
              <Form.Select ref={availabiltyRef}>
                <option value="">Select Availabilty</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col style={{ justifyContent: "space-around", display: "flex" }}>
            <Button variant="primary" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
            <Button size="md" onClick={openAddNewUser} variant="secondary">
              Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="card-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  overflowX: "hidden",
                }}
              >
                {users && users.length?users.map((user) => (
                  <Card
                    style={{
                      width: "18rem",
                      margin: 15,
                      padding: 5,
                      borderRadius: 15,
                    }}
                    key={user.id}
                  >
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <Image width="100" src={user.avatar}></Image>
                    </div>
                    <Card.Body>
                      <Card.Title>
                        {user.first_name + " " + user.last_name}
                      </Card.Title>
                      <Card.Subtitle style={{ marginBottom: 5 }}>
                        {user.domain}
                      </Card.Subtitle>
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
                )):isLoading ? (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <Spinner
                      variant="primary"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                ) : (
                  <div>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
                    </div>
                    <h2 style={{ textAlign: "center" }}>No Data</h2>
                  </div>)}
              </div>
            </div>
          </Col>
        </Row>
        {/* Show user info */}
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
        {/* user edit */}
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

        {/* Team Modal */}
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
        {/* View Teams List */}
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
            { teams && teams.length?teams.map((team) => {
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
            }):<div>
            <div style={{justifyContent:"center",display:"flex"}}>
            <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
            </div>
            <h2 style={{textAlign:"center"}}>No Data</h2>
            </div>}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Team Details */}
        <Modal
          show={showTeamDetail}
          onHide={() => {
            setShowTeamDetail(false);
          }}
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:30}}>{selectedTeamName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTeamMembers&& selectedTeamMembers.length? selectedTeamMembers.map((item)=>{
             return <List key={item._id} member={item}/>
            }):<div>
            <div style={{justifyContent:"center",display:"flex"}}>
            <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
            </div>
            <h2 style={{textAlign:"center"}}>No Data</h2>
            </div>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setShowTeamDetail(false);
                setSelectedTeamName("")
                setSelectedTeamMembers([])
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* pagination */}

        <PaginationComponent
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalPages={totalPages}
        ></PaginationComponent>
      </Container>
    </>
  );
}

export default UserList;
