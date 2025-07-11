"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryMethod?: string;
}

export function CheckoutModal({ isOpen, onClose, deliveryMethod }: CheckoutModalProps) {
  const router = useRouter()

  const handleClose = () => {
    onClose()
    router.push("/shop")
  }

  const isTakeAway = deliveryMethod === "takeaway"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">¡Ya rugiste!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <Image src="/roar.png" alt="Success" width={120} height={120} />
          <p className="text-muted-foreground text-center">
            {isTakeAway
              ? "Puedes pasar a retirar tu pedido por el local."
              : "Tu pedido ha sido realizado con éxito, pronto lo recibirás en tu dirección."}
          </p>
        </div>
        <Button onClick={handleClose} className="w-full">
          Volver a la tienda
        </Button>
      </DialogContent>
    </Dialog>
  )
} 