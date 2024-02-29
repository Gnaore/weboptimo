import { IGroupe } from "./groupe"

export interface IUtilisateur {
    id?: number
    firstname?: string
    lastname?: string
    phone?: string
    whatsapp?: string
    proffession?: string
    country?: string
    email?: string
    address?: string
    verification_state?: string
    status?: string
    birth_day?: string
    gender?: string
    avatar?: string
    city?: string
    compagny?: any
    roles?: IGroupe[]
}
