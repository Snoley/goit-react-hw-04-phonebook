import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Li, Btn, Input, Labell } from './ContactsFormStyle';

export const ContactsLi = ({ contacts, deleteContact }) => {
  const handleDelete = useCallback((id) => {
    deleteContact(id);
  }, [deleteContact]);

  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <Li key={id}>
          <p>{name}</p>
          <p>{number}</p>
          <Btn type="button" onClick={() => handleDelete(id)}>
            Delete
          </Btn>
        </Li>
      ))}
    </ul>
  );
};

export const FindContact = ({ filter }) => {
  return (
    <Labell>
      <h3>Find contacts by name</h3>
      <Input type="text" onChange={filter} />
    </Labell>
  );
};

FindContact.propTypes = {
  filter: PropTypes.func.isRequired,
};

ContactsLi.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
