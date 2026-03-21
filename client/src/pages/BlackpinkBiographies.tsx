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
    id: "jisoo",
    name: "Jisoo",
    realName: "Kim Ji-soo",
    position: "Vocalista Líder, Visual",
    birth: "3 de enero de 1995",
    origin: "Gunpo, Gyeonggi, Corea del Sur",
    mbti: "ISTP",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    bio: "Jisoo debutó como solista el 31 de marzo de 2023 con el álbum 'ME'. En 2024, fundó su propia agencia, BLISOO, y se unió a Warner Music para su carrera global. Es conocida por su elegancia y talento actoral, habiendo protagonizado el drama 'Snowdrop'.",
    curiosities: "Tiene un perro llamado Dalgom. Es cinturón blanco en taekwondo. Es muy cercana a Nayeon de TWICE.",
    soloCareer: "Álbum 'ME' con el éxito 'Flower'. Proyectos actorales destacados.",
    achievements: "Embajadora global de Dior y Cartier. Primera solista de K-pop en ganar múltiples premios en programas musicales con su debut."
  },
  {
    id: "jennie",
    name: "Jennie",
    realName: "Jennie Kim",
    position: "Rapera Principal, Vocalista",
    birth: "16 de enero de 1996",
    origin: "Seúl, Corea del Sur",
    mbti: "INFP",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    bio: "Jennie fue la primera integrante en debutar como solista con 'SOLO' en 2018. Fundó su propia discográfica, ODD ATELIER (OA), en 2023. Vivió en Nueva Zelanda durante 5 años, lo que le dio fluidez en inglés.",
    curiosities: "Le encantan los perros, tiene dos llamados Kai y Kuma. Es conocida como la 'Human Chanel'.",
    soloCareer: "Sencillos 'SOLO', 'You & Me' y colaboraciones internacionales como 'One of the Girls'.",
    achievements: "Embajadora global de Chanel y Calvin Klein. Primera solista coreana en presentarse en Coachella."
  },
  {
    id: "rose",
    name: "Rosé",
    realName: "Roseanne Park / Park Chae-young",
    position: "Vocalista Principal, Bailarina Líder",
    birth: "11 de febrero de 1997",
    origin: "Auckland, Nueva Zelanda",
    mbti: "ENFP",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    bio: "Rosé debutó como solista en 2021 con '-R-'. En 2024, firmó con THE BLACK LABEL y Atlantic Records. Es reconocida por su voz única y su habilidad para tocar la guitarra y el piano.",
    curiosities: "Tiene un perro rescatado llamado Hank. Sabe hablar coreano, inglés y japonés con fluidez.",
    soloCareer: "Álbum '-R-' con 'On The Ground' y 'Gone'. Colaboración 'APT.' con Bruno Mars.",
    achievements: "Embajadora global de Saint Laurent y Tiffany & Co. Récord Guinness por la mayor cantidad de vistas en 24h para un solista de K-pop."
  },
  {
    id: "lisa",
    name: "Lisa",
    realName: "Lalisa Manobal",
    position: "Bailarina Principal, Rapera Líder",
    birth: "27 de marzo de 1997",
    origin: "Provincia de Buriram, Tailandia",
    mbti: "ESFJ",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    bio: "Lisa debutó como solista en 2021 con 'Lalisa'. En 2024, fundó LLOUD y firmó con RCA Records. Es la primera artista no coreana de YG Entertainment y una de las bailarinas más influyentes del mundo.",
    curiosities: "Tiene 5 gatos y un perro (la 'L Family'). Habla tailandés, coreano, inglés y japonés.",
    soloCareer: "Sencillos 'Lalisa', 'Money', 'Rockstar', 'New Woman' y 'Moonlit Floor'.",
    achievements: "Embajadora global de Celine y Bulgari. Ganadora de múltiples premios MTV VMA como Mejor K-Pop."
  }
];

export default function BlackpinkBiographies() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const toggleMember = (id: string) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-white"
          >
            BLACKPINK
          </motion.h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Explora la trayectoria individual de las reinas del K-Pop. Haz clic en cada integrante para descubrir su historia completa.
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
                  selectedMember === member.id ? 'border-pink-500 ring-4 ring-pink-500/20' : 'border-zinc-800 hover:border-zinc-600'
                } bg-zinc-900/50 backdrop-blur-sm`}
                onClick={() => toggleMember(member.id)}
              >
                <div className="relative aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-pink-400 font-medium uppercase tracking-widest">{member.position.split(',')[0]}</p>
                  </div>
                </div>
                <div className="p-3 flex justify-center bg-black/40">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-zinc-300 hover:text-pink-400 gap-2"
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
                <Card key={member.id} className="bg-zinc-900/80 border-zinc-700 backdrop-blur-md shadow-2xl mb-12">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                      {/* Left Column: Quick Info */}
                      <div className="lg:w-1/3 space-y-6">
                        <div className="relative rounded-2xl overflow-hidden border-4 border-pink-500/30 shadow-pink-500/10 shadow-2xl">
                          <img src={member.image} alt={member.name} className="w-full aspect-square object-cover" />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-pink-600 text-white px-3 py-1 text-sm font-bold">
                              {member.mbti}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <User className="text-pink-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-500 uppercase font-bold">Nombre Real</p>
                              <p className="font-medium">{member.realName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <Calendar className="text-pink-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-500 uppercase font-bold">Nacimiento</p>
                              <p className="font-medium">{member.birth}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <MapPin className="text-pink-500 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-500 uppercase font-bold">Origen</p>
                              <p className="font-medium">{member.origin}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Detailed Tabs */}
                      <div className="lg:w-2/3">
                        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                          {member.name} <Sparkles className="text-pink-500 w-8 h-8" />
                        </h2>
                        <p className="text-pink-400 font-medium text-lg mb-8">{member.position}</p>

                        <Tabs defaultValue="bio" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 bg-black/50 p-1 rounded-xl border border-zinc-800">
                            <TabsTrigger value="bio" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white rounded-lg">Bio</TabsTrigger>
                            <TabsTrigger value="solo" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white rounded-lg">Solo</TabsTrigger>
                            <TabsTrigger value="achievements" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white rounded-lg">Logros</TabsTrigger>
                            <TabsTrigger value="facts" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white rounded-lg">Curiosidades</TabsTrigger>
                          </TabsList>
                          
                          <div className="mt-8 min-h-[300px]">
                            <TabsContent value="bio" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Info className="text-pink-500 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.bio}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="solo" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Music className="text-pink-500 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.soloCareer}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="achievements" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Trophy className="text-pink-500 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.achievements}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="facts" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Heart className="text-pink-500 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.curiosities}</p>
                              </div>
                            </TabsContent>
                          </div>
                        </Tabs>
                        
                        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
                          <div className="flex gap-4">
                            <Globe className="text-zinc-500 hover:text-pink-500 cursor-pointer transition-colors" />
                            <Music className="text-zinc-500 hover:text-pink-500 cursor-pointer transition-colors" />
                          </div>
                          <Button 
                            onClick={() => setSelectedMember(null)}
                            variant="outline" 
                            className="border-zinc-700 hover:bg-zinc-800 text-zinc-400"
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
