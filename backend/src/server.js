import express from 'express';
import sqlite3 from 'sqlite3'; 

const app = express();
const port = 4000;

// Initialize the database
const db = new sqlite3.Database('./partners.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create the partners table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS partners (
  name text PRIMARY KEY,
  thumbnailUrl text,
  description text,
  status text,
  website text
)`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Partners table ensured.');
});

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/
// Get all partners
app.get('/', (req, res) => {
  db.all('SELECT * FROM partners', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(rows);
  });
})

// Add a new partner
app.post('/add-partner', (req, res) => {
  const newPartner = req.body;
  db.run('INSERT INTO partners(name, thumbnailUrl, description, status, website) VALUES(?, ?, ?, ?, ?)', [newPartner.name, newPartner.thumbnailUrl, newPartner.description, newPartner.status, newPartner.website], function(err) {
    if (err) {
      return res.status(409).send(err.message);
    }
    res.status(201).send(newPartner);
  });
})

// Delete a partner
app.delete('/delete-partner/:partnerName', (req, res) => {
  const partnerName = req.params.partnerName;
  console.log(`Delete request for partner: ${partnerName}`); 

  db.run('DELETE FROM partners WHERE name = ?', [partnerName], function(err) {
    if (err) {
      console.log(`Error deleting partner: ${err.message}`);
      return res.status(404).send(err.message);
    }
    console.log('Delete was successful')
    res.status(200).send({ message: `Partner ${partnerName} deleted successfully` });
  });
});

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})

