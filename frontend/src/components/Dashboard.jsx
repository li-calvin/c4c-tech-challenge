import React, { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import Popup from './Popup'; 


function Dashboard() {
  const [partners, setPartners] = useState({});
  const [newPartner, setNewPartner] = useState({
    thumbnailUrl: '',
    name: '',
    status: 'Active',
    description: '', 
    website: ''
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [showMoreDetails, setShowMoreDetails] = useState(false); // Flag to control visibility of additional details

  useEffect(() => {
    // Load all partners on initial page load 
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => setPartners(data))
    .catch((error) => console.error('Error fetching partners:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartner({ ...newPartner, [name]: value });
  };

  const handleSubmit = () => {
    // Check if name field is empty
    if (!newPartner.name.trim()) {
      setPopupMessage('Please enter a name.');
      return; // Prevent form submission
    }
    // Send new partner data to the server
    fetch('http://localhost:4000/add-partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartner),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to add partner. Partner may exist.');
      }
      return res.json();
    })
    .then((data) => {
      // Update partners state with the new partner
      setPartners({ ...partners, [data.name]: data });
      setPopupMessage('Partner added successfully');
      // Reset newPartner state
      setNewPartner({
        thumbnailUrl: '',
        name: '',
        status: 'Active',
        description: '', 
        website: ''
      });
      setShowMoreDetails(false); // Hide additional details after successful submission
    })
    .catch((error) => {
      setPopupMessage(error.message || 'Error adding partner');
    });
    //.catch((error) => console.error('Error adding partner:', error));
  };
  
  const handleDelete = (partnerName) => {
    console.log('Delete called for:', partnerName); // Debugging log

    // Send DELETE request to server
    fetch(`http://localhost:4000/delete-partner/${partnerName}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update partners state to remove the deleted partner
        const updatedPartners = { ...partners };
        delete updatedPartners[partnerName];
        setPartners(updatedPartners);
      })
      .catch((error) => console.error('Error deleting partner:', error));
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  const toggleMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  return (
    <div id="main-content">
      <div id="form-group">
        {/* Form for adding new partner */}
        <div className="add-partner-form">
          <h2>Add New Partner</h2>

          <div className='form-field'>
          <label> Name </label>
          <textarea
            type="text"
            name="name"
            placeholder="e.x. John Doe (required)"
            value={newPartner.name}
            onChange={handleInputChange}
            required // Make the name field required based on our design logic 
          />
          </div>

          <div className='form-field'>
          <label>
            Thumbnail
            </label>
          <textarea
            type="text"
            name="thumbnailUrl"
            placeholder="Thumbnail URL (optional)"
            value={newPartner.thumbnailUrl}
            onChange={handleInputChange}
          />
          </div>

          <div className='form-field'>
          <label> 
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={newPartner.description}
            onChange={handleInputChange}
          />
          </div>

          <div className='form-field'>
          <label> Status</label>
          <select
            name="status"
            value={newPartner.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          </div>

            {/* Link to toggle visibility of additional details */}
            <div className='form-field'>
            <a href="#" onClick={toggleMoreDetails}>
              {showMoreDetails ? 'Hide More Details' : 'More Details'}
            </a>
          </div>

          {/* Additional details fields */}
          {showMoreDetails && (
            <div className='form-field'>
              <label> Website </label>
              <textarea
                type="text"
                name="website"
                placeholder="Company Website (optional)"
                value={newPartner.website}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className='form-field'>
          <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      
      <h2> Partner Dashboard </h2>
      <div id='main-partners-grid'>
      {/* Display existing partners */}
      {Object.values(partners).map((partner, index) => (
          <PartnerTile key={index} partnerData={partner} onDelete={handleDelete} />
        ))}
      </div>

      {/* Modal overlay for displaying error messages */}
      {popupMessage && (
        <Popup onClose={closePopup}>
          <p>{popupMessage}</p>
        </Popup>
      )}
    </div>
  );
}

export default Dashboard;






// ----------------------------- 11th 
// import React, { useState, useEffect } from 'react';
// import PartnerTile from './PartnerTile';
// import Popup from './Popup'; // Import the Modal component


// function Dashboard() {
//   const [partners, setPartners] = useState({});
//   const [newPartner, setNewPartner] = useState({
//     thumbnailUrl: '',
//     name: '',
//     status: 'Active',
//     description: ''
//   });
//   const [popupMessage, setPopupMessage] = useState('');

//   useEffect(() => {
//     // Load all partners on initial page load 
//     fetch('http://localhost:4000', {
//       method: 'GET',
//     })
//     .then((res) => res.json())
//     .then((data) => setPartners(data))
//     .catch((error) => console.error('Error fetching partners:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPartner({ ...newPartner, [name]: value });
//   };

//   const handleSubmit = () => {
//     // Check if name field is empty
//     if (!newPartner.name.trim()) {
//       setPopupMessage('Please enter a name.');
//       return; // Prevent form submission
//     }
//     // Send new partner data to the server
//     fetch('http://localhost:4000/add-partner', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newPartner),
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Failed to add partner. Partner may exist.');
//       }
//       return res.json();
//     })
//     .then((data) => {
//       // Update partners state with the new partner
//       setPartners({ ...partners, [data.name]: data });
//       setPopupMessage('Partner added successfully');
//       // Reset newPartner state
//       setNewPartner({
//         thumbnailUrl: '',
//         name: '',
//         status: 'Active',
//         description: ''
//       });
//     })
//     .catch((error) => {
//       setPopupMessage(error.message || 'Error adding partner');
//     });
//     //.catch((error) => console.error('Error adding partner:', error));
//   };
  
//   const handleDelete = (partnerName) => {
//     // Send DELETE request to server
//     fetch(`http://localhost:4000/delete-partner/${partnerName}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         // Update partners state to remove the deleted partner
//         const updatedPartners = { ...partners };
//         delete updatedPartners[partnerName];
//         setPartners(updatedPartners);
//       })
//       .catch((error) => console.error('Error deleting partner:', error));
//   };

//   const closePopup = () => {
//     setPopupMessage('');
//   };

//   return (
//     <div id="main-content">
//       <div id="form-group">
//         {/* Form for adding new partner */}
//         <div className="add-partner-form">
//           <h2>Add New Partner</h2>

//           <div className='form-field'>
//           <label> Name </label>
//           <textarea
//             type="text"
//             name="name"
//             placeholder="e.x. John Doe (required)"
//             value={newPartner.name}
//             onChange={handleInputChange}
//             required // Make the name field required based on our design logic 
//           />
//           </div>

//           <div className='form-field'>
//           <label>
//             Thumbnail
//             </label>
//           <textarea
//             type="text"
//             name="thumbnailUrl"
//             placeholder="Thumbnail URL (optional)"
//             value={newPartner.thumbnailUrl}
//             onChange={handleInputChange}
//           />
//           </div>

//           <div className='form-field'>
//           <label> 
//             Description
//           </label>
//           <textarea
//             name="description"
//             placeholder="Description (optional)"
//             value={newPartner.description}
//             onChange={handleInputChange}
//           />
//           </div>

//           <div className='form-field'>
//           <label> Status</label>
//           <select
//             name="status"
//             value={newPartner.status}
//             onChange={handleInputChange}
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           </div>

//           <div className='form-field'>
//           <button onClick={handleSubmit}>Submit</button>
//           </div>
//         </div>
//       </div>
      
//       <h2> Partner Dashboard </h2>
//       <div id='main-partners-grid'>
//       {/* Display existing partners */}
//       {Object.values(partners).map((partner, index) => (
//           <PartnerTile key={index} partnerData={partner} onDelete={handleDelete} />
//         ))}
//       </div>

//       {/* Modal overlay for displaying error messages */}
//       {popupMessage && (
//         <Popup onClose={closePopup}>
//           <p>{popupMessage}</p>
//         </Popup>
//       )}
//     </div>
//   );
// }

// export default Dashboard;












// import React, { useState, useEffect } from 'react';
// import PartnerTile from './PartnerTile';
// import Popup from './Popup'; // Import the Modal component

// function Dashboard() {
//   const [partners, setPartners] = useState({});
//   const [newPartner, setNewPartner] = useState({
//     name: '',
//     thumbnailUrl: '',
//     description: '',
//     active: false
//   });
//   const [popupMessage, setPopupMessage] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:4000')
//       .then((res) => res.json())
//       .then((data) => setPartners(data))
//       .catch((error) => console.error('Error fetching partner data:', error));
//   }, []);

//   const handleAddPartner = () => {
//     fetch('http://localhost:4000/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newPartner)
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to add partner. Partner may exist.');
//         }
//         return res.json();
//       })

//       .then((data) => {
//         setPartners(prevPartners => {
//           const newPartners = { ...prevPartners, [data.id]: data };
//           console.log(newPartners); // Log the new state
//           return newPartners;
//         });
//         setNewPartner({
//           name: '',
//           thumbnailUrl: '',
//           description: '',
//           active: false
//         });
//         setPopupMessage('Partner added successfully');
//       })
//       // .then((data) => {
//       //   setPartners(prevPartners => ({ ...prevPartners, [data.id]: data }));
//       //   setNewPartner({
//       //     name: '',
//       //     thumbnailUrl: '',
//       //     description: '',
//       //     active: false
//       //   });
//       //   setPopupMessage('Partner added successfully');
//       // })
//       .catch((error) => {
//         setPopupMessage(error.message || 'Error adding partner');
//       });
//   };

//   const handleDeletePartner = (id) => {
//     fetch(`http://localhost:4000/delete/${id}`, {
//       method: 'DELETE',
//     })
//       .then((res) => res.json())
//       .then(() => {
//         const updatedPartners = { ...partners };
//         delete updatedPartners[id];
//         setPartners(updatedPartners);
//       })
//       .catch((error) => console.error('Error deleting partner:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPartner(prevPartner => ({ ...prevPartner, [name]: value }));
//   };

//   const closePopup = () => {
//     setPopupMessage('');
//   };

//   return (
//     <div id="main-content">
//       <h2>Add New Partner</h2>
//       <div className='form-group'>
//         <div className='form-row'>
//           <label>Name</label>
//           <input type="text" name="name" placeholder="Name" value={newPartner.name} onChange={handleInputChange} />
//         </div>
//         <div className='form-row'>
//           <label>Thumbnail URL</label>
//           <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL" value={newPartner.thumbnailUrl} onChange={handleInputChange} />
//         </div>
        
//         <div className='form-row'>
//           <label>Description</label>
//           <textarea name="description" placeholder="Description" value={newPartner.description} onChange={handleInputChange} rows="1" cols="50" />
//         </div>

//         <div className='form-row'>
//           <label>Active</label>
//           <input type="checkbox" name="active" checked={newPartner.active} onChange={(e) => setNewPartner(prevPartner => ({ ...prevPartner, active: e.target.checked }))} />
//         </div>
//         <div className='form-row'>
//           <button onClick={handleAddPartner}>Add Partner</button>
//         </div>
//       </div>
//       <h2>Partners Dashboard</h2>
//       <div id="main-partners-grid">
//         {Object.keys(partners).map((key) => (
//           <PartnerTile
//             key={key}
//             partnerData={partners[key]}
//             onDelete={() => handleDeletePartner(key)}
//           />
//         ))}
//       </div>
//       {/* Modal overlay for displaying error messages */}
//       {popupMessage && (
//         <Popup onClose={closePopup}>
//           <p>{popupMessage}</p>
//         </Popup>
//       )}
//     </div>
//   );
// }

// export default Dashboard;







// import React, { useState, useEffect } from 'react';
// import PartnerTile from './PartnerTile';

// /*
//   The top-level component containing everything relevant to the dashboard,
//   including information on each partner
// */

// function Dashboard() {
//   const [partners, setPartners] = useState({});
//   const [newPartner, setNewPartner] = useState({
//     name: '',
//     thumbnailUrl: '',
//     description: '',
//     active: false
//   });

//   useEffect(() => {
//     fetch('http://localhost:4000')
//       .then((res) => res.json())
//       .then((data) => setPartners(data))
//       .catch((error) => console.error('Error fetching partner data:', error));
//   }, []);

//   const handleAddPartner = () => {
//     fetch('http://localhost:4000/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newPartner)
//     })
//       .then((res) => res.json())
//       .then((data) => setPartners(prevPartners => ({ ...prevPartners, [data.id]: data })))
//       .catch((error) => console.error('Error adding partner:', error));
//   };

//   const handleDeletePartner = (id) => {
//     fetch(`http://localhost:4000/delete/${id}`, {
//       method: 'DELETE',
//     })
//       .then((res) => res.json())
//       .then(() => {
//         const updatedPartners = { ...partners };
//         delete updatedPartners[id];
//         setPartners(updatedPartners);
//       })
//       .catch((error) => console.error('Error deleting partner:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPartner(prevPartner => ({ ...prevPartner, [name]: value }));
//   };

//   return (
//     <div id="main-content">
//       <h2>Add New Partner</h2>
//       <div className='form-group'>
//         <div className='form-row'>
//           <label>Name</label>
//           <input type="text" name="name" placeholder="Name" value={newPartner.name} onChange={handleInputChange} />
//         </div>
//         <div className='form-row'>
//           <label>Thumbnail URL</label>
//           <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL" value={newPartner.thumbnailUrl} onChange={handleInputChange} />
//         </div>
        
//         <div className='form-row'>
//           <label>Description</label>
//           <textarea name="description" placeholder="Description" value={newPartner.description} onChange={handleInputChange} rows="1" cols="50" />
//         </div>

//         <div className='form-row'>
//           <label>Active</label>
//           <input type="checkbox" name="active" checked={newPartner.active} onChange={(e) => setNewPartner(prevPartner => ({ ...prevPartner, active: e.target.checked }))} />
//         </div>
//         <div className='form-row'>
//           <button onClick={handleAddPartner}>Add Partner</button>
//         </div>
//       </div>
//       <h2>Partners Dashboard</h2>
//       <div id="main-partners-grid">
//         {Object.keys(partners).map((key) => (
//           <PartnerTile
//             key={key}
//             partnerData={partners[key]}
//             onDelete={() => handleDeletePartner(key)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

//WORKING 


// import React, { useState, useEffect } from 'react';
// import PartnerTile from './PartnerTile';
// import Popup from './Popup'; // Import the Modal component

// /*
//   The top-level component containing everything relevant to the dashboard,
//   including information on each partner
// */

// function Dashboard() {
//   const [partners, setPartners] = useState({});
//   const [newPartner, setNewPartner] = useState({
//     name: '',
//     thumbnailUrl: '',
//     description: '',
//     active: false
//   });
//   const [popupMessage, setPopupMessage] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:4000')
//       .then((res) => res.json())
//       .then((data) => setPartners(data))
//       .catch((error) => console.error('Error fetching partner data:', error));
//   }, []);

//   // const handleAddPartner = () => {
//   //   fetch('http://localhost:4000/add', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify(newPartner)
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => setPartners(prevPartners => ({ ...prevPartners, [data.id]: data })))
//   //     .catch((error) => console.error('Error adding partner:', error));
//   // };

//   const handleAddPartner = () => {
//     // Fetch the list of partners
//     fetch('http://localhost:4000')
//       .then((res) => res.json())
//       .then((partnersData) => {
//         // Check if a partner with the same name already exists
//         const existingPartner = Object.values(partnersData).find(partner => partner.name === newPartner.name);
//         if (existingPartner) {
//           // If a partner with the same name exists, show a popup message
//           setPopupMessage('A partner with the same name already exists.');
//         } else {
//           // If no partner with the same name exists, proceed to add the new partner
//           fetch('http://localhost:4000/add', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newPartner)
//           })
//             .then((res) => {
//               if (!res.ok) {
//                 throw new Error('Failed to add partner.');
//               }
//               return res.json();
//             })
//             .then((data) => {
//               // Update partners list with the response data
//               setPartners(prevPartners => ({ ...prevPartners, [data.name]: data }));
//               // Reset newPartner state
//               setNewPartner({
//                 name: '',
//                 thumbnailUrl: '',
//                 description: '',
//                 active: false
//               });
//               // Set success popup message
//               setPopupMessage('Partner added successfully.');
//             })
//             .catch((error) => {
//               // Set error popup message
//               setPopupMessage('Error adding partner: ' + error.message);
//             });
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching partners data:', error);
//       });
//   };
  

//   const handleDeletePartner = (id) => {
//     fetch(`http://localhost:4000/delete/${id}`, {
//       method: 'DELETE',
//     })
//       .then((res) => res.json())
//       .then(() => {
//         const updatedPartners = { ...partners };
//         delete updatedPartners[id];
//         setPartners(updatedPartners);
//       })
//       .catch((error) => console.error('Error deleting partner:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPartner(prevPartner => ({ ...prevPartner, [name]: value }));
//   };

//   return (
//     <div id="main-content">
//       <h2>Add New Partner</h2>
//       <div className='form-group'>
//         <input type="text" name="name" placeholder="Name" value={newPartner.name} onChange={handleInputChange} />
//         <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL" value={newPartner.thumbnailUrl} onChange={handleInputChange} />
//         <label>
//           Active:
//           <input type="checkbox" name="active" checked={newPartner.active} onChange={(e) => setNewPartner(prevPartner => ({ ...prevPartner, active: e.target.checked }))} />
//         </label>
//         <textarea name="description" placeholder="Description" value={newPartner.description} onChange={handleInputChange} rows="1" cols="50" />
//         <button onClick={handleAddPartner}>Add Partner</button>
//       </div>

//       <h2>Partners Dashboard</h2>
//       <div id="main-partners-grid">
//         {Object.keys(partners).map((key) => (
//           <PartnerTile
//             key={key}
//             partnerData={partners[key]}
//             onDelete={() => handleDeletePartner(key)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


