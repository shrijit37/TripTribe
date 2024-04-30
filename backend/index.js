import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 8080;

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users",userRoutes);

app.listen(port,()=>console.log(`server listening on ${port}`));










// {
//     "fname":"shrijit",
//     "lname":"srivastav",
//     "email":"sh@oidsjfiosj",
//     "password":"sdjfos",
//     "userInterest":["driving","adventure"],
//     "userAddress":"ghaziabad"
// }