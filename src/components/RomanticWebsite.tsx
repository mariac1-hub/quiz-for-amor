
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Music, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RomanticQuiz from './RomanticQuiz';

const RomanticWebsite = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-scroll to sections smoothly
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSection]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-pink-300/30 animate-float-heart-${i + 1}`}
          size={20 + (i % 3) * 10}
          style={{
            left: `${10 + (i * 12) % 80}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${6 + (i % 3)}s`
          }}
        />
      ))}
    </div>
  );

  if (showQuiz) {
    return <RomanticQuiz onBack={() => setShowQuiz(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 relative overflow-x-hidden">
      <FloatingHearts />
      
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundjay.com/misc/sounds/romantic-piano.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control */}
      <Button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-pink-400/80 hover:bg-pink-500/80 text-white rounded-full p-3"
        size="icon"
      >
        {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </Button>

      {/* Section 1 - Welcome */}
      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-pink-200 animate-fade-in">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <Heart className="mx-auto text-pink-500 w-16 h-16 animate-pulse mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 font-serif">
                Para o dono de todo meu amor
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              Oi meu gatinho, te falei que era só um quiz, mas queria fazer algo diferente. 
              Espero que goste.
            </p>
            
            <Button
              onClick={() => setCurrentSection(2)}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Continuar 💕
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Section 2 - Love Message */}
      {currentSection >= 2 && (
        <section className="min-h-screen flex items-center justify-center px-4 py-12">
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200 animate-scale-in">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-pink-600 mb-6 font-serif">
                  Minha Carta de Amor 💌
                </h2>
                <div className="flex justify-center space-x-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="text-pink-400 w-6 h-6 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  Você é muito importante para mim. Desde que você chegou, me trouxe várias vontades de volta, 
                  fez meus dias mais alegres e nunca me abandonou nos meus momentos difíceis. Você está sempre 
                  comigo — me incentivando, me ajudando e me dando conselhos.
                </p>
                
                <p>
                  Você é o homem que eu sempre pedi a Deus: carinhoso, paciente, esforçado e cheio de força 
                  de vontade para conquistar o que quer. Você merece tudo de bom. Me desculpa pelas vezes que 
                  fui grossa ou brava com você, ou quando pareci deixar a desejar no nosso relacionamento — 
                  saiba que jamais é essa a minha intenção.
                </p>
                
                <p className="text-pink-600 font-semibold text-xl text-center">
                  Eu te amo mais que tudo, e espero que essa nossa conexão nunca mude. Você foi meu primeiro 
                  em várias coisas, e eu tenho muita sorte de poder confiar em você e me permitir sentir as 
                  mais variadas sensações ao seu lado. Eu te amo, meu garoto.
                </p>
              </div>
              
              <div className="text-center mt-8">
                <Button
                  onClick={() => setCurrentSection(3)}
                  className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Agora vamos ao quiz! 🎯
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Section 3 - Quiz Introduction */}
      {currentSection >= 3 && (
        <section className="min-h-screen flex items-center justify-center px-4 py-12">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200 animate-fade-in">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-pink-600 mb-6 font-serif">
                O quanto você me conhece? 🤔💕
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Agora é a hora de testar seus conhecimentos sobre mim! 
                São 7 perguntinhas especiais sobre nós dois. Vamos ver se você prestou atenção! 😉
              </p>
              
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Começar Quiz! 💖
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default RomanticWebsite;
