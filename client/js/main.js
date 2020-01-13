let appData
$(document).ready(function () {
	// fetch my todo
	getMyTodo()
	// prevent link, button, and submit default
	$('button, a').on('click', function (event) {
		event.preventDefault()
	})

	// HIDE MAIN SECTION IF NOT SIGN IN
	if (localStorage.access_token) {
		$('#mainSection').show()
		$('#loginSection').hide()
	}

	$('#textinput-search').on('change keydown paste', function (event) {
		console.log(event.currentTarget.value)
	})

	$('#button-login').on('click', function (event) {
		const email = $('#textinput-login-email').val()
		const password = $('#textinput-login-password').val()

		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/users/signin',
			data: {
				email,
				password
			}
		})
			.done(result => {
				console.log(result);

				localStorage.setItem('access_token', result)

				$('#mainSection').show()
				$('#loginSection').hide()

				// fetch my todo
				getMyTodo()
			})
			.fail(err => {
				const msg = err.responseJSON.err
				$('#login-form').append(`<br><div class="alert alert-danger" role="alert">${msg}</div>`)
			})
	})

	$('#submitregister').on('click', function (event) {
		const fullname = $('#textinput-register-fullname').val()
		const email = $('#textinput-register-email').val()
		const password = $('#textinput-register-password').val()
		const confirmPassword = $('#textinput-register-confirmPassword').val()

		if (confirmPassword !== password) {
			$('#textinput-register-password').addClass('border-danger')
			$('#textinput-register-confirmPassword').addClass('border-danger')
			$('#register-form').append(`<br><div class="alert alert-danger" role="alert">password does not match</div>`)
		} else {
			$('#textinput-register-password').removeClass('border-danger')
			$('#textinput-register-confirmPassword').removeClass('border-danger')
			$.ajax({
				method: 'POST',
				url: 'http://localhost:3000/users/signup',
				data: {
					email,
					password,
					fullname
				}
			})
				.done(result => {
					$('#modal-register').modal('toggle')
					$('#login-form').append(`<br><div class="alert alert-success" role="alert">Registration Successful, please login with your registered email & password</div>`)
				})
				.fail(err => {
					console.log(err);
					$('#textinput-register-email').addClass('border-danger')
					$('#register-form').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.err.message}</div>`)
				})
		}
	})




});