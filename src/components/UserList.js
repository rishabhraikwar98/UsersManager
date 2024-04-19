import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PaginationComponent from "./PaginationButtons";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  Form,
  Row,
  Col,
  Button,
  Image,
  Badge,
  Container,
} from "react-bootstrap";
import { BASE_URL } from "../API";
import UserCard from "./UserCard";
import Loading from "react-loading";
import UserInfoModal from "./modals/UserInfoModal";
import UserEditModal from "./modals/UserEditModal";
import TeamMembersModal from "./modals/TeamMembersModal";
import AddUserModal from "./modals/AddUserModal";
import TeamsListModal from "./modals/TeamsListModal";
import TeamDetailModal from "./modals/TeamDetailModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
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
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/users`, { params: query })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };
  const handleSearch = () => {
    setIsLoading(true);
    setCurrentPage(1);
    getUsers();
  };
  const handleApplyFilter = () => {
    setIsLoading(true);
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
        toast.success("User Details Updated!")
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
        toast.success("Added New User!")
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
        toast.success("Deleted User!");
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
      toast.error("Add Memebers from diffrent Domain!");
      return;
    }
  };
  const createTeam = () => {
    if (!teamName) {
      toast.error("Must Add Team Name!");
      return;
    } else if (!members.length) {
      toast.error("Must Add Members!");
      return;
    }
    const payload = {
      teamName: teamName,
      members: members,
    };
    axios
      .post(`${BASE_URL}/team`, payload)
      .then((res) => {
        toast.success("New Team Created!");
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
        setSelectedTeamMembers(res.data.members);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  return (
    <>
    <Toaster position="bottom-center"/>
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
                {users && users.length && !isLoading
                  ? users.map((user) => (
                      <UserCard
                        handleOpenEditUser={handleOpenEditUser}
                        handleMembers={handleMembers}
                        user={user}
                        handleOpenUserInfo={handleOpenUserInfo}
                        members={members}
                      />
                    ))
                  : ""}
                {isLoading && (
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      height: "80vh",
                    }}
                  >
                    <div className="my-auto d-flex justify-center">
                      <Loading type="balls" width={70} color="blue" />
                    </div>
                  </div>
                )}
                {!isLoading && !users.length && (
                  <div>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <Image src="https://static.thenounproject.com/png/4143644-200.png"></Image>
                    </div>
                    <h2 style={{ textAlign: "center" }}>No Data</h2>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        {/* Show user info */}
        <UserInfoModal
          domain={domain}
          email={email}
          available={available}
          first_name={first_name}
          last_name={last_name}
          clear={clear}
          gender={gender}
          avatar={avatar}
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
        />
        {/* user edit */}
        <UserEditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          domain={domain}
          setDomain={setDomain}
          email={email}
          setEmail={setEmail}
          available={available}
          setAvailable={setAvailable}
          first_name={first_name}
          setFirst_Name={setFirst_Name}
          last_name={last_name}
          setLast_Name={setLast_Name}
          clear={clear}
          gender={gender}
          setGender={setGender}
          avatar={avatar}
          setAvatar={setAvatar}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
        {/* add user  */}
        <AddUserModal
          domain={domain}
          setDomain={setDomain}
          email={email}
          setEmail={setEmail}
          available={available}
          setAvailable={setAvailable}
          first_name={first_name}
          setFirst_Name={setFirst_Name}
          last_name={last_name}
          setLast_Name={setLast_Name}
          clear={clear}
          gender={gender}
          setGender={setGender}
          avatar={avatar}
          setAvatar={setAvatar}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          addNewUser={addNewUser}
        />
        {/* Team Modal */}
        <TeamMembersModal
          members={members}
          setMembers={setMembers}
          openTeamModal={openTeamModal}
          setOpenTeamModal={setOpenTeamModal}
          teamName={teamName}
          setTeamName={setTeamName}
          createTeam={createTeam}
        />
        {/* View Teams List */}
        <TeamsListModal
          showTeamsList={showTeamsList}
          setShowTeamsList={setShowTeamsList}
          teams={teams}
          viewTeamDetails={viewTeamDetails}
          setShowTeamDetail={setShowTeamDetail}
        />
        {/* Team Details */}
        <TeamDetailModal
          showTeamDetail={showTeamDetail}
          setShowTeamDetail={setShowTeamDetail}
          selectedTeamName={selectedTeamName}
          setSelectedTeamName={setSelectedTeamName}
          selectedTeamMembers={selectedTeamMembers}
          setSelectedTeamMembers={setSelectedTeamMembers}
        />
        {/* pagination */}

        {users.length ? (
          <PaginationComponent
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalPages={totalPages}
          ></PaginationComponent>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default UserList;
