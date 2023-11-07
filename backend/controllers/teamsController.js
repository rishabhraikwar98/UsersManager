const Team = require('../models/team');
const User = require('../models/user');

const teamsController = {
    createTeam : async (req, res) => {
        try {
          const { id } = req.body;
      
          const users = await User.find({id:id}).exec();
      
          const uniqueDomain = [...new Set(users.map(user => user.domain))];
          const uniqueAvailability = [...new Set(users.map(user => user.available))];
          const existingTeam = await Team.findOne({
              uniqueDomain,
              uniqueAvailability
            }).exec();
        
            if (existingTeam) {
              existingTeam.users.push(...users);
              await existingTeam.save();
            } else {
              const newTeam = new Team({users, uniqueDomain, uniqueAvailability });
              await newTeam.save()
            }
            res.status(201).send('Team created/updated successfully');
          
        } catch (error) {
          res.status(500).send(error.message);
        }
      },
      findTeamById: async (req, res) => {
        try {
          const { id } = req.params;
          const team = await Team.findOne({_id:id});
      
          if (!team) {
            res.status(404).send('Team not found');
          } else {
            res.send(team);
          }
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
} 

module.exports = teamsController