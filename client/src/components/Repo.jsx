import React from 'react'

function Repo ({repo}) {
  return (
    <div style={{borderStyle:'double', borderColor:'#E7E9EB'}}>
      <h4>{repo.user}</h4>
      <a href={repo.url}>Repo Name: {repo.description}</a>
      <p>Stars {repo.stars}</p>
    </div>
  )
}

export default Repo