module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ideas_invites', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      idea_id: {
        type: Sequelize.UUID,
        references: { model: 'ideas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      interested_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      types: {
        type: Sequelize.ENUM,
        allowNull: false,
      },
      acepts: {
        type: Sequelize.ENUM,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ideas_invites');
  },
};
