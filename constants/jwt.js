const JWT_ALG = "HS256";
const JWT_ACCESS_EXP = 1;
const JWT_REFRESH_EXP = 240;
//JWT Error Types
const JWT_VALID_TOKEN = "JWT_VALID_TOKEN";
const JWT_INVALID_SIGNATURE = "JsonWebTokenError";
const JWT_TOKEN_TIME_OUT = "TokenExpiredError";
module.exports = {
    JWT_ALG,
    JWT_ACCESS_EXP,
    JWT_REFRESH_EXP,
    JWT_VALID_TOKEN,
    JWT_INVALID_SIGNATURE,
    JWT_TOKEN_TIME_OUT
};