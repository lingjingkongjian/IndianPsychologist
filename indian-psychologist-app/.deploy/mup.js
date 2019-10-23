/**
 * Created by jonathanlehner on 01.12.17.
 */
const one = require('../server.json')
const settings = require('../settings.json')

module.exports = {
    servers: {
        one: one
    },

    meteor: {
        // TODO: change app name and path
        name: 'lp-builder',
        path: '../',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },
        //port: 3000, // does not seem to do anything

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            ROOT_URL: 'http://vps662302.ovh.net:3003/',
            MONGO_URL: 'mongodb://mongodb/lp-builder',
            PORT: settings.port, /// sets machine port i.e. what is exposed outside of docker

            // for mongo express - https://github.com/mongo-express/mongo-express
            //alternatively: ME_CONFIG_MONGODB_URL: 'mongodb://mongodb/flexcar',
            ME_CONFIG_MONGODB_SERVER: 'mongodb',
            ME_CONFIG_MONGODB_PORT: 27017, // the default value
        },

        docker: {
            // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
            image: 'abernix/meteord:node-8.4.0-base',
            //imagePort: 3000, // (default: 80, some images EXPOSE different ports)

            // lets you bind the docker container to a
            // specific network interface (optional)
            // this will make it accessible only on the server bind: '127.0.0.1',
            //bind: '127.0.0.1',
            //prepareBundle: true,
            //args: ["-p 127.0.0.1:3000:3000"] ///interface (i.e. localhost) : machine : container

        },

        // This is the maximum time in seconds it will wait
        // for your app to start
        // Add 30 seconds if the server has 512mb of ram
        // And 30 more if you have binary npm dependencies.
        deployCheckWaitTime: 60,
        deployCheckPort: settings.port,

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    mongo: {
        port: 27017,
        version: '3.4.1',
        servers: {
            one: {}
        }
    }
}