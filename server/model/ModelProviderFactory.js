const path = require('path');
let CommentProvider = require(path.resolve('server', 'model', 'CommentProvider'));

module.exports = class DatabaseProviderFactory {
  static create(name) {
    switch (name) {
      case 'Comment': return new CommentProvider();
      default: return null;
    }
  }
};