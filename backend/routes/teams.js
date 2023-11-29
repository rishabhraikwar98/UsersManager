const express = require('express');
const router = express.Router();

const{createTeam,findTeamById,getTeams} = require("../controllers/teamsController")
// Create a new team
router.post('/', createTeam);
//get all teams
router.get('/',getTeams)
// Retrieve a specific team by ID
router.get('/:id',findTeamById );

module.exports = router;
