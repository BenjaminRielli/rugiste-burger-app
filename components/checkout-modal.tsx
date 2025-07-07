"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Rocket } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter()

  const handleClose = () => {
    onClose()
    router.push("/shop")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">¡Ya rugiste!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <Rocket className="h-16 w-16 text-primary" />
          <p className="text-muted-foreground text-center">
            Tu pedido ha sido realizado con éxito, pronto lo recibirás en tu dirección.
          </p>
        </div>
        <Button onClick={handleClose} className="w-full">
          Volver a la tienda
        </Button>
      </DialogContent>
    </Dialog>
  )
} 