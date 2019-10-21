import Sequelize, { Model } from 'sequelize';

class IdeaInvite extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        types: {
          type: Sequelize.ENUM({
            values: ['acepted', 'refused', 'pending'],
          }),
          defaultValue: 'pending',
        },
        acepts: {
          type: Sequelize.ENUM({
            values: ['acepted', 'refused', 'pending'],
          }),
          defaultValue: 'pending',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'interested',
    });
    this.belongsTo(models.Idea, {
      foreignKey: 'idea_id',
      as: 'idea',
    });
  }
}

export default IdeaInvite;
