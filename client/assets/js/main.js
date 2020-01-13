function updateCard() {
  var x = document.getElementById("addtodo");
  var y = document.getElementById("updatetodo");

  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";

  } else {
    x.style.display = "none";
    y.style.display = "block";

  }
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  const google_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/googlesignin',
    data: {
      google_token
    }
  })
    .done(datatoken => {
      $('#regis').hide();
      $('#first').show();
      $('#crud').show();

      
      localStorage.setItem('token', datatoken.token)

      $('#ForUser').append(`
      <a> ${datatoken.name}</a>
      `)

      console.log(datatoken, '+++++++++++')
      const pk = localStorage.getItem('token')


      $.ajax({
        url: `http://localhost:3000/user/get/${pk}`,
        method: "get",
        data: {
          pk
        }
      })
      .done(feed=>{
        // console.log(feed.data.todo)
        let todos = feed.data.todo

        $.each(todos, function (index, val) {
            $('#feed').append(`

            <div class="card" style="width: 18rem; margin-bottom: 1rem;">
            <div class="card-body">
              <h5 class="card-title">${val.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p class="card-text">${val.description}</p>
              <h6>duedate: ${val.duedate}</h6>
              <h6>Status: ${val.status}</h6>
              <button class="btn btn-warning" onclick="updateCard()">update</button>
              <button class="btn btn-danger" id="${val._id}">delete</button>            
            </div>
          </div>

            `)
        })
      })

    })
    .fail(err => {
      console.log(err)
    })

}

//req.curretuserid

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    $('#regis').show();
    $('#first').hide();
    $('#crud').hide();
  });
}

$(document).ready(function () {

  $('#addtodo').submit((event) => {
    event.preventDefault();
    const name = $('#InputName').val();
    const description = $('#InputDesc').val();
    const status = $('#InputStatus').val();
    const duedate = $('#InputDates').val();
    const pk = localStorage.getItem('token')

    console.log(pk)
    
    
   

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/add',
      data: {
        pk,
        name,
        description,
        status,
        duedate
      }
    })
    .done(data => {
      // $('#feed').empty()

      console.log(data);
     
    })
    .fail(err => {
      console.log(err);
    })
  });

  $('#feed').on('click', 'button', function (event) {
    // console.log(event.currentTarget.id, );
    let pk = localStorage.getItem('token')
    let pr = event.currentTarget.id

    console.log(pk, pr, '++++++++')
    $.ajax({
      method: 'delete',
      url: `http://localhost:3000/user/delete/${pk}/${pr}`
    })
    .done(data => {
      console.log(data);
     
    })
    .fail(err => {
      console.log(err);
    })



    

  })

})
