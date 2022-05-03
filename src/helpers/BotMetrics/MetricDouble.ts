import { Bot } from "../../bot/CreateBot"
import { MountMessageHelper } from "../Messages/MountMessageHelpers"
import { CountsUseCase } from "../../useCases/counts/CountsUseCase"

interface ISequenceFour {
    colorName: string
    number: string
    standard: number
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
    }

    async verifySequenceFour({ colorName, number, standard }: ISequenceFour) {
        //insira seu padrão aqui
        console.log("Precisa fazer seu padrão!")

        return { message: "Precisa fazer seu padrão!" }
    }
}

export { MetricDouble }