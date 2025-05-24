import * as Joi from 'joi';


export default Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    DB_PORT: Joi.number().port().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    JWT_SECRETE_KEY: Joi.string().required(),
    JWT_TIMEOUT: Joi.number().required(),
    REFRESH_TOKEN_TIMEOUT: Joi.number().required()
})