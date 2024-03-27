import { IBien } from "./bien"

export interface ICodeInventaire {
    id?: number
    code: string
    bordereau_code: string
    bien: IBien
}