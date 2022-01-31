import "./App.css";
// import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import ContactList from "./Components/ContactList/ContactList";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  const isInContact = (name) => {
    return contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };
  const addContact = (contact) => {
    if (!isInContact(contact.name)) {
      setContacts((contacts) => ({
        contacts: [contact, ...contacts],
      }));
    } else {
      alert(`${contact.name} is already in contact)`);
    }
  };

  const getFilteredContact = () => {
    //const { contacts, filter } = contacts, filter;
    console.log(contacts);
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilter({ [name]: value });
  };

  const removeContact = (id) => {
    setContacts(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };
  return (
    <div className="App-header">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList
        contacts={getFilteredContact}
        removeContact={removeContact}
      />
    </div>
  );
}
// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   isInContact = name => {
//     const { contacts } = this.state;
//     return contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase(),
//     );
//   };

//   addContact = contact => {
//     if (!this.isInContact(contact.name)) {
//       this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//       }));
//     } else {
//       alert(`${contact.name} is already in contact)`);
//     }
//   };

//   getFilteredContact = () => {
//     const { contacts, filter } = this.state;
//     console.log(contacts);
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase()),
//     );
//   };

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//       console.log(this.state.contacts);
//     }
//   }

//   render() {
//     return (
//       <div className="App-header">
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter onChange={this.handleChange} />
//         <ContactList
//           contacts={this.getFilteredContact()}
//           removeContact={this.removeContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
