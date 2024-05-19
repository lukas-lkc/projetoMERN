import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://root:root@cluster0.c20idd6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const connectDatabase = () => {
    /* mongoose.connect("")
    const connect = mongoose.connection;
    connect.on('error', console.error.bind(console, 'MongoDB connection error:'));
    connect.once('open', ()=> {
        console.log('Connected to MongoDB Atlas');
    }) */
    mongoose.connect(mongoURI).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((err) => {
        console.error('MongoDB Atlas connection error:', err);
    });
}

export default connectDatabase;