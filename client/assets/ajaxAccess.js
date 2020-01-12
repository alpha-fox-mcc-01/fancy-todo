
function allTodos() {
    const access_token = localStorage.getItem('access_token')
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
            localStorage.setItem(data.access_token)
            resolve(data)
        })
        .fail(err => {
            reject(err)
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