import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { Fragment } from "react";

const Course = (props) => {
  let total;
  return (
    <>
      {props.courses.map((course) => {
        total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
        return (
          <Fragment key={course.name}>
            <Header header={course.name} />
            <Content course={course} />
          </Fragment>
        );
      })}
      <Total total={total} />
    </>
  );
};

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          name: "State of a component",
          exercises: 14,
        },
      ],
    },
  ];

  return (
    <div>
      <Course courses={course} />
    </div>
  );
};

export default App;
