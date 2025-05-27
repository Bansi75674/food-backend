import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bansighetiya:7567463436@cluster0.k4fux0q.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}