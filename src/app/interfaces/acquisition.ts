import { IFamille } from "./famille"
import { IGroupe } from "./groupe"

export interface IAcquisition {
    numero?: number
    date_acquisition: Date
    date_mise_service: Date
    type_bien: string
    famille: IFamille
    description?: string
    valeur_acq?: string
    code_inventaire?: string
}
