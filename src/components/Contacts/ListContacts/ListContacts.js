import React from 'react';
import PropTypes from 'prop-types';
import { Button, Description, List, ListItem } from './List.Contacts.styled';

const ListContacts = ({ contacts, onRemove }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <Description>
            {name}: {number}
          </Description>
          <Button data-id={id} onClick={() => onRemove(id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ListContacts;
