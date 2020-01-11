function onSignIn(googleUser) {
	const google_token = googleUser.getAuthResponse().id_token
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/users/gAuth',
		data: {
			google_token
		}
	})
		.done(result => {
			console.log('ini result');
			// $('#mainSection').show()
			// $('#loginSection').hide()
		})
		.fail()
}