'use client';
import { useEffect, useRef, useState } from 'react';

import StatCard from './StatCard';
import QuizHeader, { TimerRef } from './QuizHeader';
import { shuffleArray } from '@/utils/array';
import Button from './Button';

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

interface OptionsProps {
  answers: string[];
  question: string;
  btnText: string;
  nextQuestion: (finalAnswer: string | null) => void;
}

const OptionsList = ({
  question,
  answers,
  btnText,
  nextQuestion,
}: OptionsProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  console.log('options rerendered');

  const resetOptions = () => {
    nextQuestion(selectedAnswer);
    setSelectedAnswer(null);
  };

  return (
    <>
      <ul>
        {answers.map((answer: string, idx: number) => (
          <li
            key={idx}
            onClick={() => setSelectedAnswer(answer)}
            className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-primary-400 hover:text-white px-3
${selectedAnswer === answer && 'bg-primary-600 text-white'}
`}
          >
            <span>{answer}</span>
          </li>
        ))}
      </ul>
      <div>
        <h3 className='mb-5 text-2xl font-bold'>{question}</h3>

        <Button
          handleClick={resetOptions}
          disabled={selectedAnswer === null}
          text={btnText}
        />
      </div>
    </>
  );
};

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { question, answers, correctAnswer } = questions[activeQuestion];

  const timerRef = useRef<TimerRef>(null);

  useEffect(() => {
    if (!isShuffled) {
      setIsShuffled(true);
      shuffleArray(answers);
      setShuffledOptions(answers);
    }
  }, [answers, isShuffled]);

  const updateResults = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setIsShuffled(false);
      timerRef.current?.resetTimer();
      return;
    }
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
  };

  const nextQuestion = (finalAnswer: string | null) => {
    setResults((prev) =>
      finalAnswer === correctAnswer
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
    updateResults();
  };

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
            <OptionsList
              answers={shuffledOptions}
              question={question}
              nextQuestion={nextQuestion}
              btnText={
                activeQuestion === questions.length - 1
                  ? 'Finish'
                  : 'Next Question →'
              }
            />
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

            <Button
              handleClick={() => window.location.reload()}
              text='Restart Quiz'
              uppercase
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
