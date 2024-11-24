const nh = require('node-hill-s')

nh.startServer({
    hostKey: 'seRlVEjCrVoojKpaePmfNffvqq5SxvsSdduOUUDeAMXoWHk7YqyIUxiwTvXF7yoK', // Your host key here (can be found under the settings of the set.)

    gameId: 231, // Your game id here

    port: 42480, // Your port id here (default is 42480)

    local: false, // Whether or not your server is local

    mapDirectory: './maps/', // The path to your maps folder.

    map: 'mainmap.brk', // The file name of your .brk

    scripts: './user_scripts', // Your .js files path

    // Add npm / built-in node.js modules here
    modules: [
        //"discord.js"
    ]
})

// For more help: https://brickhill.gitlab.io/open-source/node-hill/interfaces/gamesettings.html
