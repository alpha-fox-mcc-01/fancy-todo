function getMyTodo() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/users/data',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(result => {
			let categories = []
			const todos = result.todos
			todos.forEach(todo => {
				categories.push(todo.category)
			})
			appendTodoList(todos)

			var distinctCategories = []
			categories.forEach(row => {
				if (!distinctCategories.includes(row)) {
					distinctCategories.push(row)
				}
			})

			$('#categoryContainer').empty()
			distinctCategories.forEach(row => {
				$('#categoryContainer').append(`
					<a href="#" class="list-group-item list-group-item-action">${row}</a>
				`)
			})

			$('#todoowner').text(result.fullname)
			$('#owneremail').text(result.email)

			// delete confirm
			$('.deleteconfirmation').on('click', function (event) {
				const deletedId = event.currentTarget.id.replace('btn-deleteconfirm-', '')
				console.log(deletedId);

				$.ajax({
					method: 'DELETE',
					url: 'http://localhost:3000/todos',
					headers: {
						access_token: localStorage.getItem('access_token')
					},
					data: {
						id: deletedId
					}
				})
					.done(result => {
						$(`#modalTodo-${deletedId}-delete`).modal('hide')
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
						$(`#todo-${deletedId}`).remove()
					})
					.fail(err => {
						console.log(err)
					})
			})

			// check or uncheck
			$('.checkbox').on('click', function (event) {
				console.log(event.currentTarget.id)
				const checkedId = event.currentTarget.id.replace('checkbutton-', '')
				$.ajax({
					method: 'PATCH',
					url: 'http://localhost:3000/todos',
					headers: {
						access_token: localStorage.getItem('access_token')
					},
					data: {
						id: checkedId
					}
				})
					.then(result => {
						console.log(result);
						if (result.msg == 'Todo Check-ed') {
							$(`#checkbox-${checkedId}`).removeClass('fa-circle').addClass('fa-check-circle')
						} else {
							$(`#checkbox-${checkedId}`).removeClass('fa-check-circle').addClass('fa-circle')
						}
						// fa-check-circle' : 'fa-circle
					})

			})

			// update
			$('.update-confirmation').on('click', function (event) {
				const updatedId = event.currentTarget.id.replace('btn-update-', '')
				const values = {
					id: updatedId,
					title: $(`#textinput-title-update-${updatedId}`).val(),
					description: $(`#textinput-desc-update-${updatedId}`).val(),
					tags: $(`#textinput-tags-update-${updatedId}`).val()
				}
				$.ajax({
					method: 'PUT',
					url: 'http://localhost:3000/todos',
					headers: {
						access_token: localStorage.getItem('access_token')
					},
					data: values
				})
					.done(result => {
						console.log(result, 'ini result update');

						$(`#modalTodo-${updatedId}-edit`).modal('hide')
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
						$(`#todo-${updatedId}`).remove()

						prependTodo(result.newValue)
					})
					.fail(err => {
						console.log(err)
					})
			})

			$('.create-confirmation').on('click', function (event) {
				const title = $('#textinput-create-title').val()
				const description = $('#textinput-create-description').val()
				const category = $('#textinput-create-category').val()
				const tags = $('#textinput-create-tags').val()

				const values = {
					title, description, category, tags
				}

				console.log(values)

				$.ajax({
					method: 'POST',
					url: 'http://localhost:3000/todos',
					headers: {
						access_token: localStorage.getItem('access_token')
					},
					data: values
				})
					.then(result => {
						console.log(result)


						$(`#create-todo`).modal('hide')
						$('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
						prependTodo(result.createdTodos)
					})
			})
		})
}