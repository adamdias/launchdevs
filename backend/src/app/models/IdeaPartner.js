import Sequelize, { Model } from 'sequelize';

class IdeaPartner extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
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
      as: 'partner',
    });
    // this.belongsTo(models.Idea, {
    //   foreignKey: 'idea_id',
    //   as: 'idea',
    // });
  }
}

export default IdeaPartner;
