# fancy-todo

**Register User**
----
  Returns json data about a single user (name).

* **URL**

  /user/registerUser

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ name : "Michael Bloom", email: "michael@bloom.com", password: "12345678" }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ userName: "..." }`
 
* **Error Response:**

  * **Code:** 400 MONGO ERROR <br />
    **Content:** `{ errors : [ "Email is already used" ] }`

  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ errors : [ "..." , "..." ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/registerUser',
    data: {
      name,
      password,
      email
    }
  })
  ```


**Login User**
----
  Returns access_token.

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ email: "...", password: "..." }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ access_token: "..." }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ errors : [ "..." , "..." ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/login',
    data: {
      password,
      email
    }
  })
  ```


  **Login Google**
----
  Returns token from google.

* **URL**

  /user/googleLogin

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ google_token: "..." }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: "..." }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/googleLogin',
    data: {
      google_token
    }
  })
  ```


**Add Todo**
----
  Returns json data about a created todo.

* **URL**

  /todo/addTodo

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ name: "...", description: "...", due_date: "...", status: "..." }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ name: "...", description: "...", due_date: "...", status: "..." }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ errors : [ "..." , "..." ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/todo/addTodo',
    data: {
      name,
      description,
      due_date,
      status
    },
    headers: {
      access_token
    }
  })
  ```


  **Edit Todo**
----
  Returns json data before updated todo.

* **URL**

  /todo/updateTodo

* **Method:**

  `PUT`
  
*  **URL Params**

   `Todo id`

* **Data Params**

  **Required:**
  **Content:** `{ name: "...", description: "...", due_date: "...", status: "..." }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ name: "...", description: "...", due_date: "...", status: "..." }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ errors : [ "..." , "..." ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/todo/${todoId}`,
    data: {
      name,
      description,
      due_date,
      status
    },
    headers: {
      access_token
    }
  })
  ```


  **Delete Todo**
----
  Returns json data about a created todo.

* **URL**

  /todo/deleteTodo

* **Method:**

  `DELETE`
  
*  **URL Params**

   `Todo id`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ name: "...", description: "...", due_date: "...", status: "..." }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ errors : [ "..." , "..." ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ errors : [ "Internal Server Error" ] }`

* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todo/${todoId}`,
    headers: {
      access_token
    }
  })
  ```