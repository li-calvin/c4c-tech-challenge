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


// import express from 'express';
// import sqlite3 from 'sqlite3'; 

// const app = express();
// const port = 4000;

// // Initialize the database
// const db = new sqlite3.Database('./partners.db', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });

// // Create the partners table
// db.run(`CREATE TABLE partners (
//   name text PRIMARY KEY,
//   thumbnailUrl text,
//   description text,
//   status text,
//   website text
// )`, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Partners table created.');
// });

// // Some partner data can't be a constant 
// // let partners = {
// //   "Speak For The Trees": {
// //     "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
// //     "name": "Speak For The Trees",
// //     "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
// //     "status": "Active", 
// //     "website": "https://treeboston.org"
// //   },
// // }

// /* 
//   APPLICATION MIDDLEWARE
//   This section contains some server configuration.
//   You will likely not need to change anything here to meet the requirements.
//   (but you are welcome to, if you'd like)
// */

// // Parse request bodies as JSON
// app.use(express.json())
// // Enable CORS for the frontend so it can call the backend
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//   next();
// })

// /*
//   APPLICATION ROUTES
// */
// // Get all partners
// app.get('/', (req, res) => {
//   db.all('SELECT * FROM partners', [], (err, rows) => {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     res.status(200).send(rows);
//   });
// })

// // Add a new partner
// app.post('/add-partner', (req, res) => {
//   const newPartner = req.body;
//   db.run('INSERT INTO partners(name, thumbnailUrl, description, status, website) VALUES(?, ?, ?, ?, ?)', [newPartner.name, newPartner.thumbnailUrl, newPartner.description, newPartner.status, newPartner.website], function(err) {
//     if (err) {
//       return res.status(409).send(err.message);
//     }
//     res.status(201).send(newPartner);
//   });
// })

// // Delete a partner
// app.delete('/delete-partner/:partnerName', (req, res) => {
//   const partnerName = req.params.partnerName;
//   console.log(`Delete request for partner: ${partnerName}`); // Add this line

//   db.run('DELETE FROM partners WHERE name = ?', [partnerName], function(err) {
//     if (err) {
//       console.log(`Error deleting partner: ${err.message}`); // Add this line
//       return res.status(404).send(err.message);
//     }
//     console.log('Delete was successful')
//     res.status(200).send({ message: `Partner ${partnerName} deleted successfully` });
//   });
// });
// // Start the backend
// app.listen(port, () => {
//   console.log(`Express server starting on port ${port}!`);
// })








// ------------------------------------------- 11th 
// import express from 'express';
// import sqlite3 from 'sqlite3'; 

// const app = express();
// const port = 4000;

// // Initialize the database
// const db = new sqlite3.Database('./partners.db', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });

// // Create the partners table
// db.run(`CREATE TABLE partners (
//   name text PRIMARY KEY,
//   thumbnailUrl text,
//   description text,
//   status text
// )`, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Partners table created.');
// });

// // Some partner data can't be a constant 
// let partners = {
//   "sftt": {
//     "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
//     "name": "Speak For The Trees",
//     "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
//     "status": "Active"
//   },
// }

// /* 
//   APPLICATION MIDDLEWARE
//   This section contains some server configuration.
//   You will likely not need to change anything here to meet the requirements.
//   (but you are welcome to, if you'd like)
// */

// // Parse request bodies as JSON
// app.use(express.json())
// // Enable CORS for the frontend so it can call the backend
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//   next();
// })

// /*
//   APPLICATION ROUTES
// */
// // Get all partners
// app.get('/', (req, res) => {
//   db.all('SELECT * FROM partners', [], (err, rows) => {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     res.status(200).send(rows);
//   });
// })

// // Add a new partner
// app.post('/add-partner', (req, res) => {
//   const newPartner = req.body;
//   db.run('INSERT INTO partners(name, thumbnailUrl, description, status) VALUES(?, ?, ?, ?)', [newPartner.name, newPartner.thumbnailUrl, newPartner.description, newPartner.status], function(err) {
//     if (err) {
//       return res.status(409).send(err.message);
//     }
//     res.status(201).send(newPartner);
//   });
// })

// // Delete a partner
// app.delete('/delete-partner/:partnerName', (req, res) => {
//   const partnerName = req.params.partnerName;
//   db.run('DELETE FROM partners WHERE name = ?', partnerName, function(err) {
//     if (err) {
//       return res.status(404).send(err.message);
//     }
//     res.status(200).send({ message: `Partner ${partnerName} deleted successfully` });
//   });
// });
// // Start the backend
// app.listen(port, () => {
//   console.log(`Express server starting on port ${port}!`);
// })













//----------------------------------------- 

// import express from 'express';

// const app = express();
// const port = 4000;

// // Some partner data
// const partners = {
//   "sftt": {
//     "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
//     "name": "Speak For The Trees",
//     "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
//     "status": "Active"
//   }
// }
// /* 
//   APPLICATION MIDDLEWARE
//   This section contains some server configuration.
//   You will likely not need to change anything here to meet the requirements.
//   (but you are welcome to, if you'd like)
// */

// // Parse request bodies as JSON
// app.use(express.json())
// // Enable CORS for the frontend so it can call the backend
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//   next();
// })

// /*
//   APPLICATION ROUTES
// */

// app.get('/', (req, res) => {
//   res.status(200).send(partners);
// })


// // what i added 
// // app.post('/add', (req, res) => {
// //   const newPartner = req.body;
// //   if (!newPartner.id) {
// //     return res.status(400).send({ error: 'Partner ID is required' });
// //   }
// //   partners[newPartner.id] = newPartner;
// //   res.status(201).send(newPartner);
// // });
// app.post('/add', (req, res) => {
//   const newPartner = req.body;
//   if (!newPartner.name) {
//     return res.status(400).send({ error: 'Partner name is required' });
//   }
  
//   // Check if a partner with the same name already exists
//   const existingPartner = Object.values(partners).find(partner => partner.name === newPartner.name);
//   if (existingPartner) {
//     return res.status(400).send({ error: 'Partner with the same name already exists' });
//   }

//   // Generate partner ID based on the first initials of the name
//   const partnerId = newPartner.name.trim().split(' ').map(word => word.charAt(0)).join('').toLowerCase();
  
//   // Assign the generated ID to the new partner
//   newPartner.id = partnerId;
  
//   // Add the new partner to the partners object
//   partners[partnerId] = newPartner;
//   console.log(partners);
//   res.status(201).send(newPartner);
// });


// app.delete('/delete/:id', (req, res) => {
//   const partnerId = req.params.id;
//   if (!partners[partnerId]) {
//     return res.status(404).send({ error: 'Partner not found' });
//   }
//   delete partners[partnerId];
//   res.status(200).send({ message: 'Partner deleted successfully' });
// });

// // Start the backend
// app.listen(port, () => {
//   console.log(`Express server starting on port ${port}!`);
// })