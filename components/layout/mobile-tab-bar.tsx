"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function MobileTabBar() {
  const { cartItems } = useCart();
  const pathname = usePathname();
  const itemCount = cartItems.reduce(
    (sum: number, item) => sum + (item.quantity || 1),
    0
  );

  if (pathname === "/checkout") return null;

  const handleScrollToOrder = () => {
    const orderSection = document.getElementById("my-order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Button
      variant="secondary"
      className="fixed bottom-6 right-6 z-50 rounded-full p-0 w-16 h-16 shadow-lg flex items-center justify-center md:hidden"
      onClick={handleScrollToOrder}
    >
      <ShoppingCart className="w-16 h-16" />
      {itemCount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 min-w-[20px] text-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
