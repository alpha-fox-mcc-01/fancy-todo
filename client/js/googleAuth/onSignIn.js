function onSignIn(googleUser) {
	const google_token = googleUser.getAuthResponse().id_token
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/users/gAuth',
		headers: { "google_token": google_token }
	})
		.done(result => {
			// put access_token to localStorage
			localStorage.setItem('access_token', result)
			$('#mainSection').show()
			$('#loginSection').hide()

			// fetch my todo
			console.log('fetching todos');
			getMyTodo()
		})
		.fail(err => {
			console.log(err)
		})
}