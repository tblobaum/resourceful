var resourceful = require('../lib/resourceful')

var User = resourceful.define('user', function () {
  this.use('redis', {database:'user'})
  this.string('name')
  this.number('visits').default(0)
})

var total = 1000
console.time('benchmark')

var j = total 
for (var i=0;i<total;i++) {
  makeUser()
}

function makeUser() {
  var user = new User({_id: 'kohai-'+i, name: 'Kohai'+i})
  
  // save
  user.save(function (e) {
    if (e) console.log(e)

    // destroy
    User.destroy(user._id, function (e) {
      if (e) console.log(e)
      //console.log(user.name)
      // benchmark
      j--
      if (j < 2) {
        console.timeEnd('benchmark')
        console.log('requests: '+ total)
      }
      
    })
    
  })

}

// ** class methods
var user = new User({_id: 'kohai-master', name: 'Kohai Master'})
user.save(function (e) {
  if (e) console.log(e)
  // get
  User.get('kohai-master', function (err, user) {
    if (err) console.log(err)
    console.log('Resource#get', user._id)
  })
})

// update
User.update('kohai-1', {_id:'kohai-1', name: 'Kohai One'}, function (err) {
  if (err) console.log(err)
  console.log('Resource#update')
})

// all
User.all(function (err, users) {
  if (err) console.log(err)
  console.log('Resource#all', users.length)
})

// save
User.save(new User({_id: 'kohai-twin', name: 'Kohai Twin'}), function (e) {
  if (e) console.log(e)
  console.log('Resource#save')
})

// create
User.create({_id: 'kohai-clone', name: 'Kohai clone'}, function (err, user) {
  if (err) console.log(err)
  console.log('Resource#create', user._id)
})
 

// ** instance methods
var user = new User({_id: 'kohai-clone', name: 'Kohai Clone'})
user.visits++

// save
user.save(function (e) {
  if (e) console.log(e)
  console.log('save', user._id)
})

//var user2 = new User({_id: 'kohai-clone2', name: 'Kohai Clone2'})

//// update
//user2.visits++
//user2.name = 'Kohai Clone2'
//user2.update(user2, function (e, user) {
//  if (e) console.log(e)
//  console.log('update', user._id)
//  
//})

// reload
//user.reload(function (e, user) {
//  if (e) console.log(e)
//  console.log('reload', user._id)
//  
  // destroy
//  user.destroy(function (e) {
//    if (e) console.log(e)
//    console.log('destroy', user._id)
//  })
//  
//})

