import fs from "fs/promises"
import { IResurce } from "../services/userService"


export const getData = async (origin:string) => {

    const file =await fs.readFile("src/data/organizations.json","utf-8")
    const data:IResurce[] = await JSON.parse(file)
    const parse = (data.filter((x) => x.name == origin))
    return parse
}

