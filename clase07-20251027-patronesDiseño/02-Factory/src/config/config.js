process.loadEnvFile("./.env")

export const config={
    PORT: process.env.PORT || 3000, 
    API_KEY: process.env.API_KEY, 
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    PERSISTENCE: process.env.PERSISTENCE
}