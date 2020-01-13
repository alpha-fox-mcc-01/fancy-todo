# fancy-todo


**GET TODOS **
----
root URL = localhost:3000

* **URL**
/todo
* **METHOD**
`GET`

* **Success Response**
* **Code:** 200 <br />
* **Content:** `[{
  _id: ObjectId,
name: "Learning Vue Js",
description: "In Week 2",
due_date: "2020-01-13",
UserId: ObjectId Ref: 'User'
}]`

* **Error Response**
* **Code:** 500 <br />
* **Content :** `{error : Internal Server Error}`



**GET TODO BASED ON USER  **
----
* **URL**
/todo/:id
* **METHOD**
aku `GET`

*  **URL Params**
  **Required:**

  `id=[integer]`

* **Success Response**
* **Code:** 200 <br />
* **Content:** `[]`

* **Error Response**
* **Code :** 500 <br />
* **Content :** `{error : Internal Server Error}`

**CREATE NEW TODO**
* **URL**
/todo
* **METHOD**
`POST`

*  **Data Params**

  `title : '',
  description : '',
   due_date: ",
    status : "
   UserId: ",

`

* **Success Response**
* **Code:** 201 <br />
* **Content:** `{message : 'To-do successfully created'}`

* **Error Response**
* **Code:** 500 <br />
* **Content :** `{message: 'Failed to create'}`


** DELETE TODO**
* **URL**
/todo/:id
* **METHOD**
`DELETE`

*  **URL Params**
  **Required:**

  `id=[integer]`



* **Success Response**
* **Code:** 200 <br />
* **Content:** `{message : 'Delete success'}`

* **Error Response**
* **Code:** 500 <br />
* **Content :** `{message: 'Failed to delete'}`


** EDIT TODO STATUS**
* **URL**
/todo/:id
* **METHOD**
`PATCH`

*  **URL Params**
  **Required:**

  `id=[integer]`

*  **Data Params**

  '
    status: "

`

* **Success Response**
* **Code:** 200 <br />
* **Content:** `{message : 'Successfully edited'}`

* **Error Response**
* **Code:** 500 <br />
* **Content :** `{message: 'Edit failed'}`


** REGISTER USER**
* **URL**
/user
* **METHOD**
`POST`

*  **Data Params**

  '
    username: "
    email: "
    password: "

`

* **Success Response**
* **Code:** 201 <br />
* **Content:** `{message : 'Successfully registered'}`

* **Error Response**
* **Code:** 500 <br />
* **Content :** `{message: 'Registration failed'}`


** LOGIN USER**
* **URL**
/user/login
* **METHOD**
`POST`

*  **Data Params**

  `
    email:  "
    password: "

`

* **Success Response**
* **Code:** 200 <br />
* **Content:** `{message : 'Login Successful'}`

* **Error Response**
* **Code:** 403<br />
* **Content :** `{message: 'Username/Password wrong'}`


** GOOGLE SIGN IN**
* **URL**
/user/google-sign-in
* **METHOD**
`POST`

*  **Data Params**

  `
    email:  "
    password: "

`

* **Success Response**
* **Code:** 200 <br />
* **Content:** `{message : 'Login Successful'}`

* **Error Response**
* **Code:** 403<br />
* **Content :** `{message: 'Username/Password wrong'}`



