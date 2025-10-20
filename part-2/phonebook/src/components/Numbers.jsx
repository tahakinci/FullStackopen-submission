const Numbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <li key={`${person.name} - ${i}`}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Numbers;
