$(document).ready(function () {
	// prevent link, button, and submit default
	$('button, a').on('click', function (event) {
		console.log(event.currentTarget)
		event.preventDefault()
	})

	// HIDE MAIN SECTION IF NOT SIGN IN
	// $('#mainSection').hide()


});