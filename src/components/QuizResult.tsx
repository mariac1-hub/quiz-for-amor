
import React from 'react';
import { Heart, RefreshCw, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from './QuizApp';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  questions: Question[];
  userAnswers: number[];
}

const QuizResult = ({ score, totalQuestions, onRestart, questions, userAnswers }: QuizResultProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) {
      return {
        title: "INCRÍVEL! 💕",
        message: "Você me conhece perfeitamente! Sou muito sortuda por ter alguém que presta tanta atenção em mim. Te amo infinito! ✨",
        emoji: "🥰",
        color: "text-pink-600"
      };
    } else if (percentage >= 70) {
      return {
        title: "MUITO BEM! 💖",
        message: "Você me conhece super bem! Algumas coisinhas você ainda vai descobrir, mas já sei que você me ama muito! 😘",
        emoji: "😍",
        color: "text-purple-600"
      };
    } else if (percentage >= 50) {
      return {
        title: "BOM TRABALHO! 💜",
        message: "Você está no caminho certo! Temos muito ainda para descobrir um sobre o outro, e isso é lindo! 🌸",
        emoji: "😊",
        color: "text-blue-600"
      };
    } else {
      return {
        title: "VAMOS CONVERSANDO! 💙",
        message: "Ainda temos muito para descobrir um sobre o outro! Isso significa mais tempo juntinhos aprendendo! 🥺💕",
        emoji: "😅",
        color: "text-indigo-600"
      };
    }
  };

  const result = getResultMessage();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl mb-6">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
            <h1 className={`text-4xl font-bold mb-2 ${result.color}`}>
              {result.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              {result.message}
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="text-yellow-500 w-8 h-8 mr-2" />
              <span className="text-2xl font-bold text-gray-700">
                Sua Pontuação
              </span>
            </div>
            <div className="text-5xl font-bold text-pink-600 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-xl text-gray-600">
              {percentage}% de acertos!
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="gradient-love text-white px-8 py-3 text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Respostas Detalhadas 💕
          </h2>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`p-4 rounded-xl border-2 ${
                  userAnswers[index] === question.correctAnswer
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex items-start mb-2">
                  {userAnswers[index] === question.correctAnswer ? (
                    <Star className="text-green-600 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                  ) : (
                    <Heart className="text-red-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {question.question}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Sua resposta:</span> {question.options[userAnswers[index]]}
                    </p>
                    {userAnswers[index] !== question.correctAnswer && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Resposta correta:</span> {question.options[question.correctAnswer]}
                      </p>
                    )}
                    {question.explanation && (
                      <p className="text-sm text-gray-500 italic">
                        💭 {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;
