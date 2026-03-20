import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const connectDB = async () => {
    let retries = 5;
    while (retries) {

        try {
            await pool.connect();
            console.log('👍Connected to the database');
        } catch (error) {
            console.log('⏳ Waiting connection...');
            retries--;
            if (retries === 0) {
                throw error;
            }
        }
    }

    throw new Error('😭Error connecting to the database');
};