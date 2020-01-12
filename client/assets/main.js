var userId 

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
      console.log(result)
      toastr.success('Login successful!')
      $("#login").hide()
      $("#mainpage").show()
      userId = result.userId
      localStorage.setItem('access_token', result.access_token)
    })
    .fail(err => {
      console.log(err)
      toastr.warning('Login unsuccessful')
    })
  }


  $(document).ready(function(){

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

    userTodo(userId)
            .then(result => {
              console.log()
            })

    $("#signin").click(event => {
      let email = $("#email")
      console.log('masuk')
      $("#login").hide()
      
      let password = $("#password")
      console.log(email.val(), password.val(), 'ini credentials')
      manualLogin(email.val(), password.val())
              .then(result => {
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
      let status = "open"
      addTodo(todo.val(), due_date.val(), status, userId)
              .then(result => {
                console.log(result)
                toastr.success('Task added!')

              })
              .catch(err => {
                toastr.warning('Failed to add task')
              })
    })


  
  })