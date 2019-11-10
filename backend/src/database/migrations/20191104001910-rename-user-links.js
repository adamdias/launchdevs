module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('users_links', 'user_links');
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_links');
  },
};
