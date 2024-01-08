import pool from 'utils/db/db.js'; 

export default function handler(req, res) {
  const {
    query: { slug },
  } = req;

  pool.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({ success: false, data: err });
    }
    client.query('SELECT * FROM your_table WHERE slug = $1', [slug], (err, result) => {
      done();
      if (err) {
        return res.status(500).json({ success: false, data: err });
      }
      return res.status(200).json({ success: true, data: result.rows });
    });
  });
}
