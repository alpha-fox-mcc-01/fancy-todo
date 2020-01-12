import { deleteTodo } from "../../server/controllers/todoController";

var userId 
var todoId
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(googleUser.getBasicProfile())
    $.ajax({
      method: 'POST',
      url:"http://localhost:3000/user/google-sign-in",
      data : {
        google_token : id_token
      }
    })
    .done(result => {
      toastr.success('Login successful!')
      $("#login").hide()
      $("#mainpage").show()
      userId = result.userId
      console.log(userId, 'userid di signin')
      localStorage.setItem('access_token', result.access_token)
      userTodo(userId)
            .then(listTodo => {
              listTodo.result.forEach( todo => {
                todoId = todo.id
                if (todo.status === 'done') {
                  $("#listtodos").append(`<div class="flex mb-2 items-center">
                  <p class="w-full line-through text-green">${todo.name}</p>
                  <a>Mark as </a>
                <button id="Not done" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button><br></br>
                </div>`)
                } else {
                  $("#listtodos").append(`<div class="flex mb-2 items-center">
                  <p class="w-full text-black">${todo.name}</p>
                  <a>Mark as </a>
               <button id="Not done" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Done</button>
               <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button><br></br>
                </div>`)
                }
              
              })
            })
            .catch(err => {
              console.log(err)
            })
    })
    .fail(err => {
      console.log(err)
      toastr.warning('Login unsuccessful')
    })
  }


  $(document).ready(function(){


    $("#not done").click(event => {
      let status = "not done"
      updateTodo(todoId, status)
                .then(result => {
                  toastr.success('Todo successfully marked as not done!')
                })
                .catch(err => {
                  toastr.warning('Unable to update todo')
                })
    })

    $("#done").click(event => {
      let status = "done"
      updateTodo(todoId, status)
                .then(result => {
                  toastr.success('Todo successfully marked as done!')
                })
                .catch(err => {
                  toastr.warning('Unable to update todo')
                })
    })
    // $("#getTodo").click(event => {
    //   allTodos()
    //         .then(result => {
    //           console.log(result, 'ini result')
    //           toastr.success('To-do list successfully fetched')
    //         })
    //         .catch(err => {
    //           console.log(err)
    //           toastr.warning('MUST login to access this page')
    //         })
    // })


    $("#signin").click(event => {
      let email = $("#email")
      let password = $("#password")
      console.log(email.val(), password.val(), 'ini credentials')
      manualLogin(email.val(), password.val())
              .then(result => {
                $("#login").hide()
                console.log(result, 'ini result')
                $("#mainpage").show()
                toastr.success('Login successful!')
              })
              .catch(err => {
                console.log(err)
                toastr.warning('Unsuccessful login. Please check your email/password')
              })
    })

    $("#toregister").click(event => {
      $("#login").hide()
      $("#register").show()
    })

    $("#create").click(event => {
      let username = $("#newusername")
      let email = $("#newemail")
      let password = $("#newpassword")
      manualSignup(username.val(), email.val(), password.val())
                  .then(data => {
                    console.log(data)
                    toastr.success('You are successfully registered!')
                  })
                  .catch(err => {
                    toastr.warning('Registration failed')
                  })
    })

    $("#loginpage").click(event => {
      $("#register").hide()
      $("#login").show()
    })
    

    $("#addButton").click(event => {
      let todo = $("#addTodo")
      let due_date = $("#due_date")
      let status = "not done"
      addTodo(todo.val(), due_date.val(), status, userId)
              .then(result => {
                console.log(result)
                $("#listtodos").append(`<div class="flex mb-2 items-center">
                <p class="w-full line-through text-green">${todo.name}</p>
                <a>Mark as </a>
              <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
              <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button><br></br>
              </div>`)
                toastr.success('Task added!')

              })
              .catch(err => {
                toastr.warning('Failed to add task')
              })
    })


  
  })