import { registerAs } from "@nestjs/config";

export default registerAs('auth', ()=>({
    secret: process.env.JWT_SECRETE_KEY,
    expireIn: parseInt(process.env.JWT_TIMEOUT ?? '3600', 10)
}))