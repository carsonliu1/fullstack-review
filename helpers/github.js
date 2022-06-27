const axios = require('axios');

let getReposByUsername = (user, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  axios.get(`https://api.github.com/users/${user}/repos`, options)
    .then(data => cb(null, data))
    .catch(err => cb(err))

}


module.exports.getReposByUsername = getReposByUsername;