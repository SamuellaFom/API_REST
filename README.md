# API_REST

### Introduction
In this project, you will find a REST API that allows you to justify a text.

### Characteristics 
  * the user must be authenticated to be able to make the requests.
  * the authentication token retrieves the number of words passed in the request.

### Installation Guide
  * Clone this repository https://github.com/SamuellaFom/API_REST.git.
  * Run ``npm install`` to install all dependencies
  * Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

### Use
  * Run ```npm run dev``` to start the application.
  * Connect to the API using Postman on port 4242.

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/justify | To return a justified text |
| POST | /api/token | To returns a token |

### Technologies Used
  * NodeJS, This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for   installation and managing of dependencies and communication with databases.
  * ExpressJS, This is a NodeJS web application framework.  