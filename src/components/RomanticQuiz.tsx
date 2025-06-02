
import React, { useState } from 'react';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quando a gente começou a namorar?",
    options: ["28/12/2024", "29/12/2024", "30/12/2024", "31/12/2024"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Qual é o meu nome completo?",
    options: ["Maria Clara Santos", "Maria Clara Costa Santos", "Maria Clara Costa", "Clara Maria Santos"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Qual a data do meu aniversário?",
    options: ["10/03", "11/03", "12/03", "13/03"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Qual é a minha comida preferida?",
    options: ["Pizza", "Macarrão", "Hambúrguer", "Sushi"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Qual meu gênero de filme preferido?",
    options: ["Romance", "Comédia", "Terror", "Ação"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Quando foi a primeira vez que a gente fez ligação?",
    options: ["07/11/2024", "08/11/2024", "09/11/2024", "10/11/2024"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Qual meu suco preferido?",
    options: ["Laranja", "Uva", "Tamarindo", "Maracujá"],
    correctAnswer: 2
  }
];

interface RomanticQuizProps {
  onBack: () => void;
}

const RomanticQuiz = ({ onBack }: RomanticQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
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

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "PERFEITO! Você me conhece completamente! 🥰💕";
    if (percentage >= 80) return "MUITO BEM! Você me conhece super bem! 😍💖";
    if (percentage >= 60) return "LEGAL! Você sabe bastante sobre mim! 😊💜";
    return "Temos que conversar mais! Mas te amo do mesmo jeito! 🥺💙";
  };

  if (showFinalMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              {[...Array(10)].map((_, i) => (
                <Heart key={i} className="inline-block text-pink-400 w-6 h-6 mx-1 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            
            <h2 className="text-3xl font-bold text-pink-600 mb-6 font-serif">
              Mensagem Final 💌
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              É isso, meu gatinho. Só queria fazer algo diferente mesmo, porque o meu desejo 
              é te conquistar todos os dias, mais e mais.
            </p>
            
            <div className="text-6xl mb-8 animate-bounce">
              Te amo 💌
            </div>
            
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
                  ✨
                </div>
              ))}
            </div>
            
            <Button
              onClick={onBack}
              className="mt-8 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 text-lg font-semibold rounded-full"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Star className="mx-auto text-yellow-500 w-16 h-16 animate-spin-slow mb-4" />
              <h2 className="text-3xl font-bold text-pink-600 mb-4 font-serif">
                Resultado do Quiz! 🎯
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mb-6">
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-lg text-gray-700 font-medium">
                {getScoreMessage()}
              </p>
            </div>
            
            <Button
              onClick={() => setShowFinalMessage(true)}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Ver mensagem final 💕
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Button>
          
          <div className="text-sm text-pink-600 mb-2">
            Pergunta {currentQuestion + 1} de {questions.length}
          </div>
          <div className="w-full bg-pink-200/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedAnswer === index
                      ? 'border-pink-400 bg-pink-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-25'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-pink-400 bg-pink-400'
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
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full py-3 text-lg font-semibold transition-all duration-300 rounded-full ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <Heart className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RomanticQuiz;
