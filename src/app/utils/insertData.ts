import { NextApiRequest, NextApiResponse } from 'next';
import { Pool, PoolClient } from 'pg';

export default async function insertData(req: NextApiRequest, res: NextApiResponse) {
    const pool = new Pool({
        user: 'postgres.jypydoyxtebiafznuvea',
        host: 'aws-0-us-west-1.pooler.supabase.com',
        database: 'postgres',
        password: 'M4JwF0ajEqRutxAf',
        port: 5432, // or your PostgreSQL port
      });

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // Assuming you have a table called "your_table_name"
    await client.query('INSERT INTO your_table_name (column1, column2) VALUES ($1, $2)', [req.body.column1, req.body.column2]);

    await client.query('COMMIT');
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (e) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Error inserting data:', e);
    res.status(500).json({ message: 'Failed to insert data' });
  } finally {
    if (client) {
      client.release();
    }
  }
}