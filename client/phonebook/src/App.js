import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Content from './components/Content';
import personService from './services/persons';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loaded, setLoaded] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((personsList) => setPersons(personsList))
      .catch((error) => {
        console.log('Something went wrong!', error);
      });
  }, [persons]);

  useEffect(() => {
    filterPeople();
  }, [searchValue]);

  const addNewName = (event) => {
    event.preventDefault();

    if (newName.trim() === '' && newNumber.trim() === '') {
      return;
    }

    const exist = persons.some((person) => {
      if (person.name.trim() === newName.trim()) {
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = {
            ...person,
            number: newNumber,
          };
          personService
            .update(person.id, updatedPerson)
            .then(() => {
              setMessage(`Phone number is updated for ${person.name}`);
              setPersons(persons);
              setNewName('');
              setNewNumber('');
              removeMessage();
            })
            .catch((error) => {
              console.log(
                "Updating the person's number failed!",
                error.response.data.error
              );
              setError(error.response.data.error);
              removeError();
            });
        }
        return true;
      }
      return false;
    });

    if (!exist) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${newName}`);
          setNewName('');
          setNewNumber('');
          removeMessage();
        })
        .catch((error) => {
          console.log('Adding a new person failed!', error.response.data.error);
          setError(error.response.data.error);
          removeError();
        });
    }
  };

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
    setLoaded(false);
  };

  const filterPeople = () => {
    const result = persons.filter((person) => {
      if (searchValue === '') {
        setLoaded(true);
        return person;
      } else if (
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return person;
      }
    });
    setFiltered(result);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteId(id);
      setPersons(persons);
    }
  };

  const removeMessage = () => {
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const removeError = () => {
    setTimeout(() => {
      setError('');
    }, 10000);
  };

  return (
    <div id="app-container">
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error error={error} />
      <Form
        addNewName={addNewName}
        onChange={(event) => setNewName(event.target.value)}
        onChangeNumber={(event) => setNewNumber(event.target.value)}
        newName={newName}
        newNumber={newNumber}
        searchValue={searchValue}
        onChangeSearch={onChangeSearch}
      />
      {loaded ? <Content persons={persons} deletePerson={deletePerson} /> : ''}
      {!loaded ? (
        <Content persons={filtered} deletePerson={deletePerson} />
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
