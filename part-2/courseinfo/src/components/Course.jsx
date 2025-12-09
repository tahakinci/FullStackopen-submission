import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
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

export default Course;
