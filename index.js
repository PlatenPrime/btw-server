import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cron from 'node-cron';

import authRoute from "./routes/auth.js";
import palletRoute from "./routes/pallets.js";
import rowRoute from "./routes/rows.js";
import artRoute from "./routes/arts.js";
import posRoute from "./routes/poses.js";
import compRoute from "./routes/comps.js";
import logRoute from "./routes/logs.js";
import askRoute from "./routes/asks.js";
import roleRoute from "./routes/roles.js";
import insRoute from "./routes/ins.js";
import insFolderRoute from "./routes/insfolders.js";
import adaptRoute from "./routes/adapts.js";
import adaptBlockRoute from "./routes/adaptblocks.js";
import defRoute from "./routes/defs.js";
import testRoute from "./routes/tests.js";

import { calculateDefs } from "./utils/defs/calculateDefs.js";
import { updateAllArtDataComps } from "./utils/comps/updateAllArtDataComps.js";
import { updateAllArtDataCompVariants } from "./utils/comps/updateAllArtDataCompVariants.js";
import { getArtDataBalun } from "./utils/comps/getArtDataBalun.js";
import { getArtDataSvyato } from "./utils/comps/getArtDataSvyato.js";
import { getArtDataIdea } from "./utils/comps/getArtDataIdea.js";





mongoose.set('strictQuery', false)



const app = express();
dotenv.config();


// Constants 
const PORT = process.env.PORT || 3002
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


// Middleware

app.use(cors());
app.use(express.json());


// Router 
//http://localhost:3002

app.use("/api/auth", authRoute);
app.use("/api/pallets", palletRoute);
app.use("/api/rows", rowRoute);
app.use("/api/arts", artRoute);
app.use("/api/poses", posRoute);
app.use("/api/comps", compRoute);
app.use("/api/logs", logRoute);
app.use("/api/asks", askRoute);
app.use("/api/roles", roleRoute);
app.use("/api/ins", insRoute);
app.use("/api/insfolders", insFolderRoute);
app.use("/api/adapts", adaptRoute);
app.use("/api/adaptblocks", adaptBlockRoute);
app.use("/api/defs", defRoute);
app.use("/api/tests", testRoute);





async function start() {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b6qtdz4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
		)
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (error) {
		console.log(error)
	}
}

start();


cron.schedule('0 6-14 * * 1-5', async () => {
	console.log('Calculating defs...');
	await calculateDefs();
	console.log('Calculating defs finished...');
});


cron.schedule('0 3 * * *', async () => {
	console.log('Updating all comps...');
	await updateAllArtDataComps();
	await updateAllArtDataCompVariants();
	console.log('Updating all comps finished...');
});




const ideaData = await getArtDataIdea("https://ideaopt.com.ua/ua/lateksnyye-shary/g-1001-pastely-belyy-100sht-79");

console.log(ideaData);
