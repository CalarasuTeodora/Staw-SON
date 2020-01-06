const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    const authToken = req.cookies.authToken;
    let decodedToken;
    if(!authToken) {
        req.isAuth = false;
        return next();
    }
    else {
        try {
            decodedToken = jwt.verify(authToken,'cheiedesemnarejonule');
        }
        catch(err) {
            req.isAuth = false;
            return next();  
        }
    }
    if(!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}