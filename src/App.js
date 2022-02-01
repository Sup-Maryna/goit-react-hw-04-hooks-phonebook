import "./App.css";
import React, { useState, useEffect } from "react";
import ContactList from "./Components/ContactList/ContactList";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts([newContact, ...contacts]);
  };

  const valuesFilter = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getFilteredContact = () => {
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  const removeContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };
  return (
    <div className="App-header">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={valuesFilter} />
      <ContactList
        contacts={getFilteredContact()}
        removeContact={removeContact}
      />
    </div>
  );
}
