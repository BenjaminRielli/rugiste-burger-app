"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { useCart } from "@/context/cart-context"
import { BurgerModal } from "@/components/burger-modal"

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
    description: "A juicy beef patty with lettuce, tomato, and our special sauce.",
    price: 9.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Cheese Burger",
    description: "The classic, but with a slice of melted cheddar cheese.",
    price: 10.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Bacon Burger",
    description: "Crispy bacon on top of our classic burger. A savory delight.",
    price: 11.99,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Veggie Burger",
    description: "A delicious plant-based patty for our vegetarian friends.",
    price: 9.99,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Fries",
    description: "Golden and crispy french fries.",
    price: 3.99,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Soda",
    description: "Choose from a selection of refreshing sodas.",
    price: 1.99,
    image: "/placeholder.svg",
  },
]

export default function ShopPage() {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart()
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (burger: MenuItem) => {
    setSelectedBurger(burger)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedBurger(null)
    setIsModalOpen(false)
  }

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
                      <CardContent className="p-4">
                        <div className="aspect-square relative mb-4">
                          <Image src={item.image} alt={item.name} fill className="rounded-t-lg object-cover" />
                        </div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground h-10">{item.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                          <Button
                            size="sm"
                            onClick={() =>
                              item.name.toLowerCase().includes("burger")
                                ? handleOpenModal(item)
                                : addToCart(item)
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
                <Card>
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
                            <div key={item.id} className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                {item.name.toLowerCase().includes("(custom)") &&
                                  item.description && (
                                    <div className="text-sm text-muted-foreground">
                                      {item.description.split("\n").map((line, i) => (
                                        <div key={i}>{line}</div>
                                      ))}
                                    </div>
                                  )}
                                <p className="text-sm text-muted-foreground">
                                  Cantidad: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
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
                          <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <Button asChild className="w-full mt-4">
                          <Link href="/checkout">Continuar</Link>
                        </Button>
                      </>
                    ) : (
                      <p className="text-muted-foreground">El carrito está vacío.</p>
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
  )
} 