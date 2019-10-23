import database from '../../src/database';

export default function truncate() {
  // return database.connection.sync({ force: true });
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        cascade: true,
        force: true,
      });
    })
  );
}
