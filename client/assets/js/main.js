function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/googleLogin',
    data: {
      google_token
    }
  })
    .done(token => {
      localStorage.setItem('access_token', token.token);
      $('.sign-in').hide();
      $('#sign-in-google').hide();
      $('.sign-out-burger').show();
      $('.sign-out-google').show();
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('.sign-in').show();
  $('.sign-out-burger').hide();
  $('.sign-out-google').hide();
}

$(document).ready(function(){
  $('.sign-out-burger').hide();
  $('.sign-out-google').hide();
  $('.register-form').hide();
  $('.alert-register').hide();

  $('.register-go').click(event => {
    event.preventDefault();
    $('.sign-in').hide();
    $('.register-form').show();
  })

  $('#register-submit').submit(event => {
    event.preventDefault();
    const name = $('#userName').val();
    const password = $('#userPassword').val();
    const email = $('#userEmail').val();

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/registerUser',
      data: {
        name,
        password,
        email
      }
    })
      .done(userName => {
        $('.register-form').hide();
        $('.sign-in').show();
        $('.alert-register').show();
      })
      .fail(err => {
        console.log(err);
      })
  })

  

});