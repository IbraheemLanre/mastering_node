const fork = require('child_process').fork
fork('./emitter.js', [], {silent: true})