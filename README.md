# Team 12 Theme Park Management System Database Project

## Team Members
- Esai Hernandez
- Sunny Tran
- Andrew Vieira
- Erin Nebres
- William Lam

Website: https://www.tpmanagement.app/login

Github Repository: https://github.com/AndrewVieira/thpark

## Where is our database file and frontend code?
- Our most recent database file is in the database folder with the name thparkdb.dump (not the old_versions folder!)
- The client-side code is in the components and pages folders
- The server-side code in the server.js file and server folder

## File Descriptions
Both the client and server code are written in Javascript. While Javascript is usually a client-side language, we used a Javascript runtime environment called Node.js to run the server code in Javascript.

The server.js file is where we make our database connection and establish the routes for our project

The server/controllers files contain the functions used to query the database.

The pages folder contains the code for the webpages.

The files in the components folder contains the code/files for the layout, widgets, utilities, or resources that are used on the webpages.

The package.json file contains information about the project environment, including a list of dependencies.

## Tools Used
- PostgreSQL for our dbms (https://www.postgresql.org/)
- NodeJS a Javascript runtime for network applications (https://nodejs.org/en/)
- ReactJS a Javascript library for user interfaces (https://reactjs.org/)
- ExpressJS a JavaScript web framework for node.js (https://expressjs.com/)

## To Install and Run
1. Install PostgreSQL on your computer. Create a database called thparkdb, then import the database dump file we provided
2. Install Node.js (https://nodejs.org/en/)
3. Open command prompt, and change the directory to where you saved the repository (where the package.json file is)
4. Enter "npm install" in the command prompt where the directory the project is to automatically install all packages required
5. Enter "npm install -g nodemon", the nodemon package is required to run the project on the localhost
6. Open the server.js file, starting on line 43, type in your credentials for your localhost database.
The code should look something like this:
```
const cn = {
	host: 'localhost',
	port: 5432,
	database: 'thparkdb',
	user: 'postgres',
	password: 'ezpasswrd123'
};
```
7. To run, in the directory where the server.js file is, enter the command "nodemon server.js" in the command prompt
This command will run the project in development mode. Pages load slowly while in development mode. Wait for the command prompt to say "Server is ready on port: 3000"
8. Visit http://localhost:3000 to see the project
