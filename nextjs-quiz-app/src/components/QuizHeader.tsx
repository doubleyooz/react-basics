'use client';

import { useState, useEffect, RefObject } from 'react';
import { forwardRef, useImperativeHandle } from 'react';

interface TimerProps {
  nextQuestion: (finalAnswer: string | null) => void;
}

export type TimerRef = {
  stopTimer: () => void;
  resetTimer: () => void;
};

interface HeaderProps extends TimerProps {
  questionsLength: number;
  timerRef: RefObject<TimerRef>;
  activeQuestion: number;
}

// eslint-disable-next-line react/display-name
const Timer = forwardRef<TimerRef, TimerProps>(({ nextQuestion }, ref) => {
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  useImperativeHandle(ref, () => ({
    stopTimer: () => {
      stopTimer();
    },
    resetTimer: () => {
      resetTimer();
    },
  }));

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion(null);
    resetTimer();
    startTimer();
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining, handleTimeUp]);
  return (
    <span className='text-white'>
      {timeRemaining} {timeRemaining !== 1 ? 'seconds' : 'second'}
    </span>
  );
});

const QuizHeader = ({
  questionsLength,
  nextQuestion,
  activeQuestion,
  timerRef,
}: HeaderProps) => {
  console.log('header rerendered');

  return (
    <div className='flex xxs:flex-row flex-col xxs:gap-0 gap-4 justify-between mb-10 items-center'>
      <div className='bg-primary-600 text-white px-4 rounded-md py-1'>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questionsLength}</span>
        </h2>
      </div>
      <div className='bg-primary-600 text-white px-4 rounded-md py-1'>
        <Timer nextQuestion={nextQuestion} ref={timerRef} /> to answer
      </div>
    </div>
  );
};

export default QuizHeader;
