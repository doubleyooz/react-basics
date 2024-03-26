'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const secondsToAnswer = 25;

const Quiz: React.FC<QuizProps> = ({ questions, userId }) => {
  const [activeQuestions, setActiveQuestion] = useState(0);
  const [selectAnswer, setSelectAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [remainingTime, setRemainingTime] = useState(secondsToAnswer);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();
    let timer: NodeJS.Timeout;
    if (timerRunning && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime == 0) {
      handleTimeUp();
    }

    return () => clearTimeout(timer);
  }, [timerRunning, remainingTime, handleTimeUp]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };
  const resetTimer = () => {
    setRemainingTime(secondsToAnswer);
  };

  const onAnswerSelected = (answer: string, index: number) => {
    setChecked(true);
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectAnswer(answer);
    } else {
      setSelectAnswer('');
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResults((prev) =>
      selectAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestions !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
      fetch('/api/quizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not working fam');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Quiz results saved successfully:', data);
        })
        .catch((error) => {
          console.error('Error saving quiz results:', error);
        });
    }
    setChecked(false);
    resetTimer();
  };

  return (
    <div className='bg-primary-600 text-white px-4 rounded-md py-1'>
      {remainingTime} seconds to answer
    </div>
  );
};

export default Quiz;
