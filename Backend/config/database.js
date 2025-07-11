const mongoose = require('mongoose');

const connectDb = async ()=>
    {
        try
        {
            await mongoose.connect('mongodb+srv://akash07:QWERTY2%40akash@edtube.kluvqhj.mongodb.net/EdTube?retryWrites=true&w=majority&appName=EdTube&family=4')
            console.log("connected to Database successfully");
        }
        catch(err)
        {
            console.error('Database connection failed:', err.message);
        }
    }

module.exports = connectDb;