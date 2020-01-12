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
      localStorage.setItem('access_token', result.access_token)
    })
    .fail(err => {
      console.log(err)
      toastr.warning('Login unsuccessful')
    })
  }


  $(document).ready(function(){

    $("#getTodo").click(event => {
      allTodos()
            .then(result => {
              console.log(result, 'ini result')
              toastr.success('To-do list successfully fetched')
            })
            .catch(err => {
              console.log(err)
              toastr.warning('MUST login to access this page')
            })
    })
    
    // jQuery methods go here...
  
  });