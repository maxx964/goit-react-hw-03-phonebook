import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from './localStorageUtil/localStorageUtil';


class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = loadDataFromLocalStorage('contacts');

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  };
    
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    if (this.state.contacts.some((contact) => contact.name === name)) {
      alert(`"${name}" is already in the list`);
      return;
    };
    
    

    const newContact = {
      id: nanoid(),
      name,
      number,
    };


    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }),
      () => {
        saveDataToLocalStorage('contacts', this.state.contacts);
  }
    );
};

  handleFilterChange = (e) => {
   const { name, value } = e.target;
   this.setState({ [name]: value });
};

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }),
      () => {
        saveDataToLocalStorage('contacts', this.state.contacts);
      }
    );
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
