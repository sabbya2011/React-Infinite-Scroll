import React, { Component } from 'react';
import ContactList from './ContactList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Contacts</h1>
        <div className="contacts-list">
          <ContactList/>
        </div>
      </div>
    );
  }
}

export default App;
