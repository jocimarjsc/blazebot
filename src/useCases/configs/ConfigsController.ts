import { Request, Response } from "express"
import { MetricDouble } from "../../helpers/BotMetrics/MetricDouble"
import { ConfigsUseCase } from "./ConfigsUseCase"

interface IConfigsRequest {
    id?: string
    name: string
    standard: number
    password: string
    activo: boolean
}

class ConfigsController {
    async handle(request: Request, response: Response) {
        const { colorName, number } = request.body
        const configsUseCase = new ConfigsUseCase()
        const configs = await configsUseCase.show()

        if (!configs) {
            console.log("⚙️ Precisa configurar seu bot!")
            return response.status(501).json({ message: "Need to configure the bot!"})
        }

        if (configs.activo) {
            const metricDouble = new MetricDouble()
            const data = await metricDouble.verifySequenceFour({ colorName, number, standard: configs.standard })

            return response.json(data)
        }

        console.log("⛔Bot desativado")

        return response.status(501).json({ message: "Bot is desactived!"})
    }

    async create({ name, standard, activo, password }: IConfigsRequest) {
        const configsUseCase = new ConfigsUseCase()

        const alreadyExistsConfigs = await configsUseCase.show()

        if (!alreadyExistsConfigs) {
            const newConfigs = await configsUseCase.create({
                name, standard, activo, password
            })

            return newConfigs
        }


        const updateConfig = await configsUseCase.update({
            id: alreadyExistsConfigs.id,
            standard,
            activo
        })

        return updateConfig
    }
}

export { ConfigsController }