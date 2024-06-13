## Prerequisites
If you don't have them already, you'll need to install Node.js/NPM and Git:
- Node.js + NPM - install [here](https://nodejs.org/en/download/package-manager) (we highly recommend using at least Node 18.0.0 + NPM 8.6.0)
   - You can choose to install via the command line under "Package Manager", or download an installer under "Prebuilt Installer"
   - Node and NPM are installed together
- Git - install [here](https://git-scm.com/downloads)
- SQLite Browser - for viewing of the db file created. https://sqlitebrowser.org/dl/

## Setup Instructions
1. Clone the repo to your computer. You can do so with 
git clone ___ 

2. Similar to the initial startup you have to run 'npm install' at the root of this project to install required packaged 

3. Run 'npm run dev' at the root of this project to start the app locally 

4. Terminate existing processes in port 4000 to ensure proper sqlite creation. 
lsof -ti:4000 | xargs kill

5. Go to directory where server.js is. Can do so using the following commands 
cd backend 
cd src 

6. Run the server to ensure creation of partners table. 
node --experimental-modules server.js

7. Can begin with Dashboard features 

8. Visit `http://localhost:3000` to view the website
    
    8a. The backend will be available at `http://localhost:4000`

## Viewing changes in the sqlite browser 
Click on the Browse Data tab and refresh. 

## High-Level Overview 
Backend: 
The Backend uses express and SQLite3. A partners table is initialized if it doesn't exist already with a few attributes. Express parses through json request bodies. Routes are created using get post and delete. Get fetches all partners, post allows for adding new partners to the database, and delete removes a partner based on their name. 

Frontend: 
States are my primary method for managing partners, new partner data, popup messages, and a flag to show more details. Many handlers are used to update the inputs, submitting data, deleting data, closing popup, and the toggle for more details. A form and the partner dashboard is rendered once there are partners added. Similarly, useState is a toggle for the flip state of the tile. Again, there are handles that are more specific to the partner tile such as handling deletion, thumnnail click, and the flip state. The Partnertile is rendered with a front side and back side with additional details. Lastly, there is a popup. Css was used to create an overlay to cover the entire page to focus the attention on the popup. Also, a close button is used to revert the page so the user can address any issues brought up. 


## Design Decisions 
The first feature I implemented was a popup. It would help direct users through the process of adding a new partner. For instance, it would tell users when a new partner was successfully added. Another important popup is if the name is repeated. There would be a duplicate partner with the same name and would result in an error. 
This is because the partner's name is a primary key in the partner table. 

 A unique id isn't used because it was an additional element that seemed unnecessary. If a company was the same, it is likely a branch with slightly modified name. For instance, Lucy's Love Bus has the practitioner Network and the Sajini Center. 

I opted to implement data persistence. This would ensure that the partner dashboard also persists. A db file is created which stores the partner table with all necessary attributes. The primary attributes are Name, Thumbnail URL, Description, and Status. This information gave a general idea of what the company, but failed to include additional details that may be necessary. It was a glaring problem because it was oversimplified. 

One major detail that I chose to also include is a link to the partner's website. If a link is provided, you could simply click the thumbnail which would then direct you to the website. Other information that may be added include contact information, other links to their social media, category and industry, etc. 

The last and final feature I implemented was an extension of the additional details. If you click on the partner tile itself it will flip to the back. The back tile would provide more information, but as of right now it only includes text saying "More Details. Work In Progress." I decided to keep the front tile simple with all of the core information. 


## A short reflection of your work 
One problem that I noticed was that although it makes sense to use objects where the key was thier name, 
an array of partner objects was better. This simplifies filtering, sorting, etc in the future because iteration  over an array can be done in react using the map method. 

In the future I would continue working on refactoring my code. I recently found a link towards a guide, but still had difficulty following it and understanding how to improve the efficiency of my code and the data structure. I hope to reduce complexity and improve future-proofing. 
https://youtu.be/SESyE3himZs?si=GMvqwwQJVTSxTEHx

There were many issues that I ran into during the course of this project. One of the biggest issues was the dependencies and propogation of events. The Partner Tile had a thumbnail click, deletion button, and also flipping the tile. I didn't understand what was causing the issue and I tried to locate the source of the the problem using console.log. I soon realized that the combination of these features could cause conflicts because it might have trouble distinguishing the events from on another. This article, 
https://blog.logrocket.com/event-bubbling-capturing-react/, helped me fix my issues. 

One issue I never really solved was the deletion of the first partner tile. There weren't any differenes in how the first partner tile is rendered or initialized. I first ensured that the click was registering in the PartnerTile.jsx and Dashbaord.jsx using the console. The delete is called, so I kept going down the hold and ensuring that now the backend was registering the event. I, again, used a console log, and it understood the delete request for the specific partner, but it still didn't delete the partner in the sql database. I ran into a dead end, where I ultimately didn't figure out the bug. 

For future ideas, I believe a toggle feature would be extremely useful to look at active partners. Tiles that active would move to the front of the dashboard and those that aren't would be moved towards the end, except they would be greyed out slightly to visually indicate inactivity. I also simplifying the page may contribute to the overall experience of just viewing the partner dashboard. I beleive that the form could be a separate entity that can popup through the click of an add partner button. The main page would just solely display partner dashboard information. 


