import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";

export default function Galleries() {
  const [, navigate] = useLocation();

  const galleries = [
    {
      id: "bts",
      title: "BTS - Colección Especial",
      description: "Galería exclusiva de BTS con sus mejores momentos y sesiones fotográficas.",
      image: "https://www.billboard.com/wp-content/uploads/2026/03/bts-netflix-trailer-2026-billboard-1800.jpg?w=1024",
      photos: 15,
      path: "/galerias/bts",
      status: "active"
    },
    {
      id: "blackpink",
      title: "BLACKPINK - Pink Venom",
      description: "Galería oficial de BLACKPINK - Pink Venom era",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      photos: 0,
      path: "/galerias/blackpink",
      status: "coming-soon"
    },
    {
      id: "straykids",
      title: "STRAY KIDS - S-Class",
      description: "Fotos detrás de cámaras de STRAY KIDS",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
      photos: 0,
      path: "/galerias/straykids",
      status: "coming-soon"
    },
    {
      id: "twice",
      title: "TWICE - Set Me Free",
      description: "Colección especial de TWICE - Set Me Free",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      photos: 0,
      path: "/galerias/twice",
      status: "coming-soon"
    },
    {
      id: "newjeans",
      title: "NewJeans - Hype Boy",
      description: "Fotos exclusivas de NewJeans",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      photos: 0,
      path: "/galerias/newjeans",
      status: "coming-soon"
    },
    {
      id: "ive",
      title: "IVE - I AM Era",
      description: "Galería oficial de IVE - I AM era",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
      photos: 0,
      path: "/galerias/ive",
      status: "coming-soon"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container flex items-center justify-between h-14">
          <span className="font-bold text-sm tracking-tight">Galerías</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-1 text-xs"
          >
            <ArrowLeft className="size-3" />
            Volver
          </Button>
        </div>
      </header>

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Galerías K-POP</h1>
          <p className="text-muted-foreground">
            Explora nuestras colecciones exclusivas de fotos de tus artistas favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <Card
              key={gallery.id}
              className="bg-white/60 backdrop-blur-xl border-border/50 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate(gallery.path)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                <img
                  src={gallery.image}
                  alt={gallery.title}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                {/* Photo count badge */}
                {gallery.status === "active" ? (
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {gallery.photos} fotos
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-slate-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Próximamente
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{gallery.title}</h3>
                    {gallery.status === "active" && <Sparkles className="size-4 text-amber-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{gallery.description}</p>
                </div>

                <Button
                  className={`w-full gap-2 ${
                    gallery.status === "active" 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                      : "bg-slate-200 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <Heart className={`size-4 ${gallery.status === "active" ? "fill-white" : ""}`} />
                  {gallery.status === "active" ? "Ver Galería" : "Próximamente"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
