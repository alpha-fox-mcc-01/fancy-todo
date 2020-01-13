function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  
  $.ajax({
    method: "POST",
    url: 'http://localhost:3000/user/googlesignin',
    data: {
      googleToken: id_token
    }
  })
    .done(function(data) {
        localStorage.setItem('token', data.token)
        $('.backLeft').css({
          "width": "200%",
          "background": "#f9f9f9",
          "transition": "all 0.5s ease"
        })
        $('#logOut').show()
        $('.backRight').hide()
        $('#slideBox').animate({
          'marginLeft' : '100%'
        }, 1000)
        $('.topLayer').animate({
          'marginLeft' : '0'
        }, 1000)
        $("#home").show().trigger(getTodos())
        console.log('User signed in')
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  let auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out')
    })
}