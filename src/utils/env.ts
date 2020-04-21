import dotenv from 'dotenv';

dotenv.config();

const env = {
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),
  
  dbClient: process.env.DB_CLIENT || 'mysql2',
  dbPort: parseInt(process.env.DB_PORT || '', 10),
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbSchema: process.env.DB_SCHEMA,
  dbDebug: process.env.DB_DEBUG === 'true'
};

export default env;