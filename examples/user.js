var resourceful = require('../lib/resourceful')

var User = resourceful.define('user', function () {
  this.use('couchdb')
  this.string('name')
  this.number('visits').default(0)
})

console.time('benchmark')

for (var i=0;i<1000;i++) {
  makeUser()
}

function makeUser() {
  // ** instance methods
  var user = new User({_id: 'kohai-'+i, name: 'Kohai'+i})
  user.visits++

  console.log(user.name)
  // save
  user.save(function (e) {
    if (e) console.log(e)
    console.log('0 save User:', user.name)
    
    // destroy
  //  User.destroy('Kohai', function (err, user) {
  //    if (err) console.log(err)
  //    console.log('3 destroy User')
  //  })
    
  })
}


// get
User.get('Kohai', function (err, user) {
  if (err) console.log(err)
  console.log('1 get User:', user.name)
})

// update
User.update('Kohai', {name: 'Kohai Twin'}, function (err, user) {
  if (err) console.log(err)
  console.log('2 update User:', user.name)
})

// all
User.all(function (err, users) {
  if (err) console.log(err)
  console.log('4 all User count:', users.length)
})

// save
User.save(new User({_id: 'Kohai', name: 'Kohai'}), function (e) {
  if (e) console.log(e)
  console.log('5 save User:', user.name)
})

// create
User.create({_id: 'Kohai', name: 'Kohai'}, function (err, user) {
  if (err) console.log(err)
  console.log('6 create User:', user.name)
})
 
console.timeEnd('benchmark')

setTimeout(function () {

  // ** instance methods
  
  console.log('new user should not break')
  var user = new User({_id: 'kohai-master', name: 'Kohai Master'})
  user.visits++

  console.log('save should not break')
  // save
  user.save(function (e) {
    if (e) console.log(e)
    console.log('7 save User:', user._id)
  })

  console.log('update should not break')
  // update
  user.update({ name: 'Kohai Clone' }, function (e, user) {
    if (e) console.log(e)
    console.log('8 update User:', user._id)
  })
  
  console.log('reload should not break')
  // destroy
  //user.destroy(function (e, bool) {
  //  if (e) console.log(e)
  //  console.log('9 destroy User', bool)
  //})

  // reload
  user.reload(function (e, user) {
    if (e) console.log(e)
    console.log('10 reload User:', user)
  })
  
}, 5000)

