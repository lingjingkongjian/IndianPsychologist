/**
 * Created by jonathanlehner on 01.12.17.
 */
module.exports = {
    servers: {
        one: {
            host: '51.255.38.227',
            username: 'root',
            // pem: './path/to/pem'
            password: 'NMGeOJP1'
            // or neither for authenticate from ssh-agent
        }
    },

    meteor: {
        // TODO: change app name and path
        name: 'indiandoctor',
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
            ROOT_URL: 'https://shopwarp.com',
            MONGO_URL: 'mongodb://localhost/meteor',
            PORT: 3003,  /// sets machine port i.e. what is exposed outside of docker
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
        deployCheckPort: 3003,

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