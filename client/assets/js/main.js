// GOOGLE SIGN IN AND SIGN OUT
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method : 'POST',
    url : 'http://localhost:3000/users',
    data : {
      id_token
    }
  })
  .done( token => {
    localStorage.setItem('token', token)
    showContent(1)
    showLogin(0)
    showHeader(1)
  })
  .fail( err => {
    console.log(err);
  })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    showContent(0)
    showLogin(1)
    showHeader(0)
  });
}

// modular function

function registerUser(){
  $('#login-page').click(event => {
    $.ajax({
      method : 'POST',
      url : 'http://localhost:3000/users/register',
      data : {
        name : $('#name').val(),
        email : $('#email').val(),
        password : $('#password').val()
      }
    })
    .done( token => {
      console.log(token);
      localStorage.setItem('token', token)
    })
    .fail(err => {
      console.log(err);
    })
  })
}

function showLogin(n){
  if(n){
    $('.login').show()
  } else {
    $('.login').hide()
  }
}

function showContent(n){
  if(n){
    $('.content').show()
  } else {
    $('.content').hide()
  }
}

function showHeader(n){
  if(n){
    $('header').show()
  } else {
    $('header').hide()
  }
}

function addTodo(){
  $('#add-todo').click(event =>{
    $.ajax({
      method : 'POST',
      url : `http://localhost:3000/todos`,
      data : {
        name : $('#todo_name').val(),
        description : $('#description').val(),
        due_date : $('#due_date').val(),
        token : localStorage.getItem('token')
      }
    })
    .done( data => {
      console.log(data, 'dataaaa');
      getTodo()
    })
    .fail(err => {
      console.log(err);
      
    })
  })
}

function getTodo(){
  let token = localStorage.getItem('token')
  $.ajax({
    method : 'GET',
    url : `http://localhost:3000/todos`,
    headers : {
      token
    }
  })
  .done( data => {
    let content = ''
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      content += `
      <tr>
        <th scope="row">${i+1}</th>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.start_date}</td>
        <td>${item.due_date}</td>
        <td class="action"> <button class="btn-primary" id="edit" value="${item._id}" type="submit">Edit</button> | <button class="btn-primary" id="delete" value="${item._id}" type="submit">Delete</button></td>
      </tr>
      `
    }
    $('.data-todo').html(content)
  })
  .fail(err => {
    console.log(err);
  })
}

function deleteTodo(){
  $('.data-todo').click(event => {
    let todoId = event.target.value 
    console.log(todoId);
    $.ajax({
      method : 'DELETE',
      url : `http://localhost:3000/todos`,
      data : {
        todoId
      }
    })
    .done( data => {
      console.log(data);
      getTodo()
    })
    .fail( err => {
      console.log(err);
      
    })
  })
}

function editTodo(){
  $('.data-todo').click(event => {
    let todoId = event.target.value 
    console.log(todoId);
    $.ajax({
      method : 'PATCH',
      url : `http://localhost:3000/todos`,
      data : {
        todoId
      }
    })
    .done( data => {
      console.log(data);
      getTodo()
    })
    .fail( err => {
      console.log(err);
      
    })
  })
}

// DOCUMENT READY
$(document).ready(()=>{
  const loggedIn = localStorage.getItem('token')
  if(loggedIn){
    showContent(1)
    showHeader(1)
    showLogin(0)
    getTodo()
    addTodo()
    deleteTodo()
  }else {
    showContent(0)
    showLogin(1)
    showHeader(0)
    registerUser()
  }
})