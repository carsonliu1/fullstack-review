import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    axios.get('/repos')
      .then(res => this.setState({repos:res.data}))
      .catch(error => alert(error))
  }

  search (term) {
    axios.post('/repos', {
      user: term
    })
      .then(res => {
        axios.get('/repos')
          .then(res => this.setState({repos:res.data}))
          .catch(error => alert(error))
      })
      .catch(err => alert(err))

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));