import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import UserLink from '../app/models/UserLink';
import UserSkill from '../app/models/UserSkill';
import Idea from '../app/models/Idea';
import IdeaInvite from '../app/models/IdeaInvite';
import IdeaPartner from '../app/models/IdeaPartner';
import IdeaCategory from '../app/models/IdeaCategory';

const models = [
  File,
  User,
  UserLink,
  UserSkill,
  Idea,
  IdeaInvite,
  IdeaPartner,
  IdeaCategory,
];

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
