const mongoose = require('mongoose');
const BaseProvider = require('./BaseProvider');
let { Schema }   = mongoose;
let { ObjectId } = Schema;

let CommentSchema = new Schema({
  author: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
});


CommentSchema.index({author: -1});

mongoose.model('Comment', CommentSchema);

let Comment = mongoose.model('Comment');

module.exports = class CommentProvider extends BaseProvider {

  constructor() {
    super(Comment);
  }

  findById(params) {
    return new Promise(function(resolve, reject) {
      return Comment.findOne({_id: params.CommentObjectId})
      .exec(function(err, Comment) {
        if (err) { return reject(err); }
        return resolve(Comment);
      });
    });
  }
};