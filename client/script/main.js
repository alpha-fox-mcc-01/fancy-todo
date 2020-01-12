const loginUser = (email, password) => {
  return $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/user/login',
    data: {
      email,
      password
    }
  })
}

const showError = errorMessage => {
  $('#alert').empty()
  $('#alert').append(`<span>${errorMessage}</span>`)
  $('#alert').show()
}

const getData = user_token => {
  return $.ajax({
    method: 'GET',
    url: `http://localhost:3000/api/todo`,
    headers: { user_token }
  })
}

const dataAppend = (items, token) => {
  return items.forEach(item => {
    $('#todocontainer').append(`
      <div class="row">
        <div class="col">
          <div class="card text-white bg-dark mb-3 mx-auto" style="max-width: 90vh;">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <hr>
              <h5 class="card-text">Description</h5>
              <p lass="card-text">${item.description}</p>
              <hr>
              <h5 class="card-text">Status</h5>
              <p lass="card-text">${item.status ? "DONE" : "ONGOING"}</p>
              <hr>
              <h5 class="card-text">Due Date</h5>
              <p lass="card-text">${item.due_date}</p>
            </div>
            <div class="card-header">
            <button id=${item._id} class="btn btn-primary edit-button">EDIT</button>
            <button id=${item._id} class="btn btn-primary delete-button">DELETE</button>
            </div>
          </div>
        </div>
      </div>`)

    $('.delete-button').click(function (event) {
      console.log(event.target.id)
      $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/api/todo/${event.target.id}`,
        headers: { user_token: token }
      })
        .done(success => {
          getData(token)
            .done(items => {
              console.log(items)
              $('#todocontainer').empty()
              dataAppend(items, token)
            })
        })
        .fail(err => {
          showError(err.responseJSON.msg)
          console.log(err)
        })
    })
  })
}

$(document).ready(function () {

  $('#reg-menu').click(function (event) {
    event.preventDefault()
    console.log('reg button clicked')
    $('#logincard').hide()
    $('#registercard').show()
  })

  $('#loginform').submit(event => {
    event.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();

    loginUser(email, password)
      .done(data => {
        console.log(data.token);
        $('#alert').hide()
        $('#login').hide()
        $('#content').show()

        getData(data.token)
          .done(items => {
            console.log(items)
            $('#todocontainer').empty()
            dataAppend(items, data.token)
          })
          .fail(err => console.log(err))
      })
      .fail(err => {
        showError(err.responseJSON.msg)
        console.log(err)
      })
  });
})