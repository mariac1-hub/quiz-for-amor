
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from './QuizApp';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  questionNumber,
  totalQuestions
}: QuizQuestionProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl animate-float">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Pergunta {questionNumber} de {totalQuestions}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                selectedAnswer === index
                  ? 'border-pink-500 bg-pink-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
            selectedAnswer !== null
              ? 'gradient-love text-white hover:shadow-lg transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {questionNumber === totalQuestions ? 'Ver Resultado' : 'Próxima'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
