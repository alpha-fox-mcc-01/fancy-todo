module.exports = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let errors = [ 'Internal server error '];
  if(err.name === 'Bad Request') {
    status = err.status;
    errors = err.errors;
    res.status(status).json({ errors });
  } else if(err.name === 'ValidationError') {
    status = 400;
    errors = [];
    for(key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(status).json({ errors });
  } else if(err.name === 'Unauthorized') {
    status = err.status;
    errors = err.errors;
    res.status(status).json({ errors });
  } else if(err.name === 'JsonWebTokenError') {
    status = 401;
    errors = [ err.message ];
    res.status(status).json({ errors });
  } else if(err.name === 'MongoError') {
    status = 400;
    errors = [ 'Email address already used' ];
    res.status(status).json({ errors })
  } else if(err.name === 'Not Found') {
    status = err.status;
    errors = err.errors;
    res.status(status).json({ errors });
  } else {
    res.status(status).json({ errors });
  }
};