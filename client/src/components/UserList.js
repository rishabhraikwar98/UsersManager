import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import PaginationComponent from "./PaginationButtons";
import {
  Card,
  Form,
  Row,
  Col,
  Pagination,
  Button,
  Image,
  Modal,
} from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1)
  // User Info
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
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    getUsers();
    getFilterOptions();
  }, [currentPage]);
  const getFilterOptions = () => {
    axios
      .get("http://localhost:5000/api/users", {
        params: { limit: "", page: "1" },
      })
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length/20))
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
      search:search,
      page:currentPage,
      limit:20
    };
    if (availabiltyRef.current.value === "Yes") {
      query.available = true;
    } else if (availabiltyRef.current.value === "No") {
      query.available = false;
    }
    axios
      .get("http://localhost:5000/api/users", { params: query })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleSearch = () => {
    setCurrentPage(1)
    getUsers()
  };
  const handleApplyFilter = () => {
    setCurrentPage(1)
    getUsers()
  };
  const handleOpenUserInfo = (id) => {
    setShowUserModal(true);
    axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
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
    axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
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
      .put(`http://localhost:5000/api/users/${userId}`,payload)
      .then(() => {
        getUsers()
        window.alert("Upadated User Info")
        setShowEditModal(false);
      })
      .catch((e) => {
        console.error(e.message);
        setShowEditModal(false);
      });
  };
  const openAddNewUser=()=>{
    setShowAddModal(true)
  }
  const addNewUser = () => {
    const payload = {
      id: Math.random().toPrecision(6)*1000000,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      domain: domain,
      available: available,
      avatar: avatar,
    };
    axios
      .post(`http://localhost:5000/api/users`,payload)
      .then(() => {
        getUsers()
        window.alert("Added User")
        setShowAddModal(false);
      })
      .catch((e) => {
        console.error(e.message);
        setShowAddModal(false);
      });
  };
  const deleteUser = () => {
    axios
      .delete(`http://localhost:5000/api/users/${userId}`)
      .then(() => {
        setShowEditModal(false);
        getUsers()
        window.alert("Deleted User")
      })
      .catch((e) => {
        console.error(e.message);
        setShowEditModal(false);
      });
  };

  return (
    <>
      <div>
        <Form.Group
          style={{ justifyContent: "center", display: "flex" }}
          controlId="search"
        >
          <Form.Control
            type="text"
            placeholder="Search Users"
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            style={{ width: "50vw", margin: 20 }}
            size="lg"
            value={search}
          />
        </Form.Group>
        <Row style={{ margin: 20 }}>
          <Col>
            <Form.Group>
              <Form.Select ref={domainRef}>
                <option value="">Select Domain</option>
                {domainsList.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select ref={genderRef}>
                <option value="">Select Gender</option>
                {gendersList.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select ref={availabiltyRef}>
                <option value="">Select Availabilty</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col style={{ justifyContent: "space-around", display: "flex" }}>
            <Button variant="success" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
            <Button onClick={openAddNewUser} variant="primary">
              Add New User
            </Button>
          </Col>
        </Row>
      </div>
      <div className="card-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            margin: 20,
            overflowX: "hidden",
          }}
        >
          {users.map((user) => (
            <Card
              style={{
                width: "20rem",
                margin: 18,
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
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>{user.gender}</Card.Text>

                <Card.Text style={{ fontWeight: 600 }}>
                  {user.available ? "Available" : "Not Available"}
                </Card.Text>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <Button
                    onClick={() => {
                      handleOpenUserInfo(user.id);
                    }}
                    variant="primary"
                    size="sm"
                  >
                    View
                  </Button>
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
          ))}
        </div>
      </div>
      {/* Show user info */}
      <Modal
        show={showUserModal}
        onHide={() => {
          setUserId("");
          setFirst_Name("");
          setLast_Name("");
          setEmail("");
          setGender("");
          setAvailable("");
          setDomain("");
          setAvatar("");
          setShowUserModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>{first_name + " " + last_name}</Card.Title>
                  <Card.Subtitle style={{ marginBottom: 5 }}>
                    Domain: {domain}
                  </Card.Subtitle>
                  <Card.Text style={{ fontWeight: 600 }}>
                    Email: {email}
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 600 }}>
                    Gender: {gender}
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 600 }}>
                    {available ? "Available" : "Not Available"}
                  </Card.Text>
                </Col>
                <Col>
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <Image width="150" height="150" src={avatar}></Image>
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
          setUserId("");
          setFirst_Name("");
          setLast_Name("");
          setEmail("");
          setGender("");
          setAvailable("");
          setDomain("");
          setAvatar("");
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
          <Button onClick={deleteUser} variant="danger">Delete User</Button>
          <Button onClick={updateUser} variant="primary">
            Update Details
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showAddModal}
        onHide={() => {
          setUserId("");
          setFirst_Name("");
          setLast_Name("");
          setEmail("");
          setGender("");
          setAvailable("");
          setDomain("");
          setAvatar("");
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
              type="text"
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
              type="text"
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNewUser} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
      {/* pagination */}

      <PaginationComponent
      currentPage={currentPage}
      onPageChange={(page)=>{
        setCurrentPage(page)
      }}
      totalPages={totalPages}
      ></PaginationComponent>

    </>
  );
}

export default UserList;
