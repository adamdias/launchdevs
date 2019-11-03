module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ideas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      author_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      cover_id: {
        type: Sequelize.UUID,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      thumbnail_id: {
        type: Sequelize.UUID,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      category_id: {
        type: Sequelize.UUID,
        references: { model: 'idea_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allownull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
      },
      first_comment: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM({
          values: ['draft', 'active', 'execution', 'paused', 'finish'],
        }),
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
    return queryInterface.dropTable('ideas');
  },
};
