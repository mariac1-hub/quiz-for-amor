
import React, { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import ProgressBar from './ProgressBar';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a minha comida favorita?",
    options: ["Pizza", "Sushi", "Pasta", "Hambúrguer"],
    correctAnswer: 1,
    explanation: "Você sempre diz que ama quando pedimos sushi juntos!"
  },
  {
    id: 2,
    question: "Em que data nos conhecemos?",
    options: ["Janeiro 2023", "Março 2023", "Maio 2023", "Julho 2023"],
    correctAnswer: 2,
    explanation: "Foi em maio, lembra? Naquele café que você disse que era o melhor da cidade!"
  },
  {
    id: 3,
    question: "Qual é o meu filme favorito que assistimos juntos?",
    options: ["A Origem", "Titanic", "Vingadores", "La La Land"],
    correctAnswer: 3,
    explanation: "Você chorou no final e disse que era perfeito!"
  },
  {
    id: 4,
    question: "Qual é o meu maior sonho que eu compartilhei com você?",
    options: ["Viajar o mundo", "Ter uma casa na praia", "Escrever um livro", "Ter um cachorro"],
    correctAnswer: 0,
    explanation: "Sempre falamos sobre conhecer novos lugares juntos!"
  },
  {
    id: 5,
    question: "O que mais me deixa feliz quando estamos juntos?",
    options: ["Assistir filmes", "Cozinhar junto", "Passear no parque", "Conversar até tarde"],
    correctAnswer: 3,
    explanation: "Nossas conversas são sempre tão especiais e profundas!"
  },
  {
    id: 6,
    question: "Qual é a música que sempre me faz lembrar de você?",
    options: ["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud - Ed Sheeran", "Make You Feel My Love - Adele"],
    correctAnswer: 1,
    explanation: "Sempre que toca essa música, penso em como você é perfeito para mim!"
  },
  {
    id: 7,
    question: "Qual é o meu maior medo que eu confiei a você?",
    options: ["Altura", "Escuro", "Ficar sozinha", "Aranhas"],
    correctAnswer: 2,
    explanation: "Você sempre me tranquiliza quando me sinto assim."
  },
  {
    id: 8,
    question: "O que eu mais admiro em você?",
    options: ["Sua inteligência", "Seu humor", "Sua gentileza", "Sua determinação"],
    correctAnswer: 2,
    explanation: "Sua gentileza com todos sempre me impressiona e me faz te amar ainda mais!"
  }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  if (showResult) {
    return (
      <div className="min-h-screen gradient-romantic flex items-center justify-center p-4">
        <QuizResult 
          score={score} 
          totalQuestions={questions.length}
          onRestart={resetQuiz}
          questions={questions}
          userAnswers={answers}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-romantic flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-white w-12 h-12 animate-pulse-slow" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Quiz do Amor</h1>
          <p className="text-white/80 text-lg">Quanto você realmente me conhece? 💕</p>
        </div>

        <ProgressBar 
          current={currentQuestion + 1} 
          total={questions.length} 
        />

        <QuizQuestion
          question={questions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
};

export default QuizApp;
