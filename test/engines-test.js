var path = require('path')
  , assert = require('assert')
  , fs = require('fs')
  , vows = require('vows')
  , resourceful = require('../lib/resourceful');

var engines = fs.readdirSync(path.join(__dirname, 'engines')).map(function (e) { return require('./engines/' + e.slice(0,-3)); });

engines.forEach(function (e) {
  vows.describe('resourceful/engines/' + e.name)
  .addBatch({
    'Defining resource `book`': {
      topic: function () {
        return this.Book = resourceful.define('book', function () {
          this.use(e.name);

          this.string('title').sanitize('lower');
          this.number('year');
          this.bool('fiction');
        });
      },
      'will be successful': function (book) {
        assert.equal(Object.keys(book.properties).length, 4);
      }
    }
  }).export(module)
});
