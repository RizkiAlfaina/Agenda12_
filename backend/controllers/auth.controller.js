import { Op } from "sequelize";
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const User = db.User;
const Role = db.Role;

export const signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      await user.setRoles(roles);
      res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      await user.setRoles([1]);
      res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 21600, // 24 hours
      }
    );

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push('ROLE_' + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Old Password!',
      });
    }

    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.status(400).send({
        message: 'New Password and Confirm New Password do not match!',
      });
    }

    user.password = bcrypt.hashSync(req.body.newPassword, 8);
    await user.save();

    res.send({ message: 'Password was reset successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,  // Assuming roles are already set and you want to return them
      message: 'Profile updated successfully!'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


