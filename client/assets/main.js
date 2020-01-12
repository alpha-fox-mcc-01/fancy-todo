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

    $("#signin").click(event => {
      let email = $("#email")
      console.log('masuk')
      let password = $("#password")
      console.log(email.val(), password.val(), 'ini credentials')
      manualLogin(email.val(), password.val())
              .then(result => {
                console.log(result, 'ini result')
                toastr.success('Login successful!')
                $("#login").hide()
                $("#mainpage").show()
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

  
  })