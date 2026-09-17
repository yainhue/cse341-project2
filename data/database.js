const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const InitDb = (callback) => {

    if (database) {
        console.log("Database is already initialized!");
        return callback(null, database);
    }
    MongoClient.connect(process.env.CONNECTION_STRING)
        .then((client) => {
            database = client.db();
            console.log("Database initialized!");
            console.log(database.databaseName, database.collection("contacts").collectionName);
            callback(null, database);
        })
        .catch((err) => {
            console.log("Database initialization failed!");
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized!");
    }
    return database;
}

module.exports = {
    InitDb,
    getDatabase
}