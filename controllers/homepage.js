const homepageRoute = (req, res) => {
    res.send('Hello! Please use a forward slash / and then "to-do" or "api-docs"');
};

module.exports = {
    homepageRoute,
};