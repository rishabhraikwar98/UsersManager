const express = require('express');
const router = express.Router();

const{createTeam,findTeamById} = require("../controllers/teamsController")
// Create a new team
router.post('/', createTeam);

// Retrieve a specific team by ID
router.get('/:id',findTeamById );

module.exports = router;
