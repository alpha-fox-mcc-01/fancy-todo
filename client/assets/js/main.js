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
      $('#add-todo').show();

      jQuery('.show-todos').html('');
      console.log(token.todos)
      $.each(token.todos, (index, value) => { 
        $('.show-todos').append(`
        <div class="col-md-6 mt-4">
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">${value.name}</strong>
              <div class="mb-1 text-muted">N${value.due_date}</div>
              <p class="card-text mb-auto">${value.description}</p>
            </div>
          </div>
        </div>`)
      })
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
  jQuery('.show-todos').html('');
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$(document).ready(function(){
  $('.sign-out-burger').hide();
  $('.sign-out-google').hide();
  $('.register-form').hide();
  $('.alert-register').hide();
  // $('#add-todo').hide();

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

  $('#todo-form').submit(event => {
    event.preventDefault();
    const name = $('#todoName').val();
    const description = $('#todoDesc').val();
    const due_date = $('#todoDue-date').val();
    const status = "Masuk";
    const access_token = localStorage.getItem('access_token');
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
      .done(result => {
        jQuery('.show-todos').html('');
        console.log(result.todos)
        $.each(result.todos, (index, value) => { 
          $('.show-todos').append(`
          <div class="col-md-6 mt-4">
            <div class="card flex-md-row mb-4 shadow-sm h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-primary">${value.name}</strong>
                <div class="mb-1 text-muted">N${value.due_date}</div>
                <p class="card-text mb-auto">${value.description}</p>
              </div>
            </div>
          </div>`)
        })
      })
      .fail(err => {
        console.log(err)
      })
  })


});