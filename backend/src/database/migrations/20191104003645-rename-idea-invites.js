module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('ideas_invites', 'idea_invites');
  },

  down: queryInterface => {
    return queryInterface.dropTable('idea_invites');
  },
};
