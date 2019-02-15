function isLoggedIn(req, res, next) {
	req.loggedIn = !!req.user;
	next();
}

module.exports = isLoggedIn;