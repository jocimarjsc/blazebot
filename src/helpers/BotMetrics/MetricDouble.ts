import { Bot } from "../../bot/CreateBot"
import { MountMessageHelper } from "../Messages/MountMessageHelpers"
import { CountsUseCase } from "../../useCases/counts/CountsUseCase"
import { ConfigsUseCase } from "../../useCases/configs/ConfigsUseCase"

interface ISequenceFour {
    colorName: string
    number: string
    standard: number
}

let data = {
    messageID: null,
    idMessageSent: null,
    standard: null,
    isEqual: false,
    countGale1: 0,
    countGale2: 0,
    gale: 0,
    counterTipSent: 0,
    countGreen: 0,
    countWhite: 0,
    countRed: 0,
    countColorEqual: 0,
    lastColor: "",
    colors: []
}

class MetricDouble {
    bot: Bot
    mounteMessageHelper: MountMessageHelper
    alert: Promise<string>
    info: Promise<string>
    cover: Promise<string>
    entryBlack: Promise<string>
    entryRed: Promise<string>
    red: Promise<string>
    greenWithWhite: Promise<string>
    green: Promise<string>
    date: string
    createdAt: string

    countsUseCase: CountsUseCase
    getConfigs: ConfigsUseCase

    constructor() {
        this.bot = new Bot()
        this.mounteMessageHelper = new MountMessageHelper()
        this.alert = this.mounteMessageHelper.Alert()
        this.info = this.mounteMessageHelper.Info()
        this.cover = this.mounteMessageHelper.Cover()
        this.entryBlack = this.mounteMessageHelper.Entryblack()
        this.entryRed = this.mounteMessageHelper.EntryRed()
        this.green = this.mounteMessageHelper.Green()
        this.greenWithWhite = this.mounteMessageHelper.GreenWithWhite()
        this.red = this.mounteMessageHelper.Red()
        this.date = Intl.DateTimeFormat("pt-br").format(new Date())
        this.createdAt = this.date

        this.countsUseCase = new CountsUseCase()
        this.getConfigs = new ConfigsUseCase()
    }

    async verifySequenceFour({ colorName, number }: ISequenceFour) {
        const configs = await this.getConfigs.findByName(process.env.BOT_NAME)
        if(!configs) {
            console.log("⛔ O nome do BOT no arquivo .env não é o mesmo nome que você cadastrou!")
            return
        }
        data.standard = configs.standard

        //import mensagens
        const ColorOfEntry = colorName === "red" ? await this.entryBlack : await this.entryRed

        if (data.lastColor === colorName || data.lastColor === "") {
            data.colors = []
            data.colors.push({ colorName, number })
            data.lastColor = colorName
            data.countColorEqual += 1
            data.isEqual = true

            if (colorName === "white") {
                data.countColorEqual = 0
                console.log(data.colors)
                console.log("--------------------------------------------------")
            }

            //possivel entrada
            if (data.isEqual === true && data.countColorEqual === data.standard - 1 && colorName !== "white") {
                const message = `<b>Analisando Possível Entrada: ${ColorOfEntry}</b>`

                const messageID = await this.bot.sendMessage({ message })
                data.messageID = messageID
                console.log(`BOT1: Analisando Possível Entrada: ${ColorOfEntry}`)
                console.log(data.colors)
                console.log("--------------------------------------------------")

                return data
            }

            //enviar tip
            if (data.isEqual === true && data.countColorEqual === data.standard && colorName !== "white") {
                if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                data.messageID = null
                const message = `✅Entrar: ${ColorOfEntry} ${await this.cover}\n${await this.info}`
                const message2 = `🎰<b>BLAZE DOUBLE</b>\n⚠️Última cor ${data.lastColor === "red" ? "🟥" : "⬛"}\n\n🎲 <b>ENTRAR NO ${colorName === "black" ? "🟥" : "⬛"}⬜</b>\n2️⃣ Máximo <b>02 Martingale</b>`
                data.counterTipSent += 1
                
                const messageID = await this.bot.sendMessage({ message: message2 })
                data.idMessageSent = messageID
                console.log(`BOT1: TIP ENVIADA: ${ColorOfEntry} ${await this.cover}`)
                console.log(data.colors)
                console.log("--------------------------------------------------")

                return data
            }

            //conferencia red e martingale
            if (data.isEqual === true && data.lastColor === colorName && colorName !== "white" && data.countColorEqual > data.standard) {
                data.gale += 1

                //martingales
                if (data.gale === 1) {
                    const message = `<i>Vamos Primeira Gale</i>`
                    const messageID = await this.bot.replyMessage({ message: `<b>Vamos Primeira Gale</b>`, messageID: data.idMessageSent })
                    data.messageID = messageID
                    console.log(`BOT1: GALE: Vamos a Primeira Gale`)
                    console.log(data.colors)
                    console.log("--------------------------------------------------")
                    return data
                }

                if (data.gale === 2) {
                    if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                    const message = `<i>Vamos Primeira Gale</i>`
                    const messageID = await this.bot.replyMessage({ message: `<b>Vamos Segunda Gale</b>`, messageID: data.idMessageSent })
                    data.messageID = messageID
                    console.log(`BOT1: GALE: Vamos Segunda Gale`)
                    console.log(data.colors)
                    console.log("--------------------------------------------------")
                    return data
                }

                //inicio conferencia red
                if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                data.gale = 0
                data.colors = []
                data.colors.push({ colorName, number })
                data.countColorEqual = 0
                data.countColorEqual += 1
                data.countRed += 1
                data.lastColor = colorName

                await this.countsUseCase.createCounts({
                    countWhite: 0,
                    countGreen: 0,
                    countRed: 1,
                    countGale1: data.gale === 1 ? 1 : 0,
                    countGale2: data.gale === 2 ? 1 : 0,
                    createdAt: this.createdAt
                })

                await this.bot.replyMessage({ message: `${await this.red}`, messageID: data.idMessageSent })
                console.log(`BOT1: RED: ${await this.red}`)
                console.log(data.colors)
                console.log("--------------------------------------------------")
                return data
            }
            console.log(data.colors)
            console.log("--------------------------------------------------")
            return data
        }

        if (data.lastColor !== colorName) {
            //possivel entrada e sequencia quebrada
            const possibleEntryCancel = data.isEqual === true && data.countColorEqual === data.standard - 1
            if (possibleEntryCancel) {
                if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                data.messageID = null
                console.log("BOT1: ---> Sequência Quebrada, Mensagem apagada.")
                console.log(data.colors)
                console.log("--------------------------------------------------")
                data.colors = []
            }

            //green na cor white
            const redWithWhite = colorName === "white" && data.countColorEqual >= data.standard
            if (redWithWhite) {
                if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                data.messageID = null
                const thisGale = data.gale === 1 ? "<i>Primeira Gale</i>" : "<i>Segunda Gale</i>"
                data.colors = []
                data.colors.push({ colorName, number })
                data.lastColor = colorName
                data.countColorEqual = 0
                data.countColorEqual += 1
                data.countWhite += 1
                data.isEqual = false
                data.countGale1 += data.gale === 1 ? 1 : 0
                data.countGale2 += data.gale === 2 ? 1 : 0

                await this.countsUseCase.createCounts({
                    countWhite: 1,
                    countGreen: 0,
                    countRed: 0,
                    countGale1: 0,
                    countGale2: 0,
                    createdAt: this.createdAt
                })

                await this.bot.replyMessage({ message: `${await this.greenWithWhite}${data.gale ? `\n${thisGale}` : ""}`, messageID: data.idMessageSent })
                console.log(`BOT1: GREEN WHITE: ${await this.greenWithWhite} ${data.gale ? `\n\n${thisGale}` : ""}`)
                console.log(data.colors)
                console.log("--------------------------------------------------")
                data.gale = 0

                return data
            }

            data.countColorEqual += 1
            data.isEqual = false

            //conferencia green
            if (data.isEqual === false && data.countColorEqual >= data.standard + 1 && data.lastColor !== "white") {
                if (data.messageID !== null) await this.bot.deleteMessageWithID(data.messageID)
                data.messageID = null

                const thisGale = data.gale === 1 ? "<i>Primeira Gale</i>" : "<i>Segunda Gale</i>"

                data.isEqual = false
                data.colors = []
                data.colors.push({ colorName, number })
                data.lastColor = colorName
                data.countGreen += data.gale === 1 || data.gale === 2 ? 0 : 1
                data.countColorEqual = 0
                data.countColorEqual += 1
                data.countGale1 += data.gale === 1 ? 1 : 0
                data.countGale2 += data.gale === 2 ? 1 : 0

                await this.countsUseCase.createCounts({
                    countWhite: 0,
                    countGreen: data.gale === 1 || data.gale === 2 ? 0 : 1,
                    countRed: 0,
                    countGale1: data.gale === 1 ? 1 : 0,
                    countGale2: data.gale === 2 ? 1 : 0,
                    createdAt: this.createdAt
                })

                await this.bot.replyMessage({ message: `${await this.green}${data.gale ? `\n${thisGale}` : ""}`, messageID: data.idMessageSent })
                console.log(`BOT1: GREEN: ${await this.green} ${data.gale ? `\n${thisGale}` : ""}`)
                console.log(data.colors)
                console.log("--------------------------------------------------")
                data.gale = 0

                return data
            }

            data.colors = []
            data.colors.push({ colorName, number })
            data.lastColor = colorName

            data.countColorEqual = 0
            data.countColorEqual += 1

            console.log(data.colors)
            console.log("--------------------------------------------------")

            return data
        }

        return data
    }
    // async verifySequenceFour({ colorName, number, standard }: ISequenceFour) {
    //     //insira seu padrão aqui
    //     const message = `Você precisa fazer o seu padrão!`
    //     this.bot.sendMessage({ message })
    //     console.log({ message })

    //     return { message }
    // }
}

export { MetricDouble }