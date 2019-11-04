module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('ideas_partners', 'idea_partners');
  },

  down: queryInterface => {
    return queryInterface.dropTable('idea_partners');
  },
};
