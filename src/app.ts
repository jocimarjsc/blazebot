import express from "express"
import cors from "cors"
import * as dotenv from "dotenv";
import { routes } from "./router"
import { Bot } from "./bot/CreateBot";

dotenv.config();

const bot = new Bot()
bot.inital()
bot.commandBot()

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

export { app }