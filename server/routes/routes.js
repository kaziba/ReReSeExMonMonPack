module.exports = (app) => {

  // serve index and view partials
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/partials/:name', function(req, res) {
    let { name } = req.params;
    res.render(`partials/${name}`);
  });

  // redirect all others to the index (HTML5 history)
  return app.get('*', function(req, res) {
    res.render('index');
  });
};