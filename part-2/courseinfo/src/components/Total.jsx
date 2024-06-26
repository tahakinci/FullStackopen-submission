const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <p style={{ fontWeight: "bold" }}>total of exercises {total} </p>;
};

export default Total;
