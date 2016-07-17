const path = require('path');
const chalk = require('chalk');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));

module.exports = (app) => {
  app.get('/api/comments', function(req, res) {
    ModelProviderFactory.create('Comment')
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  });

  app.post('/api/comments', function(req, res) {
    var newComment = {
      author: req.body.author,
      text: req.body.text,
    };

    const CommentProvider = ModelProviderFactory.create('Comment');

    CommentProvider.save(newComment)
    .then(result => {
      console.log(chalk.blue(result));
    })
    .then(CommentProvider.find())
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  });

};