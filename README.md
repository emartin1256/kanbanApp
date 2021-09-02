# Kanban App

##Overview

This is a kanban board style project management app. With the ability to create new tasks and organise them into columns of your choice, you can keep on top of what needs to be done. Once a task is complete you can simply create a "done" column and drag and drop the task. You can also delete tasks as you see fit using the "x" button shown on each task card.

This interface was built using React and more specifically the react-beautiful-dnd library. The tasks are stored in an SQLite database, using the Django REST Framework to make queries. The Django queries are triggered by the React interface via Axios, with the ability to Create, Read, Update and Delete.

![](https://github.com/emartin1256/kanbanApp/blob/main/screenshots/drag.gif)
