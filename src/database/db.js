import mongoose from 'mongoose';

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((err) => {
        console.error('MongoDB Atlas connection error:', err);
    });
}

export default connectDatabase;