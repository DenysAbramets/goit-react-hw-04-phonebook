import React, { useState, useEffect } from 'react';
import Form from './Contacts/Form/Form';
import Filter from './Contacts/Filter/Filter';
import ListContacts from './Contacts/ListContacts/ListContacts';
import { Title, Container, Caption } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') ?? '')
  );
  const [filter, setFilter] = useState('');

  const onSubmit = data => {
    if (contacts.find(({ name }) => name === data.name)) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts([data, ...contacts]);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      return contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const removeContact = idx => {
    const contactsWithoutRemovedContact = contacts.filter(
      contact => contact.id !== idx
    );
    setContacts(contactsWithoutRemovedContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };
  return (
    <>
      <Title>Phonebook</Title>
      <Form onSubmit={onSubmit} />
      <Container>
        <Caption>Contacts</Caption>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ListContacts contacts={filteredContacts()} onRemove={removeContact} />
      </Container>
    </>
  );
}
