import Part from "./Part";
const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
