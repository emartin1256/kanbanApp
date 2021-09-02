# Kanban App

- Overview
- Technologies
- Create, Read, Update & Delete (CRUD)

## Overview

This is a kanban board style project management app. With the ability to create new tasks and organise them into columns of your choice, you can keep on top of what needs to be done. Once a task is complete you can simply create a "done" column and drag and drop the task. You can also delete tasks as you see fit using the "x" button shown on each task card. This project is a great example of CRUD operations in a sleek, easy-to-use app.

## Technologies

This interface was built using React and more specifically the react-beautiful-dnd library. The tasks are stored in an SQLite database, using the Django REST Framework to make queries. The Django queries are triggered by the React interface via Axios, with the ability to Create, Read, Update and Delete.

![](https://github.com/emartin1256/kanbanApp/blob/main/screenshots/drag.gif)

## Create, Read, Update & Delete (CRUD)

The tasks are stored as JSON objects with the following properties: id, title, status and date. The id is used to index and fetch the tasks, title is the user inputted task name, status is the column the task belongs to and date is a due date feature I will be working to add to the app.

### Create
Tasks are created when a user fills out the text field in a column. Upon submitting that task, axios sends an HTTP request to our REST api and triggers a POST query.
### Read
Once the user opens the app, axios triggers a GET query, which returns an array of JSON objects which are then iterated through and rendered as task cards on the board.
### Update
When a user drags a task card to another column, the status property of the JSON object must be updated to reflect this. Axios sends an HTTP request to our REST api and triggers a PUT query stating the new status.
### Delete
Each task card is also rendered with a delete button which has an onClick function to trigger a DELETE query.

![](https://github.com/emartin1256/kanbanApp/blob/main/screenshots/add.gif)
