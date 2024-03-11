import { ILocalisation } from "./localisation"

export interface IBien {
    id: number
    site_id: number
    sous_famille_id: number
    client_id: number
    code_inventaire: any
    localisation: ILocalisation
    localisation_id: number
    total_immobilisation: boolean
    description: string
    libelle: string
    etat: string
    service: string
    reference: string
}
