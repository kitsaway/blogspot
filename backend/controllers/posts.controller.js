const Posts = require("../models/Post.model");

const requestValidation = (allowedParams, req) => {
  const request = Object.keys(req.body);
  const isValid = request.filter(item => allowedParams.includes(item));
  return isValid;
}

exports.addPost = async (req, res) => {
  const { title, content } = req.body;
  const allowedParams = ["title", "content"];
  if(requestValidation(allowedParams, req)){
    try {
      const newPost = new Posts({ title, content });
      newPost.save();
      res.status(200).send({ message: "Post successfully added." });
    } catch(err) {
        res.status(500).send({ message: "Something went wrong...", error: err });
    }
  }else{
    res.status(400).send({ message: "Invalid Request!" });
  }
}

exports.getPosts = async (req, res) => {
  Posts.find({ deleted_at: null })
  .then((posts) => {
    if(!posts){
        res.status(404).send({ message: "Data not found"});
    }
    res.status(200).send({ posts: posts });
  })
  .catch(err => {
      res.status(500).send ({ message: "Something went wrong...", error: err });
  });
}

exports.getById = async (req, res) => {
  const { id } = req.params;

  Posts.findById({ _id: id })
  .then((post) => {
    if(!post){
        res.status(404).send({ message: "Data not found"});
    }
    res.send({ post: post });
  })
  .catch(err => {
      res.status(500).send ({ message: "Something went wrong...", error: err });
  });
}

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteDate = Date.now();

  Posts.findByIdAndUpdate({ _id: id }, {
        isDeleted: true,
        deleted_at: deleteDate
    }, { new: true })
    .then((post) => {
        res.status(200).send({ message: "Post successfully deleted.", id: post._id });
    })
    .catch(err => {
        res.status(500).send ({ message: "Something went wrong...", error: err });
    });
}

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updateDate = Date.now();
  const allowedParams = ["title", "content"];
  if (!content || !title) {
    return res.status(404).send({ message: "Post not found. Please fill the given field" });
  };
  if(requestValidation(allowedParams, req)){
      Posts.findOneAndUpdate({ _id: id }, {
          $set: {
              title: title,
              content: content,
              updated_at: updateDate
          }
      },{ new: true }).then(post => {
          res.status(200).send({ message: "Post content successfully updated.", post});
      }).catch(err => {
          res.status(500).send ({ message: "Something went wrong...", error: err });
      });
  }else{
      res.status(400).send({ message: "Invalid Request!" });
  }
}
