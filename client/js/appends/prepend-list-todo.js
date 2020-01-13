function prependTodo(todo) {
	console.log('start appending todolist');
	console.log(todo);

	$('#todoContainer').prepend(`
					<div id="todo-${todo._id}" href="#" class="list-group-item flex-column align-items-end">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="align-self-center">${todo.title}</h5>
					</div>
						
					<div  id="tagList-${todo._id}" class="tagList d-flex align-items-start"></div><br>
					<div id="checkbutton-${todo._id}" class="row checkbox cursor-on-hover">
						<div class=" col-md-1 justify-content-center align-self-center">
							<i id="checkbox-${todo._id}" class="far ${(todo.isDone == true) ? 'fa-check-circle' : 'fa-circle'} fa-3x"></i>
						</div>
						<div class="col-md-11 justify-content-center align-self-center">
							<p class="mb-1 p-2 ml-3">${todo.description}</p>
						</div>
					</div>
					<hr class="my-2">
					<small>Category: <span>${todo.category}</span></small>
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
										<button id="btn-deleteconfirm-${todo._id}" type="button" class="deleteconfirmation btn btn-outline-danger">Yes, Delete</button>
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
											<input class="form-control" id="textinput-title-update-${todo._id}" value="${todo.title}">
										</div>
										<div class="form-group">
											<label>Description</label>
											<input class="form-control" id="textinput-desc-update-${todo._id}" value="${todo.description}">
										</div>
										<div class="form-group">
											<label>Tags: (separate each tag with commas)</label>
											<textarea class="form-control" id="textinput-tags-update-${todo._id}" cols="30" rows="5">${todo.tags.join(', ')}</textarea>
										</div>
									</form>
								</div>
									<div class="modal-footer">
										<button id="btn-update-${todo._id}" type="button" class="btn btn-primary update-confirmation">Save changes</button>
									</div>
								</div>

				</div>
					</div >
				
				</div >
				`)

	todo.tags.forEach(tag => {
		$(`#tagList-${todo.id}`).append(`<a href="#" class="badge badge-pill badge-info px-2 py-1">${tag}</a>`)
	})

}