const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const moment = require("moment");

const userController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      await db.user
        .create({
          fullname,
          username,
          email,
          password: hashPassword,
        })
        .then((result) => res.send(result));
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { usermail, password } = req.body;
      const user = await db.user.findOne({
        where: {
          [Op.or]: [
            {
              username: usermail,
            },
            {
              email: usermail,
            },
          ],
        },
      });
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();

          const token = await db.token.create({
            token: generateToken,
            expired: moment().add(1, "days").format(),
            payload: JSON.stringify(payload),
            valid: true,
            status: "LOGIN",
          });
          return res.status(200).send({
            message: "You're succesfully logged in!",
            token: token.dataValues.token,
            value: user,
          });
        }
      } else {
        throw new Error("login failed, user not found");
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getIdByToken: async (req, res) => {
    try {
      const { token } = req.query;
      const find = await db.token.findOne({
        where: {
          token: token,
          expired: {
            [Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      if (!find) {
        throw new Error("token has expired!");
      }
      const user = await db.user.findOne({
        where: {
          id: JSON.parse(find.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;
      req.user = user.dataValues;
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
};

module.exports = userController;
