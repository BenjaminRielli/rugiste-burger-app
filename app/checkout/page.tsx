"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutModal } from "@/components/checkout-modal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cartItems.length > 0) {
      setIsModalOpen(true);
      clearCart();
    } else {
      alert("El carrito está vacío.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/shop" className="p-2 rounded-full hover:bg-muted">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Volver a la tienda</span>
              </Link>
              <h1 className="text-3xl font-bold">Volver a la tienda</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <RadioGroup
                        defaultValue="delivery"
                        onValueChange={setDeliveryMethod}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="delivery"
                            id="delivery"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="delivery"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            Delivery
                            <span className="text-xs text-muted-foreground mt-1">
                              Entre 20' y 45'
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="takeaway"
                            id="takeaway"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="takeaway"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            Take Away
                            <span className="text-xs text-muted-foreground mt-1">
                              Entre 10' y 20'
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                      {deliveryMethod === "takeaway" && (
                        <div className="w-full text-center text-sm text-muted-foreground my-2">
                          Dirección del local: Av. Brasil 677, Montevideo
                        </div>
                      )}
                      {deliveryMethod === "delivery" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" placeholder="" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input id="address" placeholder="" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">Código Postal</Label>
                            <Input id="zip" placeholder="" required />
                          </div>
                          {/* Payment Method Selection */}
                          <div className="space-y-2 pt-2">
                            <Label className="font-semibold">
                              Método de Pago
                            </Label>
                            <RadioGroup
                              defaultValue="efectivo"
                              className="flex gap-4"
                              name="payment-method"
                            >
                              <div>
                                <RadioGroupItem
                                  value="efectivo"
                                  id="efectivo"
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor="efectivo"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                  Efectivo
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="debito"
                                  id="debito"
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor="debito"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                  Débito/Crédito
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                      <Button type="submit" className="w-full">
                        Finalizar Pedido
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between">
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
                              <p className="font-semibold">
                                {Math.round(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between font-bold text-lg">
                          <p>Total</p>
                          <p>${Math.round(cartTotal)}</p>
                        </div>
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
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deliveryMethod={deliveryMethod}
      />
    </>
  );
}
