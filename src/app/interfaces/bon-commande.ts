import { IFournisseur } from "./fournisseur"

export interface IBonCommande {
    id?: number
    numero_bc: string
    fournisseurId?: number
    fournisseur?: IFournisseur
    intitule?: string
    date?: Date
    montant?: string
    note?: string
    piece_jointe?: string
}
