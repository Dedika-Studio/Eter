import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Loader2, Plus, Trash2, Edit2, Ticket, Package, ShoppingCart, 
  MessageCircle, Newspaper, Image as ImageIcon, Search, RefreshCw,
  DollarSign, Calendar, Zap, ExternalLink, Images, User, Phone, CheckCircle2, XCircle,
  Smartphone, Wallet, Plane, Car, Gift
} from "lucide-react";
import { raffleThemes, type RaffleCategory } from "@shared/raffleThemes";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("raffles");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 size-10 rounded-xl flex items-center justify-center text-white font-black italic">E</div>
            <h1 className="font-black text-xl text-slate-900 tracking-tighter uppercase">Panel Eter</h1>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-bold px-3 py-1">ADMINISTRADOR</Badge>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto pb-2 custom-scrollbar">
            <TabsList className="bg-white border border-slate-200 p-1 h-12 shadow-sm rounded-2xl w-max md:w-full flex justify-start md:justify-center">
              <TabsTrigger value="raffles" className="rounded-xl gap-2 px-4"><Ticket className="size-4" /> Rifas</TabsTrigger>
              <TabsTrigger value="products" className="rounded-xl gap-2 px-4"><Package className="size-4" /> Productos</TabsTrigger>
              <TabsTrigger value="orders" className="rounded-xl gap-2 px-4"><ShoppingCart className="size-4" /> Pedidos</TabsTrigger>
              <TabsTrigger value="stories" className="rounded-xl gap-2 px-4"><MessageCircle className="size-4" /> Historias</TabsTrigger>
              <TabsTrigger value="news" className="rounded-xl gap-2 px-4"><Newspaper className="size-4" /> Noticias</TabsTrigger>
              <TabsTrigger value="galleries" className="rounded-xl gap-2 px-4"><Images className="size-4" /> Galería</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="raffles" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <RaffleManager />
          </TabsContent>

          <TabsContent value="products" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ProductManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <OrderManager />
          </TabsContent>

          <TabsContent value="stories" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <StoryManager />
          </TabsContent>

          <TabsContent value="news" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <NewsManager />
          </TabsContent>

          <TabsContent value="galleries" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// --- RIFFLE MANAGER ---
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
      if (!formData.title || !formData.image || !formData.drawDate) {
        toast.error("Por favor completa los campos obligatorios");
        return;
      }

      await createMutation.mutateAsync({
        ...formData,
        pricePerTicket: Math.round(formData.pricePerTicket * 100),
        raffleNumber: (raffles?.length || 0) + 1
      });
      
      toast.success("¡Rifa creada y boletos generados!");
      setFormData({
        title: "", description: "", image: "", totalTickets: 100,
        pricePerTicket: 50, drawDate: "", category: "otro", isActive: true
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
      <Card className="lg:col-span-1 border-slate-200 shadow-xl rounded-[2rem] bg-white overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
            <Plus className="size-5 text-purple-600" /> Nueva Rifa
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Título</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ej. Gran Rifa de Verano" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Descripción</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Imagen URL</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Boletos</label>
                <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" type="number" value={formData.totalTickets} onChange={e => setFormData({...formData, totalTickets: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Precio ($)</label>
                <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" type="number" value={formData.pricePerTicket} onChange={e => setFormData({...formData, pricePerTicket: parseFloat(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fecha del Sorteo</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" type="date" value={formData.drawDate} onChange={e => setFormData({...formData, drawDate: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Categoría / Tema</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(raffleThemes).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat as RaffleCategory})}
                    className={`
                      p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                      ${formData.category === cat ? "border-purple-600 bg-purple-50" : "border-slate-100 bg-slate-50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"}
                    `}
                  >
                    <span className="text-lg">{raffleThemes[cat as RaffleCategory].icon}</span>
                    <span className="text-[8px] font-black uppercase tracking-tighter">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest shadow-lg shadow-purple-100 mt-4" disabled={createMutation.isLoading}>
              {createMutation.isLoading ? <Loader2 className="animate-spin mr-2" /> : <Ticket className="mr-2 size-5" />}
              Generar Rifa
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter text-lg">Historial de Rifas <Badge className="bg-slate-900">{raffles?.length || 0}</Badge></h3>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-slate-400" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {raffles?.map((raffle: any) => (
              <Card key={raffle.id} className="border-slate-200 overflow-hidden rounded-[2rem] group hover:border-purple-200 transition-all shadow-sm bg-white">
                <div className="h-40 bg-slate-200 relative">
                  <img src={raffle.image} className="w-full h-full object-cover" alt={raffle.title} />
                  <div className="absolute top-4 right-4">
                    <Badge className={raffle.isActive ? "bg-green-500 font-bold" : "bg-slate-400 font-bold"}>{raffle.isActive ? "ACTIVA" : "INACTIVA"}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-black text-slate-900 truncate uppercase tracking-tighter text-lg">{raffle.title}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Boletos</p>
                      <p className="font-bold text-slate-700">{raffle.totalTickets}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</p>
                      <p className="font-bold text-purple-600">${Number(raffle.pricePerTicket) / 100}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold text-xs" disabled><Edit2 className="size-3 mr-2" /> Editar</Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold text-xs text-red-600 hover:bg-red-50" onClick={() => handleDelete(Number(raffle.id))}><Trash2 className="size-3 mr-2" /> Borrar</Button>
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

// --- PRODUCT MANAGER ---
function ProductManager() {
  const { data: products, refetch, isLoading } = trpc.products.list.useQuery();
  const createMutation = trpc.products.create.useMutation();
  const deleteMutation = trpc.products.delete.useMutation();
  const updateMutation = trpc.products.update.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "", description: "", price: "", image: "", link: "", rating: 5, reviews: 0, badge: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Producto actualizado");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Producto creado");
      }
      setFormData({ title: "", description: "", price: "", image: "", link: "", rating: 5, reviews: 0, badge: "" });
      setEditingId(null);
      refetch();
    } catch (error: any) {
      toast.error("Error al guardar producto");
    }
  };

  const handleEdit = (p: any) => {
    setEditingId(Number(p.id));
    setFormData({
      title: p.title, description: p.description, price: p.price,
      image: p.image, link: p.link, rating: p.rating || 5,
      reviews: p.reviews || 0, badge: p.badge || ""
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 border-slate-200 shadow-xl rounded-[2rem] bg-white overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
            <Plus className="size-5 text-blue-600" /> {editingId ? "Editar Producto" : "Nuevo Producto"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nombre del Producto</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Precio (MXN)</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Ej. 299.00" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Imagen URL</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Link Mercado Libre</label>
              <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest shadow-lg shadow-blue-100 mt-4">
              {editingId ? "Actualizar" : "Crear Producto"}
            </Button>
            {editingId && <Button type="button" variant="ghost" onClick={() => {setEditingId(null); setFormData({title:"", description:"", price:"", image:"", link:"", rating:5, reviews:0, badge:""})}} className="w-full rounded-xl">Cancelar</Button>}
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter text-lg">Productos en Tienda <Badge className="bg-slate-900">{products?.length || 0}</Badge></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products?.map((p: any) => (
            <Card key={p.id} className="bg-white border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="flex p-4 gap-4">
                <img src={p.image} className="size-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 line-clamp-1 text-sm">{p.title}</h4>
                  <p className="text-blue-600 font-black text-sm mt-1">${p.price} MXN</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(p)} className="flex-1 h-8 text-[10px] font-black uppercase">Editar</Button>
                    <Button size="sm" variant="outline" onClick={async () => { if(confirm("¿Borrar?")) { await deleteMutation.mutateAsync({id: Number(p.id)}); refetch(); } }} className="size-8 p-0 text-red-500 hover:bg-red-50"><Trash2 className="size-4" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ORDER MANAGER ---
function OrderManager() {
  const { data: orders, refetch, isLoading } = trpc.orders.getAll.useQuery();
  const deleteMutation = trpc.orders.delete.useMutation();

  return (
    <Card className="border-slate-200 shadow-xl rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 p-6 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
          <ShoppingCart className="size-5 text-emerald-600" /> Gestión de Pedidos
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="rounded-xl gap-2 font-bold h-10 px-4">
          <RefreshCw className="size-4" /> Refrescar
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Cliente</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Boletos</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Total</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Estado</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-right pr-6">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 size-9 rounded-full flex items-center justify-center font-black text-slate-500 text-xs">{order.buyerName[0]}</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{order.buyerName}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{order.buyerPhone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-none font-black text-[10px]">{order.ticketCount} BOLETOS</Badge>
                  </TableCell>
                  <TableCell className="py-4 font-black text-slate-900 text-sm">${order.totalAmount / 100}</TableCell>
                  <TableCell className="py-4">
                    <Badge className={order.status === 'paid' ? 'bg-green-100 text-green-700 border-none font-bold' : 'bg-amber-100 text-amber-700 border-none font-bold'}>
                      {order.status === 'paid' ? <CheckCircle2 className="size-3 mr-1" /> : <Loader2 className="size-3 mr-1 animate-spin" />}
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <Button variant="ghost" size="sm" onClick={async () => { if(confirm("¿Eliminar orden?")) { await deleteMutation.mutateAsync({id: Number(order.id)}); refetch(); } }} className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!orders || orders.length === 0) && (
                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-400 font-medium italic">No hay pedidos registrados todavía.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// --- STORY MANAGER ---
function StoryManager() {
  const { data: stories, refetch, isLoading } = trpc.stories.list.useQuery();
  const deleteMutation = trpc.stories.delete.useMutation();

  return (
    <Card className="border-slate-200 shadow-xl rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 p-6 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
          <MessageCircle className="size-5 text-pink-600" /> Muro de Historias
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="rounded-xl gap-2 font-bold h-10 px-4">
          <RefreshCw className="size-4" /> Actualizar
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Autor</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Historia (Español)</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Traducción (Coreano)</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-right pr-6">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories?.map((story: any, index: number) => (
                <TableRow key={index} className="hover:bg-slate-50/50 border-b border-slate-50">
                  <TableCell className="pl-6 py-4 font-bold text-slate-900 text-sm">{story.nombre}</TableCell>
                  <TableCell className="py-4 text-slate-600 text-xs max-w-xs truncate">{story.historia_es}</TableCell>
                  <TableCell className="py-4 text-slate-400 text-[10px] italic max-w-xs truncate font-medium">{story.historia_ko}</TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <Button variant="ghost" size="sm" onClick={async () => { if(confirm("¿Eliminar historia?")) { await deleteMutation.mutateAsync({id: index + 2}); refetch(); } }} className="h-8 w-8 p-0 text-red-400 hover:text-red-600 rounded-lg">
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// --- NEWS MANAGER ---
function NewsManager() {
  const { data: news, refetch } = trpc.news.adminGetAll.useQuery();
  const runMutation = trpc.news.runAutomation.useMutation();
  const deleteMutation = trpc.news.delete.useMutation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg">Noticias K-Pop</h3>
        <Button onClick={async () => { await runMutation.mutateAsync(); refetch(); }} disabled={runMutation.isLoading} className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl gap-2 font-bold h-11 px-6 shadow-lg shadow-amber-100">
          <Zap className={`size-4 ${runMutation.isLoading ? 'animate-pulse' : ''}`} />
          {runMutation.isLoading ? "Automatizando..." : "Ejecutar IA News"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.map((n: any) => (
          <Card key={n.id} className="bg-white border-slate-200 overflow-hidden rounded-[2rem] group hover:shadow-xl transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img src={n.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 border-none font-black text-[10px] tracking-widest">{n.source}</Badge>
            </div>
            <CardContent className="p-5">
              <h4 className="font-bold text-slate-900 line-clamp-2 text-sm uppercase leading-tight mb-4">{n.title}</h4>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(n.createdAt).toLocaleDateString()}</span>
                <Button variant="ghost" size="sm" onClick={async () => { await deleteMutation.mutateAsync({id: n.id}); refetch(); }} className="h-8 w-8 p-0 text-red-400"><Trash2 className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- GALLERY MANAGER ---
function GalleryManager() {
  const [group, setGroup] = useState("bts");
  const { data: photos, refetch } = trpc.galleries.list.useQuery({ group });
  const addMutation = trpc.galleries.add.useMutation();
  const deleteMutation = trpc.galleries.delete.useMutation();
  const [url, setUrl] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <Card className="lg:col-span-1 border-slate-200 shadow-xl rounded-[2rem] bg-white h-fit">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg">Añadir Foto</h3>
          <div className="space-y-3">
            <select className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold" value={group} onChange={e => setGroup(e.target.value)}>
              <option value="bts">BTS</option>
              <option value="blackpink">BLACKPINK</option>
              <option value="straykids">STRAY KIDS</option>
              <option value="twice">TWICE</option>
            </select>
            <Input className="rounded-xl h-11 bg-slate-50 border-slate-100" placeholder="URL de la Imagen" value={url} onChange={e => setUrl(e.target.value)} />
            <Button className="w-full bg-slate-900 text-white rounded-xl h-12 font-bold" onClick={async () => { await addMutation.mutateAsync({group, url}); setUrl(""); refetch(); }}>Subir Foto</Button>
          </div>
        </CardContent>
      </Card>
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos?.map((p: any) => (
          <div key={p.id} className="relative aspect-square rounded-2xl overflow-hidden group">
            <img src={p.url} className="w-full h-full object-cover" />
            <button onClick={async () => { await deleteMutation.mutateAsync({group, id: p.id}); refetch(); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Trash2 className="size-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
