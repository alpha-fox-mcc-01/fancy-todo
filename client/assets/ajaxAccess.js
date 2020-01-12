const access_token = localStorage.getItem('access_token')

function allTodos() {
    
    console.log('masuk ajax')
    return new Promise( (resolve, reject) => {
        $.ajax({
            method: 'GET',
            headers: {
                access_token : access_token
            },
            url: "http://localhost:3000/todo/all"
        })
        .done(data => {
            resolve(data)
        })
        .fail(err => {
            reject(err)
        }) 
    })
}

function manualLogin(email, password) {
    return new Promise( (resolve, reject) => {
        $.ajax({
            method: 'POST',
            url: "http://localhost:3000/user/login",
            data: {
                email : email,
                password: password
            }
        })
        .done(data => {
            console.log(data)
            localStorage.setItem('access_token', data.access_token)
            resolve(data)
        })
        .fail(err => {
            reject(err)
            console.log('masuk error')
        }) 
    })
}


function manualSignup(username, email, password) {
    return new Promise( (resolve, reject) => {
        $.ajax({
            method: 'POST',
            url: "http://localhost:3000/user/register",
            data: {
                username: username,
                email : email,
                password: password
            }
        })
        .done(data => {
            console.log(data)
            resolve(data)
        })
        .fail(err => {
            reject(err)
        }) 
    })
}


function addTodo(name, due_date, status, userId) {
    return new Promise( (resolve, reject) => {
        $.ajax({
            method: 'POST',
            url: "http://localhost:3000/todo",
            data: {
               name: name,
               due_date : due_date,
               status : status,
               userId: userId
            },
            headers : {
                access_token : access_token
            }
        })
        .done(data => {
            console.log(data)
            resolve(data)
        })
        .fail(err => {
            reject(err)
        }) 
    })
}


function userTodo(userId) {
    console.log('masuk userTodo')
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/todo/${userId}`,
            headers: {
                access_token : access_token
            }
        })
        .done(data => {
            resolve(data)
        })
        .fail(err => {
            reject(err)
        }) 
})
}
