import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/auth";
import { dbConnect } from "./db/connection";

// MongoDB Connection
dbConnect();
// End

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api", router);

app.listen(5000, () => console.log("Server is running..."));