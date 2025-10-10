import { useState } from "react";
import Statistics from "./components/Statistics";

const App = () => {
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodButtonClick = () => {
    setStatistics({ ...statistics, good: statistics.good + 1 });
  };

  const handleNeutralButtonClick = () => {
    setStatistics({ ...statistics, neutral: statistics.neutral + 1 });
  };

  const handleBadButtonClick = () => {
    setStatistics({ ...statistics, bad: statistics.bad + 1 });
  };

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <div>
          <button onClick={handleGoodButtonClick}>good</button>
          <button onClick={handleNeutralButtonClick}>neutral</button>
          <button onClick={handleBadButtonClick}>bad</button>
        </div>
      </div>
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
