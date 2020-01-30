import mongoose from 'mongoose';
export const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/advance-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
    const db = mongoose.connection;
    db.on('error', () =>  console.log("database connection fail"))
    db.once('open', () => console.log("databse conencted successfully"));
}

