module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "users",
    {
      username: Sequelize.STRING,
      fullname: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      verification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      img_url: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return user;
};
