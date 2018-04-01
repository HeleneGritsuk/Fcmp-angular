const blogs = require('./blogs');

module.exports = function(app) {

  app.use('/blogs',blogs);

}
