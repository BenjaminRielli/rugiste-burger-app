"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { useState, useEffect } from "react"
import Image from "next/image"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface BurgerModalProps {
  isOpen: boolean
  onClose: () => void
  burger: MenuItem | null
}

const ingredients = [
  { id: "lettuce", name: "Lettuce", price: 0.5 },
  { id: "tomato", name: "Tomato", price: 0.5 },
  { id: "onions", name: "Onions", price: 0.5 },
  { id: "pickles", name: "Pickles", price: 0.5 },
  { id: "bacon", name: "Bacon", price: 1.5 },
  { id: "extra-cheese", name: "Extra Cheese", price: 1.0 },
]

export function BurgerModal({ isOpen, onClose, burger }: BurgerModalProps) {
  const { addToCart } = useCart()
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [totalPrice, setTotalPrice] = useState(burger?.price || 0)

  useEffect(() => {
    if (burger) {
      const ingredientsPrice = selectedIngredients.reduce((total, id) => {
        const ingredient = ingredients.find((ing) => ing.id === id)
        return total + (ingredient?.price || 0)
      }, 0)
      setTotalPrice(burger.price + ingredientsPrice)
    }
  }, [selectedIngredients, burger])

  useEffect(() => {
    if (burger) {
      setTotalPrice(burger.price)
      setSelectedIngredients([])
      setComment("")
    }
  }, [burger])

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const handleAddToCart = () => {
    if (burger) {
      const customDescriptionParts = []
      if (selectedIngredients.length > 0) {
        const ingredientNames = selectedIngredients.map(
          (id) => ingredients.find((ing) => ing.id === id)?.name
        )
        customDescriptionParts.push(`Extra: ${ingredientNames.join(", ")}`)
      }
      if (comment) {
        customDescriptionParts.push(`Nota: ${comment}`)
      }

      const customizedBurger = {
        ...burger,
        id: burger.id + Date.now(),
        name: `${burger.name} ${
          selectedIngredients.length > 0 || comment ? "(Personalizado)" : ""
        }`,
        price: totalPrice,
        description: customDescriptionParts.join("\n"),
      }
      addToCart(customizedBurger)
      onClose()
    }
  }

  if (!burger) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{burger.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="aspect-square relative">
            <Image
              src={burger.image}
              alt={burger.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Personalizar Ingredientes</h3>
            <div className="space-y-2">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={ingredient.id}
                    onCheckedChange={() => handleIngredientToggle(ingredient.id)}
                  />
                  <Label htmlFor={ingredient.id} className="flex-1">
                    {ingredient.name}
                  </Label>
                  <span>+${ingredient.price.toFixed(2)}</span>
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
        <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <Button onClick={handleAddToCart}>Añadir al Carrito</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 