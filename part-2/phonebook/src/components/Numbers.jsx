const Numbers = ({ person, handleDelete }) => {
  return (
    <>
      {person.name} - {person.number} <button onClick={handleDelete}>delete</button>
    </>
  );
};

export default Numbers;
