const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);


        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(
            conn && conn.connection && conn.connection.host ?
            'MongoDB: Connected' :
            'MongoDB: connection failed or host is undefined'
        );

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;