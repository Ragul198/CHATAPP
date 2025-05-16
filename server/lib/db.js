import mongoose from 'mongoose';



//functions to connect mongodb database



export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        })
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};