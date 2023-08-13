import React from 'react';

import { nanoid } from 'nanoid';

import { FormData } from './Form/FormData';
import { Contacts } from './Form/Contacts';
import { Filter } from './Form/Filter';

import { Container, Title } from './Form/Form.styled';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  console.log(contacts, 'DEBUG 1');

  useEffect(() => {
    const storageContacts = JSON.parse(window.localStorage.getItem('CONTACTS'));
    setContacts([...storageContacts]);
  }, []);

  const handleAddContact = contact => {
    const contactExists = contacts.some(
      existingName =>
        existingName.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${contact.name} is already exist`);
      return;
    }
    // тут мы передаем обьект контакт который представляет собой объект, который содержит информацию о новом контакте, который нужно добавить.
    const id = nanoid();

    window.localStorage.setItem('CONTACTS', JSON.stringify(contacts));
    setContacts(prev => {
      return [
        ...prev,
        {
          ...contact,
          id,
        },
      ];
    });
  };

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
  };

  const getfilteredContacts = () => {
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);

    setContacts(updatedContacts);
    localStorage.setItem('CONTACTS', JSON.stringify(updatedContacts));
  };

  const filteredContacts = getfilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <FormData onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeValue={handleFilterChange} />
      <Contacts
        options={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
