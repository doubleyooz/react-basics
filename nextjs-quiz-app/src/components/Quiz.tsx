'use client';
import { useRef, useState } from 'react';

import StatCard from './StatCard';
import QuizHeader, { TimerRef } from './QuizHeader';

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer('');
    }
  };

  const timerRef = useRef<TimerRef>(null);

  const { question, answers, correctAnswer } = questions[activeQuestion];

  const nextQuestion = () => {
    setResults((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      timerRef.current?.resetTimer();
    } else {
      setShowResults(true);
      timerRef.current?.stopTimer();
      fetch('/api/quizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not working');
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
  };

  //shuffleArray(answers);

  return (
    <div className='min-h-[500px]'>
      <div className='max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col'>
        {!showResults ? (
          <>
            <QuizHeader
              activeQuestion={activeQuestion}
              nextQuestion={nextQuestion}
              timerRef={timerRef}
              questionsLength={questions.length}
            />
            <ul>
              {answers.map((answer: string, idx: number) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-primary-600 hover:text-white px-3
      ${selectedAnswerIndex === idx && 'bg-primary-600 text-white'}
      `}
                >
                  <span>{answer}</span>
                </li>
              ))}
            </ul>
            <div>
              <h3 className='mb-5 text-2xl font-bold'>{question}</h3>

              <button
                onClick={nextQuestion}
                className={`font-bold transition duration-300 ease-in-out ${selectedAnswerIndex === null ? 'text-dark-300' : ' cursor-pointer'}`}
              >
                {activeQuestion === questions.length - 1
                  ? 'Finish'
                  : 'Next Question →'}
              </button>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <h3 className='text-2xl uppercase mb-10'>Results 📈</h3>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-10'>
              <StatCard
                title='Percentage'
                value={`${(results.score / 50) * 100}%`}
              />
              <StatCard title='Total Questions' value={questions.length} />
              <StatCard title=' Total Score' value={results.score} />
              <StatCard
                title='Correct Answers'
                value={results.correctAnswers}
              />
              <StatCard title='Wrong Answers' value={results.wrongAnswers} />
            </div>
            <button
              onClick={() => window.location.reload()}
              className='mt-10 font-bold uppercase'
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
