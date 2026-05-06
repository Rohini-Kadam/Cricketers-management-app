Cricketer Management App

A simple CRUD application built with React for managing cricketer records using a mock REST API.

Tech Stack

* React (Vite)
* Axios
* Bootstrap
* JSON Server

Setup:

git clone https://github.com/your-username/cricketer-management-react.git
cd cricketer-management-react
npm install
npm run dev

Backend (JSON Server):

npm install -g json-server

Create db.json:
{
  "cricketers": []
}

Run server:
json-server --watch db.json --port 4000

API:
* GET /cricketers
* POST /cricketers
* PUT /cricketers/:id
* DELETE /cricketers/:id

