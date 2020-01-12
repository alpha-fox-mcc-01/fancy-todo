function getMyTodo() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/users/todos',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(result => {
			console.log(result)
		})
}