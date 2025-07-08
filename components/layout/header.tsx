import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted/40 bg-background/80 backdrop-blur-md shadow-lg rounded-b-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/shop" className="flex items-center gap-2">
            <Image
              src="/roar.gif"
              alt="Rugiste Burger Logo"
              width={45}
              height={45}
              className="rounded-full shadow-md"
            />
            <span className="text-2xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              Rugiste Burger
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-base font-semibold">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-primary/80 hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="transition-colors duration-200 hover:text-primary/80 hover:underline underline-offset-4"
            >
              Tienda
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/shop"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    src="/roar.gif"
                    alt="Rugiste Burger Logo"
                    width={45}
                    height={45}
                    className="rounded-full shadow-md"
                  />
                  <span className="text-2xl font-extrabold tracking-tight text-primary drop-shadow-sm">
                    Rugiste Burger
                  </span>
                </Link>
                <Link
                  href="/"
                  className="hover:text-primary/80 hover:underline underline-offset-4"
                >
                  Home
                </Link>
                <SheetClose asChild>
                  <Link
                    href="/shop"
                    className="hover:text-primary/80 hover:underline underline-offset-4"
                  >
                    Tienda
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
