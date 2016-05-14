import React, {Component, PropTypes} from 'react';
import 'isomorphic-fetch';

// Simple test of fetch with isomorphic rendering
export default class Message extends Component {

  // The store is passed through from the App, the promises are passed through from out renderer
  static contextTypes = {
    store: PropTypes.object,
    promises: PropTypes.array
  }

  // Listen to freezer changes
  onFreezerChange = (event) => {
    this.forceUpdate();
  }

  componentDidMount (){
    this.context.store.on('update', this.onFreezerChange);
  }

  componentWillUnmount  (){
    this.context.store.off('update', this.onFreezerChange); 
  }

  // We place our fetches in componentWillMount so they run on both the client and server render.
  componentWillMount (){
    const store = this.context.store;
    const state = store.get();
    
          
    if(!state.message){
      // Push a promise onto the stack so we know to wait for it on server render
      this.context.promises.push(fetch('http://localhost:8080/message').then((response) => {      
        return response.json();
      }).then((json) => {        
        // Update the store
        store.get().set('message',json.message);
      }));
    }

  }
  
  render() {
    const state = this.context.store.get();
    if(!state.message)
      return <p>I'm fetching the message...</p>;
    else
      return <p>{state.message}</p>
  }
}