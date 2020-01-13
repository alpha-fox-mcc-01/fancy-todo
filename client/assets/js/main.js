let access_token

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/user/google-sign',
        data : {
            id_token
        }
      })
      .done(token => {
        console.log(token);
        localStorage.setItem('token', token.token)
        access_token = token.token
        toggleLogin(0)
        togglePage(1)
      })
      .fail( err => {
        console.log(err);
      })
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function toRegister(){
  
}

function login(){

  $('#loginButton').click(event =>{
    console.log(event);
    event.preventDefault()
    console.log($('#email').val());
    console.log($('#password').val());
    if ($('#remember').is(":checked")){
      console.log('remember');
      
    } else console.log('don\'t remember');
    
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/user/login`,
        data : {
          email : $('#email').val(),
          password : $('#password').val()
        },
        beforeSend: function () {
         $('#repo-container').html(`<div class="d-flex justify-content-center p-3">
         <div class="spinner-border" role="status">
           <span class="sr-only">Loading...</span>
         </div>
       </div>`);
      }
    })
      .done(function (token) {
        console.log(token);
        localStorage.setItem('token', token.token)
        access_token = token.token
        toggleLogin(0)
        togglePage(1)
       
      })
      .fail(function (err) {
         console.log(err)
      });
  }) // loginButton click event
} // function login

function register(){

  $('#registerButton').click(event =>{
    console.log(event);
    event.preventDefault()
    console.log($('#nameRegister').val());
    console.log($('#emailRegister').val());
    console.log($('#passwordRegister').val());

    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/user/register`,
        data : {
          name : $('#nameRegister').val(),
          email : $('#emailRegister').val(),
          password : $('#passwordRegister').val()
        },
        beforeSend: function () {
         $('#repo-container').html(`<div class="d-flex justify-content-center p-3">
         <div class="spinner-border" role="status">
           <span class="sr-only">Loading...</span>
         </div>
       </div>`);
      }
    })
      .done(function (token) {
        console.log(token);
        localStorage.setItem('token', token.token)
        access_token = token.token
        toggleRegister(0)
        togglePage(1)
       
      })
      .fail(function (err) {
         console.log(err)
      });
  }) // registerButton click event 
} // function register

$(document).ready(()=>{
  login()
  register()
})