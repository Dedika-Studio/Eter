import { useState } from "react";
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
    id: "soobin",
    name: "Soobin",
    realName: "Choi Soo-bin",
    position: "Líder",
    birth: "5 de diciembre de 2000",
    origin: "Ansan, Gyeonggi, Corea del Sur",
    mbti: "ISFP",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    bio: "El líder amable y carismático de TXT. Es conocido por su altura impresionante y sus visuales de 'flower boy'.",
    curiosities: "Es un gran fan de Jin de BTS. Le encanta el pan y la leche de almendras.",
    soloCareer: "MC de Music Bank junto a Arin de Oh My Girl (2020-2021).",
    achievements: "Lideró a TXT a ser el primer grupo de cuarta generación en encabezar Lollapalooza."
  },
  {
    id: "yeonjun",
    name: "Yeonjun",
    realName: "Choi Yeon-jun",
    position: "Rapero, Bailarín, Vocalista",
    birth: "13 de septiembre de 1999",
    origin: "Seúl, Corea del Sur",
    mbti: "ENFP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "Conocido como el '4th Gen It Boy'. Fue el aprendiz número 1 en JYP y BigHit en todas las categorías.",
    curiosities: "Vivió en EE. UU. durante 2 años. Es un apasionado de la moda.",
    soloCareer: "Debut solista con 'GGUM' en 2024. Embajador de Privé Alliance.",
    achievements: "Primer integrante de TXT en debutar oficialmente como solista."
  },
  {
    id: "beomgyu",
    name: "Beomgyu",
    realName: "Choi Beom-gyu",
    position: "Vocalista, Bailarín, Visual",
    birth: "13 de marzo de 2001",
    origin: "Daegu, Corea del Sur",
    mbti: "ISFJ",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    bio: "El creador de ambiente del grupo. Es conocido por su energía inagotable y su habilidad para tocar la guitarra.",
    curiosities: "Fue reclutado en su ciudad natal, Daegu. Le gusta mucho la fotografía.",
    soloCareer: "Participación activa en la composición y producción de canciones del grupo.",
    achievements: "Reconocido por su carisma en programas de variedades y su presencia escénica."
  },
  {
    id: "taehyun",
    name: "Taehyun",
    realName: "Kang Tae-hyun",
    position: "Vocalista Principal",
    birth: "5 de febrero de 2002",
    origin: "Seúl, Corea del Sur",
    mbti: "ESTP",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
    bio: "Conocido por su inteligencia y su voz potente y estable. Es uno de los vocalistas más técnicos de su generación.",
    curiosities: "Habla inglés con fluidez. Le gusta la magia y el boxeo.",
    soloCareer: "Colaboraciones vocales y participación en la escritura de letras.",
    achievements: "Elogiado por su madurez y profesionalismo desde el debut."
  }
];

export default function TxtBiographies() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const toggleMember = (id: string) => {
    setSelectedMember(selectedMember === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-zinc-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white"
          >
            TOMORROW X TOGETHER
          </motion.h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Descubre la magia y el crecimiento de los chicos que están escribiendo su propia historia. Haz clic para ver más.
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
                  selectedMember === member.id ? 'border-cyan-400 ring-4 ring-cyan-400/20' : 'border-zinc-800 hover:border-zinc-600'
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
                    <p className="text-xs text-cyan-400 font-medium uppercase tracking-widest">{member.position.split(',')[0]}</p>
                  </div>
                </div>
                <div className="p-3 flex justify-center bg-black/40">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-zinc-300 hover:text-cyan-400 gap-2"
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
                        <div className="relative rounded-2xl overflow-hidden border-4 border-cyan-400/30 shadow-cyan-400/10 shadow-2xl">
                          <img src={member.image} alt={member.name} className="w-full aspect-square object-cover" />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-cyan-700 text-white px-3 py-1 text-sm font-bold">
                              {member.mbti}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <User className="text-cyan-400 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-500 uppercase font-bold">Nombre Real</p>
                              <p className="font-medium">{member.realName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <Calendar className="text-cyan-400 w-6 h-6" />
                            <div>
                              <p className="text-xs text-zinc-500 uppercase font-bold">Nacimiento</p>
                              <p className="font-medium">{member.birth}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800">
                            <MapPin className="text-cyan-400 w-6 h-6" />
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
                          {member.name} <Sparkles className="text-cyan-400 w-8 h-8" />
                        </h2>
                        <p className="text-cyan-400 font-medium text-lg mb-8">{member.position}</p>

                        <Tabs defaultValue="bio" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 bg-black/50 p-1 rounded-xl border border-zinc-800">
                            <TabsTrigger value="bio" className="data-[state=active]:bg-cyan-700 data-[state=active]:text-white rounded-lg">Bio</TabsTrigger>
                            <TabsTrigger value="solo" className="data-[state=active]:bg-cyan-700 data-[state=active]:text-white rounded-lg">Solo</TabsTrigger>
                            <TabsTrigger value="achievements" className="data-[state=active]:bg-cyan-700 data-[state=active]:text-white rounded-lg">Logros</TabsTrigger>
                            <TabsTrigger value="facts" className="data-[state=active]:bg-cyan-700 data-[state=active]:text-white rounded-lg">Curiosidades</TabsTrigger>
                          </TabsList>
                          
                          <div className="mt-8 min-h-[300px]">
                            <TabsContent value="bio" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Info className="text-cyan-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.bio}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="solo" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Music className="text-cyan-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.soloCareer}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="achievements" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Trophy className="text-cyan-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.achievements}</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="facts" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="flex items-start gap-4">
                                <Heart className="text-cyan-400 w-8 h-8 mt-1 flex-shrink-0" />
                                <p className="text-zinc-300 leading-relaxed text-lg">{member.curiosities}</p>
                              </div>
                            </TabsContent>
                          </div>
                        </Tabs>
                        
                        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
                          <div className="flex gap-4">
                            <Globe className="text-zinc-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                            <Music className="text-zinc-400 hover:text-cyan-400 cursor-pointer transition-colors" />
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
