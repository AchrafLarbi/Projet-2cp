const  express  = require('express');
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./src/graphql/typeDef.js");
const resolvers = require("./src/graphql/resolvers.js");
const bodyParser = require('body-parser');
const cors = require('cors');


const dotenv = require("dotenv");
dotenv.config();

const corsConfig = {
    credentials: true,
    allowedHeaders: ['Authorization'],
    exposedHeaders: ['Authorization'],
};
const path = '/graphQuery';

const { DB_URI, DB_NAME } = process.env;


(async function () {

    const app = express();
    const httpServer = createServer(app);


    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async frainServer() {
                            subscriptionServer.close();
                        }
                    }
                }
            }
        ],

        context: ({ req }) => {

            return {
                req,
            };
        },


    });

    app.get('/', (req, res) => {

        //console.log(req)
        res.send('hello This is a test');


    });


    app.use(bodyParser.json());
    app.use((req, res, next) => {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    })

    app.use(cors())

    await server.start();

    server.applyMiddleware({ app, path, cors: corsConfig });
    mongoose.connect(DB_URI, { useNewUrlParser: true })


    const PORT = 5003;
    httpServer.listen(PORT, () => {
        console.log("HTTP server is running on port " + PORT);
    })


})();