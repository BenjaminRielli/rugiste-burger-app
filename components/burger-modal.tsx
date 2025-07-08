"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/cart-context";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface BurgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  burger: MenuItem | null;
}

const ingredients = [
  { id: "bacon", name: "Extra Carne", price: 100 },
  { id: "extra-cheese", name: "Extra Queso", price: 45 },
  { id: "pickles", name: "Extra Cebolla", price: 45 },
  { id: "lettuce", name: "Mayonesa", price: 0 },
  { id: "tomato", name: "Salsa Rugiste", price: 0 },
];

export function BurgerModal({ isOpen, onClose, burger }: BurgerModalProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [totalPrice, setTotalPrice] = useState(burger?.price || 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    if (burger) {
      const ingredientsPrice = selectedIngredients.reduce((total, id) => {
        const ingredient = ingredients.find((ing) => ing.id === id);
        return total + (ingredient?.price || 0);
      }, 0);
      setTotalPrice(burger.price + ingredientsPrice);
    }
  }, [selectedIngredients, burger]);

  useEffect(() => {
    if (burger) {
      setTotalPrice(burger.price);
      setSelectedIngredients([]);
      setComment("");
    }
  }, [burger]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollArrow(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    };
    // Initial check
    setShowScrollArrow(el.scrollHeight > el.clientHeight);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [burger]);

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const handleAddToCart = () => {
    if (burger) {
      const customDescriptionParts = [];
      if (selectedIngredients.length > 0) {
        const ingredientNames = selectedIngredients.map(
          (id) => ingredients.find((ing) => ing.id === id)?.name
        );
        customDescriptionParts.push(`Extra: ${ingredientNames.join(", ")}`);
      }
      if (comment) {
        customDescriptionParts.push(`Nota: ${comment}`);
      }

      const customizedBurger = {
        ...burger,
        id: burger.id + Date.now(),
        name: `${burger.name} ${
          selectedIngredients.length > 0 || comment ? "(Personalizado)" : ""
        }`,
        price: totalPrice,
        description: customDescriptionParts.join("\n"),
      };
      addToCart(customizedBurger);
      toast({
        title: "Producto agregado correctamente al carrito",
        description: "",
        duration: 2000,
      });
      onClose();
    }
  };

  if (!burger) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{burger.name}</DialogTitle>
        </DialogHeader>
        <div
          className="overflow-y-auto max-h-[60vh] md:max-h-none px-1 pb-24 md:pb-0 relative"
          ref={scrollRef}
        >
          {/* Gradient fade and animated scroll arrow */}
          {showScrollArrow && (
            <>
              <div
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 z-20"
                style={{
                  background: "linear-gradient(to top, white 80%, transparent)",
                }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 pointer-events-none flex flex-col items-center">
                <svg
                  className="animate-bounce w-6 h-6 text-gray-400 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="text-xs text-gray-400 mt-1">Scroll</span>
              </div>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="w-full flex justify-center items-center md:block">
              <div className="relative w-32 h-32 md:w-full md:aspect-square md:h-auto">
                <Image
                  src={burger.image}
                  alt={burger.name}
                  fill
                  className="rounded-lg object-contain md:object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                {burger.description}
              </p>
            </div>
          </div>
          {/* Customization section below, full width */}
          <div className="mt-[-12px] md:mt-0">
            <h3 className="text-lg font-semibold mb-2">
              Personalizar Ingredientes
            </h3>
            <div className="space-y-2">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={ingredient.id}
                    onCheckedChange={() =>
                      handleIngredientToggle(ingredient.id)
                    }
                  />
                  <Label htmlFor={ingredient.id} className="flex-1">
                    {ingredient.name}
                  </Label>
                  <span>+${Math.round(ingredient.price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="comment">Notas Adicionales</Label>
              <Textarea
                id="comment"
                placeholder="ej. Sin pepinillos"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Separator />
        <DialogFooter className="flex items-center justify-between sm:justify-between w-full bg-white md:static fixed bottom-0 left-0 right-0 z-10 p-4 md:p-0 border-t md:border-0">
          <p className="text-xl font-bold">Total: ${Math.round(totalPrice)}</p>
          <Button onClick={handleAddToCart}>Añadir al Carrito</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
