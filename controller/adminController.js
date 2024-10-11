const Admin = require('../models/Admin');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt_assignment'||process.env.JWT_SECERT_KEY; // In production, use an environment variable

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).send({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: admin.username }, JWT_SECRET);
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.username })
    console.log( assignments)

    res.send(assignments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.username }
    
    );
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    if (assignment.status === 'rejected') {
        return res.status(400).send({ error: 'Assignment cannot be accepted as it is already rejected' });
      }
      assignment.status = 'accepted';
      await assignment.save(); 
      res.send({
        message: 'Assignment accepted successfully',
        assignment: assignment
      });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.rejectAssignment = async (req, res) => {
    try {
      const assignment = await Assignment.findOne({
        _id: req.params.id,
        admin: req.user.username,
      });

      if (!assignment) {
        return res.status(404).send({ error: 'Assignment not found' });
      }
      if (assignment.status === 'accepted') {
        return res.status(400).send({ error: 'Assignment cannot be rejected as it is already accepted' });
      }
      assignment.status = 'rejected';
      await assignment.save(); 
      res.send({
        message: 'Assignment rejected successfully',
        assignment: assignment
      });
    } catch (error) {
      res.status(400).send({ error: error.message }); 
    }
  };
  