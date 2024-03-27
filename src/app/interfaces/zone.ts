import { IGroupe } from "./groupe"
import { ISite } from "./site"

export interface IZone {
    id?: number
    code: string
    libelle?: string
    sites?: ISite[]
}
