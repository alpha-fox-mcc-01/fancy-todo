function getMyTodo() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/users/todos',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(result => {
			console.log(result.todos);
			$('#todoContainer').empty()
			const todos = result.todos
			todos.forEach(todo => {
				$('#todoContainer').append(`
					<div href="#" class="list-group-item flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="align-self-center">${todo.title}</h5>
						<div  id="tagList-${todo._id}" class="tagList d-flex align-items-start"></div>
					</div>
					<div class="row">
						<div class="cursor-on-hover col-md-1 justify-content-center align-self-center">
							<i class="checkbox far ${todo.isDone ? 'fa-check-circle' : 'fa-circle'} fa-check-circle fa-3x"></i>
						</div>
						<div class="col-md-11 justify-content-center align-self-center">
							<p class="mb-1 p-2 ml-3">${todo.description}</p>
						</div>
					</div>
					<hr class="my-2">
					<div class="d-flex w-100 justify-content-between">
						<small class="align-self-center">Created: ${todo.created}</small>
						<div>
							<a href="" class="text-dark" style="text-decoration: none;" data-toggle="modal" data-target="#modalTodo-${todo._id}-edit">
								<i class="fas fa-pencil-alt"></i>
							</a> &nbsp;&nbsp;&nbsp;&nbsp;
							<a href="" class="text-dark" style="text-decoration: none;" data-toggle="modal" data-target="#modalTodo-${todo._id}-delete">
								<i class="fas fa-trash"></i>
							</a>
						</div>
					</div>
				
					<!-- modals -->
					<!-- delete Confirmation -->
					<div class="modal fade" id="modalTodo-${todo._id}-delete" tabindex="-1" role="dialog" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-body d-flex w-100 justify-content-between">
									<strong class="align-self-center">
										Are you sure to delete this <span>Todo?</span>
									</strong>
									<div class="buttons">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										<button id="btn-deleteconfirm-${todo._id}" type="button" class="btn btn-outline-danger">Yes, Delete</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- update Modal -->
					<div class="modal fade" id="modalTodo-${todo._id}-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
						aria-hidden="true">
						<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title"> Update ${todo.title}</h5 >
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
								</div >

								<div class="modal-body">
								<!-- modals update Form -->
									<form>
										<div class="form-group">
											<label>Title</label>
											<input class="form-control" id="textinput-title-update-idTodo" value="${todo.title}">
										</div>
										<div class="form-group">
											<label>Description</label>
											<input class="form-control" id="textinput-desc-update-idTodo" value="${todo.description}">
										</div>
										<div class="form-group">
											<label>Tags: (separate each tag with commas)</label>
											<textarea class="form-control" id="textinput-tags-update-idTodo" cols="30" rows="5">${todo.tags.join(', ')}</textarea>
										</div>
									</form>
								</div>
									<div class="modal-footer">
										<button id="btn-update-${todo._id}" type="button" class="btn btn-primary">Save changes</button>
									</div>
								</div>

				</div>
					</div >
				
				</div >
				`)

				console.log(todo.tags);
				todo.tags.forEach(tag => {
					$(`#tagList-${todo._id}`).append(`<a href="#" class="badge badge-pill badge-info px-2 py-1 ml-2">${tag}</a>`)
				})
			})

			if (result.lenght == 0) {
			}
		})
}