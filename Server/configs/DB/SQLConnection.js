import { createConnection } from "mysql2"

export const connection = () => {
    try {
        const pool = createConnection({
            host:'spjam.h.filess.io',
            port:'3307',
            user:'PruebaCam_notedboxbe',
            password:'7866fbdc97febab3f74708610cbd877c34d21e59',
            database:'PruebaCam_notedboxbe'
        })
        console.log('DB Connection Successful !!')
        return pool
    } catch (error) {
        return console.error('DB Connection Error: ', error)
    }
}