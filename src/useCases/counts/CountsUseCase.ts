import { client } from "../../prisma/client"

interface ICounts {
    id?: string
    countGreen?: number
    countWhite?: number
    countRed?: number
    countGale1?: number
    countGale2?: number
    createdAt: string
}

class CountsUseCase {
    async getCounts(consultationDate: string) {
        const d = new Date()

        const date = Intl.DateTimeFormat("pt-br").format(d)
        
        const counts = await client.count.findMany({
            where: {
                createdAt: consultationDate ? consultationDate : date
            }
        })

        return counts
    }

    async createCounts({ countGreen, countWhite, countRed, countGale1, countGale2, createdAt }: ICounts) {
        const counts = await client.count.create({
            data: {
                countGreen,
                countWhite,
                countRed,
                countGale1,
                countGale2,
                createdAt
            }
        })

        return counts
    }

    async updateCounts({ id, countGreen, countWhite, countRed, countGale1, countGale2 }: ICounts) {
        const updateCounts = await client.count.update({
            where: { id },
            data: {
                countGreen,
                countWhite,
                countRed,
                countGale1,
                countGale2
            }
        })

        return updateCounts
    }
}

export { CountsUseCase }