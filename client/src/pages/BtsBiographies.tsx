import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Star, Info, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BtsBiographies() {
  const [, navigate] = useLocation();

  const members = [
    {
      id: "rm",
      stageName: "RM",
      realName: "Kim Nam-joon",
      position: "Líder, Rapero Principal",
      birthday: "12 de Septiembre, 1994",
      birthplace: "Ilsan, Gyeonggi-do, Corea del Sur",
      mbti: "ENTP",
      description: "RM es el líder de BTS y fue el primer miembro en unirse al grupo. Es conocido por su increíble habilidad para el rap, su inteligencia (IQ de 148) y por ser el portavoz principal del grupo en el extranjero gracias a su fluidez en inglés. Ha producido y escrito más de 160 canciones.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-blue-500",
    },
    {
      id: "jin",
      stageName: "Jin",
      realName: "Kim Seok-jin",
      position: "Sub-Vocalista, Visual",
      birthday: "4 de Diciembre, 1992",
      birthplace: "Anyang, Gyeonggi-do, Corea del Sur",
      mbti: "INTP",
      description: "Conocido como 'Worldwide Handsome', Jin es el miembro mayor de BTS. Además de su voz estable y emotiva, es famoso por su sentido del humor y su amor por la cocina. Fue descubierto por su apariencia mientras bajaba de un autobús y se unió a Big Hit para ser actor antes de convertirse en idol.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-pink-400",
    },
    {
      id: "suga",
      stageName: "Suga / Agust D",
      realName: "Min Yoon-gi",
      position: "Rapero Líder",
      birthday: "9 de Marzo, 1993",
      birthplace: "Buk-gu, Daegu, Corea del Sur",
      mbti: "ISTP",
      description: "Suga es un prolífico productor y rapero. Antes de BTS, era un rapero underground conocido como Gloss. Es admirado por su honestidad en sus letras, abordando temas de salud mental y superación. Bajo su alias Agust D, ha lanzado mixtapes aclamados por la crítica.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-slate-700",
    },
    {
      id: "j-hope",
      stageName: "J-Hope",
      realName: "Jung Ho-seok",
      position: "Bailarín Principal, Rapero, Vocalista",
      birthday: "18 de Febrero, 1994",
      birthplace: "Gwangju, Corea del Sur",
      mbti: "ESFJ",
      description: "J-Hope es el 'rayo de sol' del grupo. Antes de debutar, era un bailarín callejero famoso en su ciudad natal. Es el capitán de baile de BTS, encargado de guiar las coreografías. Su energía positiva y su estilo único de rap y baile son fundamentales para la identidad del grupo.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-green-500",
    },
    {
      id: "jimin",
      stageName: "Jimin",
      realName: "Park Ji-min",
      position: "Bailarín Principal, Vocalista Líder",
      birthday: "13 de Octubre, 1995",
      birthplace: "Busan, Corea del Sur",
      mbti: "ESTP",
      description: "Jimin destaca por su danza contemporánea y su voz de registro alto. Fue el último miembro en unirse a BTS tras entrenar solo por un año. Es conocido por su perfeccionismo y su gran carisma en el escenario, además de ser considerado uno de los miembros más cariñosos del grupo.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-yellow-400",
    },
    {
      id: "v",
      stageName: "V",
      realName: "Kim Tae-hyung",
      position: "Sub-Vocalista, Visual",
      birthday: "30 de Diciembre, 1995",
      birthplace: "Daegu, Corea del Sur",
      mbti: "ENTP",
      description: "V posee una voz barítona profunda y única. Es conocido por su estilo artístico, su amor por la fotografía y el jazz. Ha incursionado en la actuación (Hwarang) y es frecuentemente elogiado por su expresividad facial en las presentaciones. Fue el 'miembro secreto' de BTS hasta poco antes del debut.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-purple-500",
    },
    {
      id: "jungkook",
      stageName: "Jungkook",
      realName: "Jeon Jung-kook",
      position: "Vocalista Principal, Bailarín Líder, Centro, Maknae",
      birthday: "1 de Septiembre, 1997",
      birthplace: "Busan, Corea del Sur",
      mbti: "INTP",
      description: "El 'Golden Maknae' (menor de oro) por ser bueno en todo: canto, baile, rap y deportes. Se unió a Big Hit a los 15 años tras ser buscado por múltiples agencias. Es el miembro con más ventas como solista y es admirado por su constante crecimiento artístico y su pasión.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", // Placeholder
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/biografias")}
              className="rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="font-bold text-xl tracking-tight">Biografía de BTS</h1>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            7 Miembros
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=80" // Placeholder for group photo
          alt="BTS Group"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">BANGTAN SONYEONDAN</h2>
          <p className="max-w-2xl text-lg md:text-xl text-slate-200 font-medium">
            Más que un grupo de música, un fenómeno global que ha redefinido el K-Pop y la industria musical mundial.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <main className="container py-12 px-4">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Los Integrantes</h3>
          <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member) => (
            <Card key={member.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.stageName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 opacity-20 ${member.color}`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{member.position}</p>
                  <h4 className="text-2xl font-black">{member.stageName}</h4>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Star className="size-4 text-purple-500" />
                    <span className="font-semibold">Nombre:</span> {member.realName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="size-4 text-purple-500" />
                    <span className="font-semibold">Nacimiento:</span> {member.birthday}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="size-4 text-purple-500" />
                    <span className="font-semibold">Origen:</span> {member.birthplace}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Info className="size-4 text-purple-500" />
                    <span className="font-semibold">MBTI:</span> {member.mbti}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{member.description}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Group History Section */}
        <section className="mt-24 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                <Music className="size-4" /> HISTORIA DEL GRUPO
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">Desde 2013 hasta la Eternidad</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                BTS debutó el 13 de junio de 2013 con el álbum "2 Cool 4 Skool". Aunque comenzaron con un estilo hip-hop agresivo, su música evolucionó para abarcar diversos géneros y temas profundos como el amor propio, la salud mental y el empoderamiento juvenil.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Han roto innumerables récords mundiales, siendo el primer grupo coreano en encabezar la lista Billboard 200 y en recibir nominaciones al Grammy. Su impacto va más allá de la música, colaborando con UNICEF en la campaña "Love Myself" y hablando ante la Asamblea General de las Naciones Unidas.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <p className="text-2xl font-black text-purple-600">2013</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Año de Debut</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <p className="text-2xl font-black text-purple-600">6+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Récords Guinness</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <p className="text-2xl font-black text-purple-600">ARMY</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Fandom Global</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80" 
                  alt="BTS Concert" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Space */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 ETER K-POP MX - Biografías Oficiales</p>
      </footer>
    </div>
  );
}
