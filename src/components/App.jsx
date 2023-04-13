import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { GlobalStyle, Div } from './GlobalStyles';
import { PhonebookForm } from './PhoneBook/PhonebookForm';
import { ContactsLi, FindContact } from './ContactsForm/ContactsForm';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (newContact) => {
    const isName = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`${newContact.name} is already in contacts`);
      return;
    } else {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const changeFilter = (e) => {
    const findName = e.target.value.trim();
    setFilter(findName.toLocaleLowerCase());
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLocaleLowerCase().includes(filter)
  );

  return (
    <Div>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <PhonebookForm addContact={addContact}></PhonebookForm>
      {contacts.length > 0 && (
        <Div>
          <h2>Contacts</h2>
          <FindContact filter={changeFilter} />
          <ContactsLi contacts={filteredContacts} deleteContact={deleteContact} />
        </Div>
      )}
    </Div>
  );
};

 
