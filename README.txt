This project consists of a postgresql database and a nodejs backend, as well as an angular frontend.

These are the versions of the software I am using to compile the application:
Angular:     9.0.7
Nodejs:      12.16.1
PostgreSQL:  12.1

To run the project follow the following steps:

1) Run the create-and-populate-db.sql script by running the following command:

psql -U postgres -f create-and-populate-db.sql

2) In the backend-app directory run the following command to install all required dependancies:

npm install

3) In the backend-app directory run the following command to start the backend app:

node app.js

4) In the frontend-app/YoutubeSocial directory run the following command to install all required dependancies:

npm install

3) In the frontend-app/YoutubeSocial directory run the following command to start the frontend app:

ng serve

4) The frontend app is now running on localhost:4200 and can be accessed through a browser window.



NOTE) When connecting to the database the app makes the following assumptions: (these can be changed in repo.js if required)

	1) The database is setup for the 'postgres' user
	2) The password for the postgres user is 'admin'
	3) The port postgres is running on is the default postgres port: 5432