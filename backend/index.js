import express from "express";
import cors from "cors";
import routes from "./routes/index.js"; // Use the combined routes

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes); // Use the combined routes

app.listen(5000, () => console.log('Server up and running...'));
