import React from 'react';
import './App.css';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      hits: [],
      isLoading : false,
      error: null
    }
  }
  componentDidMount() {
    this.setState({isLoading : true});
    fetch(API + DEFAULT_QUERY)
      .then(response =>{
        if(response.ok){
            return(response.json())
        }else{ 
            throw new Error('Something went wrong...')
        }})
      .then(data => this.setState({ hits: data.hits, isLoading : false}))
      .catch(error=>this.setState({error, isLoading:false}));
      }
    render(){
      const {hits,isLoading,error} = this.state;
      if(error){
        return(<h1>{error.message}</h1>)
      }
      if(isLoading){
        return(<p className="loading">Loading...</p>)
      }
      return (
          <div className = "app">
            <h1>News from Hacker Hunt</h1>
            <ul>
                {hits.map(hit =>
                     <li key={hit.objectID}>
                          <a href={hit.url}>{hit.title}</a>
                     </li>)}
             </ul>
          </div>
                );
              }
}

export default App;
