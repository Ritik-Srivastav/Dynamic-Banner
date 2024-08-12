// import React, { useEffect, useState } from 'react';

// const Timer = ({ initialTime, onTimerEnd }) => {
//   const [time, setTime] = useState(initialTime);

//   useEffect(() => {
//     if (time <= 0) {
//       onTimerEnd();
//       return;
//     }

//     const timerId = setInterval(() => {
//       setTime(prevTime => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [time, onTimerEnd]);

//   return (
//     <div className="timer">
//       {time > 0 ? (
//         <span>{Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</span>
//       ) : (
//         <span>Time's Up!</span>
//       )}
//     </div>
//   );
// };

// export default Timer;


import React, { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimerEnd, reset }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime); // Reset the timer when initialTime changes
  }, [initialTime]);

  useEffect(() => {
    if (reset) {
      setTime(initialTime); // Reset the timer if reset flag is true
    }
  }, [reset, initialTime]);

  useEffect(() => {
    if (time <= 0) {
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, onTimerEnd]);

  return (
    <div className="timer">
      {time > 0 ? (
        <span>{Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</span>
      ) : (
        <span>Time's Up!</span>
      )}
    </div>
  );
};

export default Timer;
