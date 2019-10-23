import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        bio: Sequelize.TEXT,
        github: Sequelize.STRING,
        linkedin: Sequelize.STRING,
        email: Sequelize.STRING,
        objective: Sequelize.TEXT,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        recover_pass_token: Sequelize.STRING,
        confirm_email: Sequelize.BOOLEAN,
        confirm_email_token: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
    this.hasMany(models.UserLink);
    this.hasMany(models.UserSkill);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
