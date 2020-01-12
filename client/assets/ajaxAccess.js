
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