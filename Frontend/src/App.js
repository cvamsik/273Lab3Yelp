import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux'
import store from './reduxConfig/store'
//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      // <CookiesProvider>
      <Provider store={store}>

        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>

      // </CookiesProvider>

    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
