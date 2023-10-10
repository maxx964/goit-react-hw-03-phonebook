import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';


  class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name,number}) => {
    if (this.state.contacts.some((contact) => contact.name === name)) {
      alert(`"${name}" is already in the list`);
      return;
  }
const newContact = {
  id: nanoid(),
  name,
  number,
};


  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact],
  }));
};

  handleFilterChange = (e) => {
   const { name, value } = e.target;
   this.setState({ [name]: value });
};

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return(
      <div>
        <ContactForm onSubmit={this.handleSubmit}/>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={contacts}
          onDeleteContact={this.handleDeleteContact}
          filter={filter}
        />
      </div>
    );
  }
}

export default App;
