import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Brain, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Share2,
  Play,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { toast } from "sonner";

// --- Tipos ---
type QuizType = "trivia" | "personality";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string; value?: string }[];
  correctAnswer?: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  type: QuizType;
  image: string;
  questions: Question[];
}

interface Score {
  name: string;
  score: number;
  total: number;
  date: string;
}

// --- Datos de Ejemplo ---
const QUIZZES: Quiz[] = [
  {
    id: "bts-trivia",
    title: "¿Eres un verdadero ARMY?",
    description: "El examen definitivo sobre la historia y logros de BTS.",
    type: "trivia",
    image: "https://lh3.googleusercontent.com/d/16_3UTSlqrB1VHVIVM4cMMea0n96vm7Is",
    questions: [
      {
        id: 1,
        text: "¿En qué año debutó oficialmente BTS?",
        options: [
          { id: "a", text: "2010" },
          { id: "b", text: "2012" },
          { id: "c", text: "2013" },
          { id: "d", text: "2014" },
        ],
        correctAnswer: "c",
      },
      {
        id: 2,
        text: "¿Cuál fue la primera canción principal (title track) de BTS?",
        options: [
          { id: "a", text: "Boy In Luv" },
          { id: "b", text: "Danger" },
          { id: "c", text: "No More Dream" },
          { id: "d", text: "N.O" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        text: "¿Quién es el líder de BTS?",
        options: [
          { id: "a", text: "Jin" },
          { id: "b", text: "Suga" },
          { id: "c", text: "J-Hope" },
          { id: "d", text: "RM" },
        ],
        correctAnswer: "d",
      },
      {
        id: 4,
        text: "¿Cuál de estas canciones fue completamente en inglés?",
        options: [
          { id: "a", text: "Idol" },
          { id: "b", text: "Fake Love" },
          { id: "c", text: "Dynamite" },
          { id: "d", text: "DNA" },
        ],
        correctAnswer: "c",
      },
      {
        id: 5,
        text: "¿Qué miembro es conocido como 'Worldwide Handsome'?",
        options: [
          { id: "a", text: "Jin" },
          { id: "b", text: "Jimin" },
          { id: "c", text: "V" },
          { id: "d", text: "Jungkook" },
        ],
        correctAnswer: "a",
      }
    ],
  },
  {
    id: "bts-personality",
    title: "¿Con qué integrante de BTS compartes tu energía?",
    description: "Descubre qué miembro de BTS se alinea más con tu personalidad.",
    type: "personality",
    image: "https://lh3.googleusercontent.com/d/16_3UTSlqrB1VHVIVM4cMMea0n96vm7Is",
    questions: [
      {
        id: 1,
        text: "¿Cómo prefieres pasar un día libre?",
        options: [
          { id: "rm", text: "Leyendo un libro o en la naturaleza" },
          { id: "jin", text: "Cocinando o contando chistes" },
          { id: "suga", text: "Durmiendo o produciendo música" },
          { id: "jhope", text: "Bailando o saliendo con amigos" },
          { id: "jimin", text: "Cuidando de los demás" },
          { id: "v", text: "Visitando una galería de arte" },
          { id: "jk", text: "Haciendo ejercicio o jugando" },
        ],
      },
      {
        id: 2,
        text: "¿Cuál es tu estilo de moda?",
        options: [
          { id: "rm", text: "Bohemio y cómodo" },
          { id: "jin", text: "Clásico y elegante" },
          { id: "suga", text: "Todo negro y minimalista" },
          { id: "jhope", text: "Colorido y atrevido" },
          { id: "jimin", text: "Sofisticado y chic" },
          { id: "v", text: "Vintage y artístico" },
          { id: "jk", text: "Deportivo y oversized" },
        ],
      }
    ],
  }
];

const PERSONALITY_RESULTS: Record<string, { name: string; description: string }> = {
  rm: { name: "RM", description: "Eres un líder sabio, reflexivo y amante de la naturaleza." },
  jin: { name: "Jin", description: "Eres divertido, seguro de ti mismo y el alma de la fiesta." },
  suga: { name: "Suga", description: "Eres honesto, trabajador y tienes un gran talento creativo." },
  jhope: { name: "J-Hope", description: "Eres pura energía positiva y siempre iluminas el lugar." },
  jimin: { name: "Jimin", description: "Eres empático, perfeccionista y muy cariñoso." },
  v: { name: "V", description: "Eres un alma artística, única y con un estilo inigualable." },
  jk: { name: "Jungkook", description: "Eres el 'Golden Maknae', talentoso en todo y muy competitivo." },
};

export default function Quizzes() {
  const [, navigate] = useLocation();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState("");
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [view, setView] = useState<"list" | "quiz" | "results" | "leaderboard">("list");

  // Cargar leaderboard de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("eter_leaderboard");
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setView("quiz");
  };

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionId });
    
    if (currentQuestionIndex < (activeQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      setView("results");
    }
  };

  const calculateScore = () => {
    if (!activeQuiz || activeQuiz.type !== "trivia") return 0;
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  const getPersonalityResult = () => {
    if (!activeQuiz || activeQuiz.type !== "personality") return null;
    const counts: Record<string, number> = {};
    Object.values(answers).forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });
    const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return PERSONALITY_RESULTS[winner];
  };

  const saveScore = () => {
    if (!userName.trim()) {
      toast.error("Por favor ingresa tu nombre");
      return;
    }
    const newScore: Score = {
      name: userName,
      score: calculateScore(),
      total: activeQuiz?.questions.length || 0,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem("eter_leaderboard", JSON.stringify(updated));
    toast.success("¡Puntaje guardado!");
    setView("leaderboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/50 p-4">
        <div className="container flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => view === "list" ? navigate("/") : setView("list")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="font-bold text-lg">ETER Challenge</h1>
          <Button variant="ghost" size="sm" onClick={() => setView("leaderboard")}>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </Button>
        </div>
      </header>

      <main className="container py-6 px-4">
        <AnimatePresence mode="wait">
          {/* VISTA: LISTA DE QUIZZES */}
          {view === "list" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6"
            >
              <div className="text-center mb-4">
                <Badge variant="outline" className="mb-2">NUEVO</Badge>
                <h2 className="text-2xl font-bold">Pon a prueba tu pasión</h2>
                <p className="text-muted-foreground">Elige un quiz y demuestra cuánto sabes.</p>
              </div>
              
              {QUIZZES.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => startQuiz(quiz)}>
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${quiz.image})` }} />
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <Badge>{quiz.type === "trivia" ? "Trivia" : "Personalidad"}</Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button className="w-full gap-2">
                      <Play className="h-4 w-4" /> Comenzar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* VISTA: QUIZ EN CURSO */}
          {view === "quiz" && activeQuiz && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Pregunta {currentQuestionIndex + 1} de {activeQuiz.questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}%</span>
                </div>
                <Progress value={((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100} className="h-2" />
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl leading-tight">
                    {activeQuiz.questions[currentQuestionIndex].text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {activeQuiz.questions[currentQuestionIndex].options.map((option) => (
                    <Button 
                      key={option.id} 
                      variant="outline" 
                      className="h-auto py-4 px-6 justify-start text-left whitespace-normal hover:bg-purple-50 hover:border-purple-200 transition-all"
                      onClick={() => handleAnswer(option.id)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* VISTA: RESULTADOS */}
          {view === "results" && activeQuiz && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <Card className="overflow-hidden border-none shadow-2xl">
                <div className="bg-gradient-to-br from-purple-600 to-fuchsia-500 p-8 text-white">
                  <Trophy className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-3xl font-bold mb-2">¡Terminaste!</h2>
                  
                  {activeQuiz.type === "trivia" ? (
                    <div>
                      <p className="text-5xl font-black mb-2">{calculateScore()}/{activeQuiz.questions.length}</p>
                      <p className="opacity-90">¡Increíble esfuerzo!</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-medium opacity-80">Tu resultado es:</p>
                      <p className="text-4xl font-black mt-2">{getPersonalityResult()?.name}</p>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 bg-white">
                  {activeQuiz.type === "personality" && (
                    <p className="text-muted-foreground mb-6 italic">
                      "{getPersonalityResult()?.description}"
                    </p>
                  )}

                  {activeQuiz.type === "trivia" && (
                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-medium">Guarda tu puntaje en el ranking:</p>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Tu nombre o apodo" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <Button onClick={saveScore}>Guardar</Button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="gap-2" onClick={() => setView("list")}>
                      <History className="h-4 w-4" /> Otros Quizzes
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Share2 className="h-4 w-4" /> Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* VISTA: LEADERBOARD */}
          {view === "leaderboard" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-6">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">ETER Top Scores</h2>
                <p className="text-muted-foreground">Los mejores puntajes de la comunidad</p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {leaderboard.length > 0 ? leaderboard.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <span className={`font-bold text-lg w-6 ${i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : ""}`}>
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-bold">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.date}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                          {s.score}/{s.total}
                        </Badge>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-muted-foreground">
                        Aún no hay puntajes. ¡Sé el primero!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Button className="w-full mt-6" variant="outline" onClick={() => setView("list")}>
                Volver a los Quizzes
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
