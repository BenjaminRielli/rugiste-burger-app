"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useCart } from "@/context/cart-context";
import { BurgerModal } from "@/components/burger-modal";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description:
      "Hamburguesa clásica con lechuga, tomate, cebolla y nuestra salsa especial.",
    price: 450,
    image: "/clasica.png",
  },
  {
    id: 2,
    name: "Rugiste Burger",
    description:
      "Hamburguesa con pepinillos, cheddar, cebolla, ketchup y nuestra salsa especial.",
    price: 470,
    image: "/rugiste.png",
  },
  {
    id: 3,
    name: "Bacon Burger",
    description: "Hamburguesa con panceta, cheddar y cebolla.",
    price: 490,
    image: "/bacon.png",
  },
  {
    id: 4,
    name: "Power Burger",
    description: "Hamburguesa triple carne con lechuga y cheddar.",
    price: 550,
    image: "/power.png",
  },
  {
    id: 5,
    name: "Veggie Burger",
    description:
      "Hamburguesa vegetariana con medallón de vegetales, lechuga, tomate, cebolla y salsa especial.",
    price: 430,
    image: "/veggie.png",
  },
  {
    id: 6,
    name: "Papas Fritas",
    description: "Porción de papas fritas.",
    price: 250,
    image: "/fries.jpeg",
  },
  {
    id: 7,
    name: "Refresco",
    description: "Refresco de 600ml.",
    price: 150,
    image: "/pepsi.webp",
  },
  {
    id: 8,
    name: "Agua",
    description: "Agua mineral sin gas.",
    price: 100,
    image: "/agua.webp",
  },
];

export default function ShopPage() {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenModal = (burger: MenuItem) => {
    setSelectedBurger(burger);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBurger(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({
      title: "Producto agregado correctamente al carrito",
      description: "",
      duration: 2000,
    });
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-6">Nuestro menú</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4 flex flex-col h-full justify-between">
                        <div>
                          <div
                            className="aspect-square relative mb-4 cursor-pointer"
                            onClick={() =>
                              item.name.toLowerCase().includes("burger")
                                ? handleOpenModal(item)
                                : undefined
                            }
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="rounded-t-lg object-cover"
                            />
                          </div>
                          <h3
                            className="text-lg font-semibold cursor-pointer "
                            onClick={() =>
                              item.name.toLowerCase().includes("burger")
                                ? handleOpenModal(item)
                                : undefined
                            }
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-lg font-bold">
                            ${Math.round(item.price)}
                          </p>
                          <Button
                            size="sm"
                            onClick={() =>
                              item.name.toLowerCase().includes("burger")
                                ? handleOpenModal(item)
                                : handleAddToCart(item)
                            }
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="sticky top-24">
                <Card id="my-order">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Mi pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-start"
                            >
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                {item.name.toLowerCase().includes("(custom)") &&
                                  item.description && (
                                    <div className="text-sm text-muted-foreground">
                                      {item.description
                                        .split("\n")
                                        .map((line, i) => (
                                          <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                  )}
                                <p className="text-sm text-muted-foreground">
                                  Cantidad: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${Math.round(item.price * item.quantity)}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between font-bold text-lg">
                          <p>Total</p>
                          <p>${Math.round(cartTotal)}</p>
                        </div>
                        <Button asChild className="w-full mt-4">
                          <Link href="/checkout">Continuar</Link>
                        </Button>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        El carrito está vacío.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BurgerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        burger={selectedBurger}
      />
    </>
  );
}
