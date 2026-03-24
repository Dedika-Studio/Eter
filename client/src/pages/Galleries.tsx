import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, X, Download, Share2, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Galleries() {
  const [location, navigate] = useLocation();
  const [selectedGallery, setSelectedGallery] = useState<any>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Manejo de Hash para navegación por atrás en móviles
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash && (selectedGallery || selectedPhoto)) {
        setSelectedGallery(null);
        setSelectedPhoto(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [selectedGallery, selectedPhoto]);

  const openGallery = (gallery: any) => {
    setSelectedGallery(gallery);
    window.location.hash = `gallery-${gallery.id}`;
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const openPhoto = (photo: string) => {
    setSelectedPhoto(photo);
    window.location.hash = `photo-${encodeURIComponent(photo.substring(0, 10))}`;
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
    if (selectedGallery) {
      window.location.hash = `gallery-${selectedGallery.id}`;
    } else {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const galleries = [
    {
      id: 1,
      title: "BTS - Colección Especial",
      description: "Galería exclusiva de BTS con sus mejores momentos y sesiones fotográficas.",
      image: "https://imgmedia.larepublica.pe/1000x590/larepublica/original/2021/12/19/61be97f0f0dd9c5007478e90.webp",
      photos: [
        "https://imgmedia.larepublica.pe/1000x590/larepublica/original/2021/12/19/61be97f0f0dd9c5007478e90.webp",
        "https://spanish.korea.net/upload/content/editImage/20200225180114420_SGWR2DLN.jpg",
        "https://www.billboard.com/wp-content/uploads/2026/03/bts-netflix-trailer-2026-billboard-1800.jpg?w=1024",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/BTS_during_a_White_House_press_conference_May_31%2C_2022_%28cropped%29.jpg",
        "https://media.gq.com.mx/photos/69c18d4a4e39de1addf4a4f6/16:9/w_2560%2Cc_limit/arirang-de-bts-pensamientos.jpg",
        "https://oem.com.mx/elsoldemexico/gossip/bts-en-seul-asi-se-vivio-el-regreso-de-la-banda-tras-tres-anos-alejados-de-la-musica-29091262",
        "https://www.jornada.com.mx/ndjsimg/images/jornada/jornadaimg/cuando-se-estrena-bts-the-return-esto-se-sabe-del-nuevo-documental-de-netflix/cuando-se-estrena-bts-the-return-esto-se-sabe-del-nuevo-documental-de-netflix_e5e09480-654d-4502-acd8-d4c3e8e28d67_medialjnimgndimage=fullsize"
      ],
    },
    {
      id: 2,
      title: "BLACKPINK - Pink Venom",
      description: "Galería oficial de BLACKPINK - Pink Venom era",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      photos: [],
    },
    {
      id: 3,
      title: "STRAY KIDS - S-Class",
      description: "Fotos detrás de cámaras de STRAY KIDS",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
      photos: [],
    },
    {
      id: 4,
      title: "TWICE - Set Me Free",
      description: "Colección especial de TWICE - Set Me Free",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      photos: [],
    },
    {
      id: 5,
      title: "NewJeans - Hype Boy",
      description: "Fotos exclusivas de NewJeans",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      photos: [],
    },
    {
      id: 6,
      title: "IVE - I AM Era",
      description: "Galería oficial de IVE - I AM era",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
      photos: [],
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
              onClick={() => openGallery(gallery)}
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
                <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {gallery.photos.length || 0} fotos
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{gallery.title}</h3>
                  <p className="text-sm text-muted-foreground">{gallery.description}</p>
                </div>

                <Button
                  className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Heart className="size-4" />
                  Ver Galería
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={!!selectedGallery} onOpenChange={(open) => !open && closeGallery()}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-3xl">
          <DialogHeader className="p-6 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-black text-slate-900">
                  {selectedGallery?.title}
                </DialogTitle>
                <p className="text-slate-500 text-sm mt-1">
                  {selectedGallery?.description}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeGallery}
                className="rounded-full hover:bg-slate-100"
              >
                <X className="size-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedGallery?.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedGallery.photos.map((photo: string, index: number) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in border-2 border-slate-100 hover:border-purple-400 transition-all shadow-sm hover:shadow-md"
                    onClick={() => openPhoto(photo)}
                  >
                    <img 
                      src={photo} 
                      alt={`Photo ${index + 1}`}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity size-8" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <Images className="size-16 opacity-20" />
                <p className="font-medium">Esta galería aún no tiene fotos.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Detail Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && closePhoto()}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none shadow-none overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closePhoto}
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            >
              <X className="size-6" />
            </Button>
            
            <img 
              src={selectedPhoto || ""} 
              alt="Full view"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl rounded-lg"
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <Button variant="secondary" size="sm" className="rounded-full gap-2 bg-white/10 text-white hover:bg-white/20 border-none backdrop-blur-md">
                <Download className="size-4" />
                Descargar
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full gap-2 bg-white/10 text-white hover:bg-white/20 border-none backdrop-blur-md">
                <Share2 className="size-4" />
                Compartir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Images(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 22H4a2 2 0 0 1-2-2V6" />
      <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
      <circle cx="12" cy="8" r="2" />
      <rect width="16" height="16" x="6" y="2" rx="2" />
    </svg>
  );
}
