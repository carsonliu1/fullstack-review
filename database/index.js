const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user: {
    type: String,
  },
  url: {
    type: String,
    unique: true
  },
  description: {
    type: String,
  },
  stars: {
    type: Number,
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let data = []
  for (let x = 0; x < repoData.data.length; x++) {
    let obj = {}
    obj.user = repoData.data[x].owner.login
    obj.url = repoData.data[x].html_url
    obj.description = repoData.data[x].description
    obj.stars = repoData.data[x].stargazers_count
    data.push(obj)
  }
  Repo.insertMany(data)
    .then(result => cb(null, data))
    .catch(err => cb(err))
}

let top25 = (cb) => {
  Repo.find({}).sort({stars: -1}).limit(25)
    .then(data => cb(null, data))
    .catch(err => cb(err))
}

module.exports.save = save;
module.exports.top25 = top25