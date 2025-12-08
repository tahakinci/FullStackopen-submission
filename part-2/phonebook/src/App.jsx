import { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const addNewName = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (!existingPerson) {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson).then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setNewName("");
        setNewNumber("");
      });
    } else {

      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson.id, updatedPerson).then((returned) => {
          setPersons(
            persons.map((p) => (p.id !== existingPerson.id ? p : returned))
          );
          setNewName("");
          setNewNumber("");
        });
      }
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)


  };

  const handleDelete = (id) => {
    personService.erase(id).then(res => {
      setPersons(persons.filter(person => person.id !== res.id))
    })
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        filter show with{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, i) => (
          <li key={`${person.name} - ${i}`}>
            <Numbers person={person} handleDelete={() => handleDelete(person.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
