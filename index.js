var mongojs = require('mongojs')
var async = require('async')
var _ = require('lodash')
// var winston = require('winston')
// var localDB = mongojs('localhost:27017/testDB', ['test'])
// var userDB = mongojs('admin:VX3e5xS79vPJf4BA2H88BpS5a8v7bw4Y@206.189.82.187:1030/listening_user_data?authSource=admin', ['users'])
// winston.add(
//     winston.transports.File, {
//         filename: 'updateDB1.log',
//         level: 'info',
//         json: true,
//         eol: 'rn',
//         timestamp: true
//     }
// )
var localDB = mongojs('localhost:27017/testDB', ['messages'])
// var messagesDB = mongojs('admin:VX3e5xS79vPJf4BA2H88BpS5a8v7bw4Y@206.189.82.187:1030/crm_engagement?authSource=admin', ['messages'])
messagesDB.messages.find({
    //  email: { $exists: true } 
}).limit(1000, function (err, search) {
    if (err) {
        console.log('err')
        return err
    } else if (search.length == 0) {
        throw new Error('Can\'t find data')
    }
    _.map(search, (item) => {
        localDB.messages.insert(item, function (err, inserted) {
            // console.log(inserted)
            console.log('done')
        })
    })
})
