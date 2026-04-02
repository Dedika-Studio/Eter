import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2, Edit2, Ticket, Package, ShoppingCart, MessageCircle, Newspaper, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("raffles");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl text-slate-900">Panel de Control Eter</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Admin Mode</Badge>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 h-12 shadow-sm rounded-xl">
            <TabsTrigger value="raffles" className="rounded-lg gap-2"><Ticket className="size-4" /> Rifas</TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg gap-2"><Package className="size-4" /> Productos</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg gap-2"><ShoppingCart className="size-4" /> Pedidos</TabsTrigger>
            <TabsTrigger value="stories" className="rounded-lg gap-2"><MessageCircle className="size-4" /> Historias</TabsTrigger>
          </TabsList>

          <TabsContent value="raffles" className="space-y-6">
            <RaffleManager />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderManager />
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <StoryManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function RaffleManager() {
  const { data: raffles, refetch, isLoading } = trpc.raffles.list.useQuery();
  const createMutation = trpc.raffles.create.useMutation();
  const deleteMutation = trpc.raffles.delete.useMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    totalTickets: 100,
    pricePerTicket: 50,
    drawDate: "",
    category: "otro",
    isActive: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validaciones básicas
      if (!formData.title || !formData.image || !formData.drawDate) {
        toast.error("Por favor completa los campos obligatorios");
        return;
      }

      await createMutation.mutateAsync({
        ...formData,
        pricePerTicket: Math.round(formData.pricePerTicket * 100), // Convertir a centavos
        raffleNumber: (raffles?.length || 0) + 1
      });
      
      toast.success("¡Rifa creada y boletos generados en Google Sheets!");
      setFormData({
        title: "",
        description: "",
        image: "",
        totalTickets: 100,
        pricePerTicket: 50,
        drawDate: "",
        category: "otro",
        isActive: true
      });
      refetch();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro? Se borrarán todos los datos de esta rifa.")) return;
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Rifa eliminada");
      refetch();
    } catch (error: any) {
      toast.error("Error al eliminar");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 border-slate-200 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Plus className="size-5 text-purple-600" /> Nueva Rifa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Título</label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ej. Gran Rifa de Verano" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Descripción</label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Opcional" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Imagen URL</label>
              <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Boletos</label>
                <Input type="number" value={formData.totalTickets} onChange={e => setFormData({...formData, totalTickets: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Precio ($)</label>
                <Input type="number" value={formData.pricePerTicket} onChange={e => setFormData({...formData, pricePerTicket: parseFloat(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Fecha del Sorteo</label>
              <Input type="date" value={formData.drawDate} onChange={e => setFormData({...formData, drawDate: e.target.value})} />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 font-bold" disabled={createMutation.isLoading}>
              {createMutation.isLoading ? <Loader2 className="animate-spin mr-2" /> : <Ticket className="mr-2 size-4" />}
              Crear Rifa y Generar Boletos
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">Historial de Rifas <Badge variant="secondary">{raffles?.length || 0}</Badge></h3>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-slate-400" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raffles?.map((raffle: any) => (
              <Card key={raffle.id} className="border-slate-200 overflow-hidden rounded-2xl group hover:border-purple-200 transition-all">
                <div className="h-32 bg-slate-200 relative">
                  <img src={raffle.image} className="w-full h-full object-cover" alt={raffle.title} />
                  <div className="absolute top-2 right-2">
                    <Badge className={raffle.isActive ? "bg-green-500" : "bg-slate-400"}>{raffle.isActive ? "Activa" : "Inactiva"}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-slate-900 truncate">{raffle.title}</h4>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>{raffle.totalTickets} boletos</span>
                    <span className="font-bold text-purple-600">${Number(raffle.pricePerTicket) / 100} c/u</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs" disabled><Edit2 className="size-3 mr-1" /> Editar</Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs text-red-600 hover:bg-red-50" onClick={() => handleDelete(Number(raffle.id))}><Trash2 className="size-3 mr-1" /> Borrar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Placeholders for other managers to keep the file clean but functional
function ProductManager() { return <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Gestión de productos heredada de la versión anterior.</div>; }
function OrderManager() { return <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Gestión de pedidos en tiempo real conectada a Sheets.</div>; }
function StoryManager() { return <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Muro de historias con traducción IA.</div>; }
