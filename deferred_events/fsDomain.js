var domain = require('domain')
var fs = require('fs')

var fsDomain = domain.create()
fsDomain.on('error', function (err) {
    console.error('FS error', err)
})

var appDomain = domain.create()
appDomain.on('error', function (err) {
    console.log('APP error', err)
})