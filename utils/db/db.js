import { Pool } from 'pg';

// Создание пула подключений к PostgreSQL
const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

// Выполнение SQL-запроса
async function executeQuery(queryText, params = []) {
  try {
    const client = await pool.connect();

    // Выполнение SQL-запроса
    const result = await client.query(queryText, params);

    client.release();
    return result.rows;
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    throw error;
  }
}

export default executeQuery;
