import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ statistics }) => {
  const all = statistics.good + statistics.neutral + statistics.bad;

  if (all === 0) return <p>No feedback given</p>;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={statistics.good} />
          <StatisticLine text="Neutral" value={statistics.neutral} />
          <StatisticLine text="Bad" value={statistics.bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine
            text="Average"
            value={(statistics.good - statistics.bad) / all}
          />
          <StatisticLine
            text="Positive"
            value={(statistics.good / all) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
