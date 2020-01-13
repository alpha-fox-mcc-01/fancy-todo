# FANCY-TODO API
berikut list API yang tersedia di Fancy-Todo 

### USERS API
Registrasi / Sign-up new user:
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Public | POST | /users | email, password, fullname | createdUser

\
Login / Sign-in:
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Public | POST | /users | email, password | access_token

\
Change Password:
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | PATCH | /users | currentPassword, newPassword | -

\
Deactivate / remove account:
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | DELETE | /users | - | msg: Account deactivated

\
Fetch current user's todo
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | GET | /users/todos | - | array of Todos

&nbsp;
---
### TODO API
Create new Todo
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | POST | /todos | follow Todo model | [createdTodo, updateResult]
parameters: userId, title, descriptions, priority, category, isShoppingList, isDone

Update new Todo
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | PUT | /todos | follow Todo model | [createdTodo, updateResult]
parameters: userId, title, descriptions, priority, category, isShoppingList, isDone

Check / unCheck Todo
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | PATCH | /todos | todoId | msg: check or un checked status

Remove Todo
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Private | DELETE | /todos | todoId | msg: check or un checked status
