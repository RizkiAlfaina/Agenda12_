import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import User from "../models/user.model.js";
import Role from "../models/user_roles.js";

const verifyToken = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Admin role!',
    });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Moderator Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator role!',
    });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator' || roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Moderator or Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator or Admin role!',
    });
  }
};

export { verifyToken, isAdmin, isModerator, isModeratorOrAdmin };
