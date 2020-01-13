function onSignIn(googleUser) {
    var google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/google-sign-in',
        data: {
            google_token
        }
    })
        .done(data => {
            localStorage.setItem('access_token', data.access_token)
            $.ajax({
                method: 'GET',
                url: `http://localhost:3000/todos`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .done(data => {
                    $('#menu-nav-btn').remove()
                    $('#new-task-btn').remove()
                    $('#navbtn').append(`<a href="#" data-target="slide-out" class="sidenav-trigger" id='menu-nav-btn'><i class="material-icons" id="nav-access">menu</i></a>`)
                    $('#add-btn-container').append(`<button class="black btn waves-effect waves-light" type="submit" name="action" id='new-task-btn'><i class="material-icons">add</i></button>`)
                    $('#signup').hide()
                    $('main').show()
                    let overdue = 0;
                    let todo = 0;
                    let dueToday = 0;
                    let completed = 0;
                    if (data.data.length !== 0) {
                        data.forEach(todo => {
                            if (new Date() > new Date(todo.due_date)) overdue++;
                            if (todo.status === 'pending') todo++;
                            if (new Date(todo.due_date) === new Date()) dueToday++;
                            if (todo.status === 'completed') completed++ 
                            $('#heading-stats').append(`
                            <div class="card">
                                <div class="card-content white-text todo-card">
                                    <span class="card-title">Card Title</span>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div class="card-action">
                                    <a href="#">This is a link</a>
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                            `)
                        })
                    } else {
                        $('#heading-stats').append(`
                        <center><img src='./assets/images/todo.png' style='margin-top:150px'; height=300 width=300></center>
                        `)

                    }
                    $('#overdue').append(`<a href='#' class='stats'>${overdue}</a>`)
                    $('#todo').append(`<a href='#' class='stats'>${todo}</a>`)
                    $('#due-today').append(`<a href='#' class='stats'>${dueToday}</a>`)
                    $('#completed').append(`<a href='#' class='stats'>${completed}</a>`)
                })
                .fail(err => {
                    console.log(err.message)
                })
            $.ajax({
                method: 'GET',
                url: `http://localhost:3000/users/current`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .done(data => {
                    $('.user-view').append(`
                    <div class="background">
                        <img src="./assets/images/cafeBG.jpg">
                    </div>
                    <a href="#!name"><span class="white-text name">${data.data.username}</span></a>
                    <a href="#!email"><span class="white-text email">${data.data.email}</span></a>
                    `)
                })
                .fail(err => {
                    console.log(err)
                })
        })
        .fail(err => {
            console.log(err.message)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      $('#menu-nav-btn').remove()
      $('#new-task-btn').remove()
      $('#navbtn').append(`<a href="#" data-target="slide-out" class="sidenav-trigger disabled" id='menu-nav-btn'><i class="material-icons" id="nav-access">menu</i></a>`)
      $('#add-btn-container').append(`<button class="black btn waves-effect waves-light" type="submit" name="action" id='new-task-btn'l><i class="material-icons">add</i></button>`)
      $('#signup').show()
      $('main').hide()
    });
}


$(document).ready(function() {
    $("#new-task-btn").on("click", function(){
        $('main').hide()
        $('#new-task').show()
    });

    $('#submit-task').click(function(event) {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `http://localhost:3000/todos`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                name: $('#taskName').val(),
                description: $('#description').val(),
                due_date: $('#due').val(),
            }
        })
            .done(result => {
                $('main').show()
                $('#new-task').hide()
            })
            .fail(err => {
                console.log(err);
            })
    })
})