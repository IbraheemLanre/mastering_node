appDomain.run(function () {
    process.nextTick(function () {
        fsDomain.run(function () {
            fs.open('no_file_here', 'r', function (err, fd) {
                if (err) {
                    throw err
                }
                appDomain.dispose()
            })
        })
    })
})