import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./.env" });
import app from "./app.js";

const database = process.env.DATABASE;
mongoose.connect(database).then(() => console.log("Database connected successfully"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
