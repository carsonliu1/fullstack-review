import React from 'react';
import Repo from './Repo.jsx'

const RepoList = ({repos}) => {

  return (
    <div>
      <h4> Repo List Component </h4>
      {repos.map(obj => <Repo key={obj._id} repo={obj}/> )}
    </div>
  )
}

export default RepoList;