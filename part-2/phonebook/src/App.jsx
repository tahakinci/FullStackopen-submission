import { useState } from "react";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    if (!persons.find((person) => person.name == newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      return;
    }
    window.alert(`${newName} is already added to phonebook`);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers persons={filteredPersons} />
    </div>
  );
};

export default App;
