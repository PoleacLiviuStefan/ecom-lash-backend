const { loadEnv, defineConfig } = require('@medusajs/utils')

loadEnv(process.env.NODE_ENV, process.cwd())

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const REDIS_URL = process.env.REDIS_URL

const DATABASE_URL = 
  `postgres://${DB_USERNAME}:${DB_PASSWORD}` + 
  `@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

module.exports = defineConfig({
  projectConfig: {
    // Configurare pentru baza de date cu SSL
    databaseUrl: DATABASE_URL,
    database_extra: { 
      ssl: { 
        rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false 
      } 
    },
    
    // Configurări pentru HTTP și CORS
    http: {
      storeCors: process.env.STORE_CORS || "https://your-store-domain.com",
      adminCors: process.env.ADMIN_CORS || "https://your-admin-domain.com",
      authCors: process.env.AUTH_CORS || "https://your-auth-domain.com",
    },

    // Secrete pentru JWT și cookie-uri
    jwtSecret: process.env.JWT_SECRET || "supersecret",
    cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    
    // Configurare Redis pentru cache
    redis_url: REDIS_URL || "redis://localhost:6379"
  },

  // Pluginuri Medusa
  plugins: [
    // Exemplu de plugin Fulfillment
    {
      resolve: "medusa-fulfillment-manual",
      options: {}
    },
    // Alte pluginuri necesare
  ],
  
  // Adăugarea variabilelor de buildpack pentru producție, dacă e cazul
  cliConfig: {
    build: process.env.BUILDPACK,
  },
})
