import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import UserLink from '../app/models/UserLink';
import UserSkill from '../app/models/UserSkill';
import IdeaInvite from '../app/models/IdeaInvite';
import IdeaPartner from '../app/models/IdeaPartner';

const models = [File, User, UserLink, UserSkill, IdeaInvite, IdeaPartner];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    mongoose.set('useUnifiedTopology', true);

    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
