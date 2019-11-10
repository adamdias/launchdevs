module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('users_skills', 'user_skills');
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_skills');
  },
};
