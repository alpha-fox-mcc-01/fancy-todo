let accessToken
let arrData

function toggleLogin(n) {
   if (n) {
      $('#login-page').show()
   }
   else {
      $('#login-page').hide()
   }
}

function togglePage(n) {
   if (n) {
      $('#signed-in').show()
   }
   else {
      $('#signed-in').hide()
   }
}

function onSignIn(googleUser) {
   // var profile = googleUser.getBasicProfile();
   let id_token = googleUser.getAuthResponse().id_token;
   console.log(id_token);

   $.ajax({
      method: "POST",
      url: 'http://localhost:3000/users/googleSignIn',
      data: {
         token: id_token
      }
   })
      .done(token => {
         console.log(token);
         // set local storage
         localStorage.setItem(`token`, token.token)
         accessToken = token
         toggleLogin(0)
         togglePage(1)
      })
      .fail(err => {
         console.log(err);
      })
}


function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem(`token`)
      accessToken = null
      toggleLogin(1)
      togglePage(0)
   });
}

function getTodo() {
   console.log(accessToken);
   const pk = localStorage.getItem(`token`)
   console.log(`getTodo commence`);

   $.ajax({
      method: `GET`,
      url: `http://localhost:3000/users/get/${pk}`,
      data: {
         accessToken
      }
   })
      .done(data => {
         console.log(data, `DATA`);
         console.log(data.todo, `TODOoooo`);
         if (data.todo.length < 1) {
            console.log(`masuk done get bos`);

            $('#content-container').html(`<p class="text-center">No todo found</p>`)
         }
         else {
            let arrData = data.todo
            let content = ``
            for (let i = 0; i <= data.todo.length - 1; i++) {
               let item = data.todo[i]
               content += `
               <div class='content-item p-2 border-bottom'>
                        <p class='font-weight-bold'>${item.name}</p>
                        <p><span class=''font-weight-bold>Description :</span> ${item.description}</p>
                        <div class='row'>
                           <div class='col'>
                              <a href='#' onclick='updateTodo(${item._id})'>Edit todo <i class="fas fa-pencil-alt" style='margin-left: 7px;'></i></a>
                           </div>
                           <div class='col'>
                              <a href="#" onclick='deleteTodo(${item._id})'>
                                 Delete <i class="fas fa-trash-alt" style='margin-left: 7px'></i>
                              </a>
                           </div>
                        </div>
                     </div>
               `
               $('#content-container').html(content)
            }
         }
      })
      .fail(err => {
         console.log(err.message);
      })
}

// function createTodo() {
//    console.log(token);
//    const pk = localStorage.getItem(`token`)

//    $.ajax({
//       method : `post`,
//       url : `http://localhost:3000/users/addTodo/${pk}`,
//       data : {
//          accessToken
//       }
//    })
//       .done(data=> {

//       })
//       .fail(err => {
//          console.log(err.message);

//       })
// }

function deleteTodo(id) {

}

function updateTodo(id) {

}

function getDetail() {

}

$(document).ready(() => {
   $('#addTodo').submit((event) => {
      event.preventDefault()
      const name = $('#InputName').val();
      const description = $('#InputDesc').val();
      const status = $('#InputStatus').val();
      const due_date = $('#InputDates').val();
      const id = localStorage.getItem('token')

      // console.log(pk);
      $.ajax({
         method: 'POST',
         url: `http://localhost:3000/users/addTodo/${id}`,
         data: {
            name,
            description,
            status,
            due_date
         }
      })
         .done(data => {
            console.log(data);
         })
         .fail(err => {
            console.log(err.message);
         })
   })
})