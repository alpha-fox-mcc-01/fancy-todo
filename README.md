# fancy-todo

## ROUTING
-Base Route : http://localhost:3000

| HTTP Method        | route           | Controller           |
| :-----------------:|:---------------:| --------------------:|
| GET                | /               | INDEX                |
| -----------------  | --------------- | -------------------- |
| POST               | /todos          |  Todo.create         |
| GET                | /todos          |   Todo.showAll       |
| PUT                | /todos          |  Todo.update         |
| PATCH              | /todos          |   Todo.updateStatus  |
| DELETE             | /todos          |   Todo.delete        |
| -----------------  | --------------- | -------------------- |
| POST               | /user/register  | User.register        |
| POST               | /user/login     | User.login           |
| POST               | /user/google-sign|User.googleSign      |
| PATCH              | /user           | Todo.changePassword  |
| DELETE             | /user           | Todo.deleteUser      | 