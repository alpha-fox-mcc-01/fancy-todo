function onSignIn(googleUser) {
	const google_token = googleUser.getAuthResponse().id_token
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/users/gAuth',
		headers: { "google_token": google_token }
	})
		.done(result => {
			localStorage.setItem('access_token', result)
			// $('#mainSection').show()
			// $('#loginSection').hide()

			// fetch my todo
			getMyTodo()

			// put access_token to localStorage
		})
		.fail(err => {
			console.log(err)
		})
}