import { Router } from "express"
import { ConfigsController } from "./useCases/configs/ConfigsController"

const routes = Router()

const configController = new ConfigsController()

routes.post("/colors", configController.handle)

export { routes }