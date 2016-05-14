import React, {Component, PropTypes} from 'react';

import Helmet from "react-helmet";
import Message from "./Message";

/**
/* Universal Application
/* @ store - the store object
/*/
export default class App extends Component {

  static propTypes = {    
    store: PropTypes.object,
  };

  static childContextTypes = {
    store: PropTypes.object
  };  

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  // Pass html tags to server renderer with helmet
  render() { 
    return <div>
      <Helmet
        htmlAttributes={{"lang": "en"}}
        defaultTitle="React Universal Renderer Example" />
        <h1>
          If you see a message below and no client side re-render warning it worked...
        </h1>
        <Message />
    </div>
  };
};