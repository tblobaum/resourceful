/*
 * redis/index.js: redis engine wrapper
 *
 * (C) 2011 Nodejitsu Inc.
 * MIT LICENCE
 *
 */

var url = require('url'),
    redis = require('redis'),
    resourceful = require('../../../resourceful'),
    render = require('./view').render,
    filter = require('./view').filter;

var Redis = exports.Redis = function Redis(config) {
  if (config.uri) {
    var parsed = url.parse('redis://' + config.uri);
    config.uri = parsed.hostname;
    config.port = 6379 // parseInt(parsed.port, 6379);
    config.database = (parsed.pathname || '').replace(/^\//, '');
  }

  this.connection = redis.createClient((config.port || 6379),
  (config.host || config.uri || '127.0.0.1'), {}) 
  
  if (config.auth) this.connection.auth(config.auth, noop)
  
  this.cache = new resourceful.Cache();
};

Redis.prototype.protocol = 'redis';

Redis.prototype.load = function (data) {
  throw new(Error)("Load not valid for redis.");
};

Redis.prototype.request = function (method) {
  //var args = Array.prototype.slice.call(arguments, 1);
  //return this.connection[method].apply(this.connection, args);
  // ..
  console.log('undefined request "'+method+'" method called', arguments)
};

Redis.prototype.head = function (id, callback) {
//  return this.request('head', id, callback);
  // ..
  console.log('undefined head method called', arguments)
};

Redis.prototype.get = function (id, callback, database) {
  this.connection.hget(database, id, function (e, doc) {
    if (e) console.dir(e)
    try { 
      var foo = JSON.parse(doc);
    }
    catch (e) { 
      if (e) callback(e)
    } 
    finally { 
      callback(null, foo)
    }
  })
}

Redis.prototype.put = function (id, doc, callback, database) {
  this.connection.hset(database, id, JSON.stringify(doc), callback);
};

Redis.prototype.save = function () {
  return this.put.apply(this, arguments);
};

Redis.prototype.update = function (id, doc, callback, database) {
  return this.cache.has(id) ?
      this.put(id, resourceful.mixin({}, this.cache.get(id).toJSON(), doc), callback, database)
      :
      this.put(id, doc, callback, database);
};

Redis.prototype.destroy = function (id, callback, database) {
  callback(null, this.connection.hdel(database, id))
};

Redis.prototype.reload = function (id, callback, database) {
  return this.get.apply(this, arguments)
};

Redis.prototype.view = function (path, opts, callback) {
//  return this.request.call(this, 'view', path, opts, function (e, res) {
//    if (e) return callback(e);

//    callback(null, res.rows.map(function (r) {
//      // With `include_docs=true`, the 'doc' attribute is set instead of 'value'.
//      return r.doc || r.value;
//    }));
//  });
  // ..
  console.log('undefined view method called', arguments)
};

Redis.prototype.all = function (callback, database) {
  this.connection.hgetall(database, function (e, docs) {
      if (e) throw new Error(e)
      var collection = []
      for (var k in docs) {
          var doc = docs[k]
          try { 
              var foo = JSON.parse(doc)
          } catch (e) { 
              if (e) console.log(e)
              var foo = doc;
          } finally { 
              collection.push(foo)
          }
      }
      callback(null, collection)
  })
}

Redis.prototype.filter = function (name, data) {
  return filter.call(data.resource, name, data.options, data.filter);
}

Redis.prototype.sync = function (factory, callback) {
//  var that = this,
//      id = '_design/' + factory.resource;

//  factory._design = factory._design || {};
//  factory._design._id = id;
//  if (factory._design._rev) return callback(null);

//  this.connection.head(id, function (e, headers, status) {
//    if (!e && headers.etag) {
//      factory._design._rev = headers.etag.slice(1, -1);
//    }
//    
//    that.connection.put(id, factory._design, function (e, res) {
//      if (e) {
//        if (e.reason === 'no_db_file') {
//          that.connection.connection.create(function () {
//            that.sync(callback);
//          });
//        } 
//        else {

//          /* TODO: Catch errors here. Needs a rewrite, because of the race */
//          /* condition, when the design doc is trying to be written in parallel */
//          callback(e);
//        }
//      }
//      else {
//        // We might not need to wait for the document to be
//        // persisted, before returning it. If for whatever reason
//        // the insert fails, it'll just re-attempt it. For now though,
//        // to be on the safe side, we wait.
//        factory._design._rev = res.rev;
//        callback(null, factory._design);
//      }
//    });
//  });
  // ..
  console.log('undefined sync method called')
};

//
// Relationship hook
//
Redis._byParent = function (factory, parent, rfactory) {
//  factory.filter('by' + parent, { include_docs: true }, resourceful.render({
//    map: function (doc) {
//      if (doc.resource === $resource) {
//        for (var i = 0; i < doc.$children.length; i++) {
//          emit(doc._id, { _id: doc.$children[i] });
//        }
//      }
//    }
//  }, {
//    resource: JSON.stringify(parent),
//    children: (''+factory.resource).toLowerCase() + '_ids'
//  }));
  // ..
  console.log('undefined _byParent method called')
};

function noop () { }

