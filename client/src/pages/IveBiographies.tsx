import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Calendar, 
  MapPin, 
  Star, 
  Music, 
  Trophy, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Heart,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const members = [
  {
    id: "wonyoung",
    name: "Wonyoung",
    realName: "Jang Won-young",
    position: "Vocalista, Visual",
    birth: "31 de agosto de 2004",
    origin: "Seúl, Corea del Sur",
    mbti: "E???",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    bio: "Ex-integrante de IZ*ONE (centro). Es un icono de la moda y una de las ídolos más populares de la cuarta generación.",
    curiosities: "Habla inglés con fluidez. Es conocida como la 'It Girl' de Corea.",
    soloCareer: "Embajadora global de Miu Miu e Innisfree. MC recurrente en eventos importantes.",
    achievements: "Ganadora de Produce 48 a los 13 años."
  },
  {
    id: "yujin",
    name: "Yujin",
    realName: "An Yu-jin",
    position: "Líder, Vocalista Principal, Bailarina Líder",
    birth: "1 de septiembre de 2003",
    origin: "Daejeon, Corea del Sur",
    mbti: "ISTP",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    bio: "Ex-integrante de IZ*ONE. Es conocida por su versatilidad, carisma en el escenario y su participación en programas de variedades.",
    curiosities: "Es muy atlética y buena en los deportes. Habla inglés y japonés básico.",
    soloCareer: "Embajadora de Fendi. Protagonista del programa 'Earth Arcade'.",
    achievements: "Líder exitosa que llevó a IVE a ganar múltiples Daesangs en su primer año."
  },
  {
    id: "rei",
    name: "Rei",
    realName: "Naoi Rei",
    position: "Rapera, Vocalista",
    birth: "3 de febrero de 2004",
    origin: "Nagoya, Japón",
    mbti: "INFJ",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    bio: "La primera integrante japonesa de Starship Entertainment. Es conocida por su estilo único y su fluidez en coreano.",
    curiosities: "Le encanta dibujar y decorar cosas. Sus fans la llaman 'Kim Rei' por lo bien que habla coreano.",
    soloCareer: "Musa de la marca de cosméticos Bonajour.",
    achievements: "Reconocida por su tono de rap distintivo y su creatividad."
  },
  {
    id: "liz",
    name: "Liz",
    realName: "Kim Ji-won",
    position: "Vocalista Principal",
    birth: "21 de noviembre de 2004",
    origin: "Jeju, Corea del Sur",
    mbti: "INFP",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop",
    bio: "Conocida por su potente voz y sus adorables hoyuelos. Es una de las vocalistas más destacadas de la cuarta generación.",
    curiosities: "Es una persona tímida y tranquila. Le encantan los gatos.",
    soloCareer: "Participó en el video musical 'This Christmas' de Taeyeon.",
    achievements: "Elogiada por su técnica vocal estable y emotiva."
  }
];

export default function IveBiographies() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const toggleMember = (id: string) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
          >
            IVE
          </motion.h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Explora el mundo de las chicas que están dominando las listas de éxitos. Haz clic para conocer su historia.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {members.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                  selectedMember === member.id ? 'border-indigo-400 ring-4 ring-indigo-400/20' : 'border-zinc-200 hover:border-indigo-200'
                } bg-white shadow-lg`}
                onClick={() => toggleMember(member.id)}
              >
                <div className="relative aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-indigo-300 font-medium uppercase tracking-widest">{member.position.split(',')[0]}</p>
                  </div>
                </div>
                <div className="p-3 flex justify-center bg-zinc-50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-zinc-600 hover:text-indigo-500 gap-2"
                  >
                    {selectedMember === member.id ? (
                      <>Ocultar <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Ver Biografía <ChevronDown className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Biography Content (Accordion) */}
        <AnimatePresence mode="wait">
          {selectedMember && (
            <motion.div
              key={selectedMember}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {members.filter(m => m.id === selectedMember).map((member) => (
                <Card key={member.id} className="bg-white border-zinc-200 shadow-2xl mb-12 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left Column: Image & Quick Info */}
                      <div className="lg:w-1/3 bg-zinc-50 p-8 space-y-6 border-r border-zinc-100">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <img src={member.image} alt={member.name} className="w-full aspect-square object-cover" />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-indigo-500 text-white px-3 py-1 text-sm font-bold">
                              {member.mbti}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-zinc-100">
                            <User className="text-indigo-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-400 uppercase font-bold">Nombre Real</p>
                              <p className="font-medium text-zinc-800">{member.realName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-zinc-100">
                            <Calendar className="text-indigo-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-400 uppercase font-bold">Nacimiento</p>
                              <p className="font-medium text-zinc-800">{member.birth}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-zinc-100">
                            <MapPin className="text-indigo-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-400 uppercase font-bold">Origen</p>
                              <p className="font-medium text-zinc-800">{member.origin}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Detailed Tabs */}
                      <div className="lg:w-2/3 p-8 md:p-12">
                        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3 text-zinc-900">
                          {member.name} <Sparkles className="text-indigo-400 w-8 h-8" />
                        </h2>
                        <p className="text-indigo-500 font-medium text-lg mb-8">{member.position}</p>

                        <Tabs defaultValue="bio" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 bg-zinc-100 p-1 rounded-xl">
                            <TabsTrigger value="bio" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Bio</TabsTrigger>
                            <TabsTrigger value="solo" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Solo</TabsTrigger>
                            <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Logros</TabsTrigger>
                            <TabsTrigger value="facts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Curiosidades</TabsTrigger>
                          </TabsList>
                          
                          <div className="mt-8 min-h-[250px]">
                            <TabsContent value="bio" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Info className="text-indigo-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-600 leading-relaxed text-lg">{member.bio}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="solo" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Music className="text-indigo-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-600 leading-relaxed text-lg">{member.soloCareer}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="achievements" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Trophy className="text-indigo-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-600 leading-relaxed text-lg">{member.achievements}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="facts" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Heart className="text-indigo-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-600 leading-relaxed text-lg">{member.curiosities}</p>
                              </div>
                            </TabsContent>
                          </div>
                        </Tabs>
                        
                        <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-between items-center">
                          <div className="flex gap-4">
                            <Globe className="text-zinc-400 hover:text-indigo-500 cursor-pointer transition-colors" />
                            <Music className="text-zinc-400 hover:text-indigo-500 cursor-pointer transition-colors" />
                          </div>
                          <Button 
                            onClick={() => setSelectedMember(null)}
                            variant="outline" 
                            className="border-zinc-200 hover:bg-zinc-50 text-zinc-500"
                          >
                            Cerrar Biografía
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
