import { registerAs } from "@nestjs/config";

export default registerAs('auth', ()=>({
    secret: process.env.JWT_SECRETE_KEY,
    expireIn: parseInt(process.env.JWT_TIMEOUT ?? '3600', 10),
    refreshTokenExpireIn: parseInt(process.env.REFRESH_TOKEN_TIMEOUT ?? '86400', 10)
}))