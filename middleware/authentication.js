const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined){
        return res.status (401).json("You do not have access. Log in to be authenticated");
    }
    next();
};

module.exports = {
    isAuthenticated
}