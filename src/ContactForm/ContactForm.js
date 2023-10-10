import React, { Component } from 'react';

import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={styles.wrap}>
        <h1 className={styles.h1}>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <p className={styles.p}>Name</p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="First or last name"
              required
              value={name}
              onChange={this.handleChange}
              autoComplete="name"
            />
          </label>
          <p className={styles.p}>Number</p>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="tel"
              name="number"
              placeholder="Phone Number"
              required
              value={number}
              onChange={this.handleChange}
              autoComplete="tel"
            />
          </label>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;