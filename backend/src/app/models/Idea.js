import Sequelize, { Model } from 'sequelize';

class Idea extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        sub_title: Sequelize.STRING,
        contact: Sequelize.STRING,
        first_comment: Sequelize.TEXT,
        status: {
          type: Sequelize.ENUM({
            values: ['draft', 'active', 'execution', 'paused', 'finish'],
          }),
          defaultValue: 'draft',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'cover_id',
      as: 'cover',
    });
    this.belongsTo(models.File, {
      foreignKey: 'thumbnail_id',
      as: 'thumbnail',
    });
    this.belongsTo(models.User, {
      foreignKey: 'author_id',
      as: 'author',
    });
    this.belongsTo(models.IdeaCategory, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Idea;
