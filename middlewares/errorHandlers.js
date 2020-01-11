module.exports = function (err, req, res, next) {
	const { code } = err
	let details = err.err

	if (!details) {
		details = err.msg
	}

	if (code == 401) {
		res.status(code).json({ err: details })
	} else if (code == 403) {
		res.status(code).json({ err: details })
	} else if (code == 409) {
		res.status(code).json({ err: details })
	} else if (code == 400) {
		res.status(code).json({ err: details })
	}
	else {
		res.status(code).json({ err: details })
	}
}