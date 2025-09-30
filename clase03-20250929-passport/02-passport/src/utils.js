import {fileURLToPath} from 'url';
import { dirname } from 'path';
import crypto from "crypto"
import bcrypt from "bcrypt"

let dato="prueba"
let hashDato=crypto.createHmac("sha256", "coder123").update(dato).digest("hex")
console.log({dato, hashDato})


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generaHash=password=>bcrypt.hashSync(password, 10)
export const validaPass=(pass, hash)=>bcrypt.compareSync(pass, hash)