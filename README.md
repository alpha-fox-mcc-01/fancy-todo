# FANCY TODO #
### REST API built with Express, MongoDB, Mongoose, and Google Login ###
---

### **List of Todo Routes** ###
| Route               |  HTTP  |  Header(s)   | Body                                       | Description                 |
| ------------------- | :----: | :----------: | ------------------------------------------ | --------------------------- |
| /api/todo           |  GET   | access_token | none                                       | Get all the todos info      |
| /api/todo/:todoName |  GET   | access_token | none                                       | Get a single todo info      |
| /api/todo           |  POST  | access_token | title, description: String, due_date: Date | Create a todo               |
| /api/todo/:id       | DELETE | access_token | none                                       | Delete a todo               |
| /api/todo/:id       |  PUT   | access_token | title, description: String, due_date: Date | Update a todo with new info |

### **List of User Routes** ###
| Route        | HTTP  | Header(s) | Body                                                      | Description                                          |
| ------------ | :---: | :-------: | --------------------------------------------------------- | ---------------------------------------------------- |
| /login       | POST  |   none    | email : String (required)<br>password : String (required) | Sign up with new user info                           |
| /register    | POST  |   none    | email : String (required)<br>password : String (required) | Sign in and get an access token based on credentials |
| /google-auth | POST  |   none    |                                                           | Using google account to log in                       |

---
<br>

**FANCY TODO**
----

* **Method:**
  `GET` | `POST` | `PUT` | `DELETE`
  

<br>

**Show Todo**
----
  Get all the todos info.

* **URL**

    `localhost:3000/api/todo`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ todos }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Database is empty" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Add Todo**
----
  Create a todo.

* **URL**

    `localhost:3000/api/todo`

* **Method:**

  `POST`

* **Data Params**

    * **title** : string
    * **description** : string
    * **due_date** : date

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: 'Todo created successfully' }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Show Todo by ID**
----
  Get a single todo info.

* **URL**

    `localhost:3000/api/todo/:id`

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ todo by id }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Show Todo by Todo Name**
----
  Get a single todo info.

* **URL**

    `localhost:3000/api/todo/:TodoName`

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      Todo Name (string)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ todo by id }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**EDIT Todo by ID**
----
  Update a todo with new info.

* **URL**

    `localhost:3000/api/todo/:id`

* **Method:**

  `PUT`

* **Params**
  
  **Required:**
 
      id (integer)

* **Data Params**

  * **title** : string
  * **description** : string
  * **due_date** : date

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg : 'Todo updated' }`
 
* **Error Response:**

  * **PUT**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** `{ msg: 'Failed to update Todo' }`

      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Delete Todo by ID**
----
  Delete a todo.

* **URL**

    `localhost:3000/api/todo/:id`

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Todo deleted successfully' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`