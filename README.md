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
| Public | GET | /users | email, password | access_token

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


&nbsp;
---
### TODO API
Create new Todo (masih public)
| Access Type	| Request | URL | Params | Response
|-|-|-|-|-
| Public | POST | /users | email, password |access_token