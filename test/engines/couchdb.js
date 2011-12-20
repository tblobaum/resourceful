var cradle = require('cradle');

var engine = exports;

engine.name = 'couchdb'
engine.options = { db: 'test' }

engine.load = function (resourceful, data, callback) {
  var db = new(cradle.Connection)(engine.options).database(engine.options.db);
  db.destroy(function () {
    db.create(function () {
      db.save(data, function (e, res) {
        callback();
      });
    });
  });
}
