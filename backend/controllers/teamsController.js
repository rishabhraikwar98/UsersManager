const Team = require("../models/team");
const User = require("../models/user");

const teamsController = {
  getTeams: async (req, res) => {
    try {
      const teams = await Team.find();
      res.status(200).send(teams);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createTeam: async (req, res) => {
    const { teamName, members } = req.body;
    try {
      let existingTeam = await Team.findOne({ teamName });
      if (!existingTeam) {
        existingTeam = new Team({
          teamName,
          members,
        });
      } else {
        existingTeam.members.push(...members);
      }

      await existingTeam.save();
      res.status(201).send("Team created/upadted sucessfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  findTeamById: async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findOne({ _id: id });
      if (!team) {
        res.status(404).send("Team not found");
      } else {
        res.send(team);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = teamsController;
