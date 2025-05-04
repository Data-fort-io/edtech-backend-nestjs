import { registerAs } from "@nestjs/config";


export default registerAs(('database'), ()=> ({
    
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5342,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.SYNC === "true" ? true : false,
    autoLoadEntities: process.env.AUTO_LOAD_ENTITIES ===  "true" ? true : false 

    
}))