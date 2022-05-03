import { client } from "../../prisma/client"

interface IConfigsRequest {
    id?: string
    name?: string
    standard?: number
    password?: string
    activo?: boolean
}

class ConfigsUseCase {
    async create({ name, standard, password, activo }: IConfigsRequest) {
        const configs = await client.config.create({
            data: {
                name,
                standard,
                password,
                activo
            }
        })

        return configs
    }

    async show() {
        const configs = await client.config.findFirst()

        return configs
    }

    async update({ standard, activo, id }: IConfigsRequest) {
        const configs = await client.config.update({
            where: { id },
            data: {
                standard,
                activo
            }
        })

        return configs
    }
}

export { ConfigsUseCase }