function(err, req, res, next){
	if (err){	
		console.log(err)	
		if (err === 400) {
			res.status(err).json({msg: 'Bad Request'})
		} else if(err === 401) {
			res.status(err).json({msg: 'Username/password is wrong'})
		} else if(err === 403) {
			res.status(err).json({msg: 'Login required'})
		} else if(err === 409) {
			res.status(err).json({msg: 'Already exist'})
		} else {
			res.status(500).json({msg: 'Internal Server Error'})
		}
	}
}