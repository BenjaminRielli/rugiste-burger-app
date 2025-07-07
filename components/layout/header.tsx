import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/rugisteburger.png" alt="Rugiste Burger Logo" width={45} height={45} />
            <span className="text-xl font-bold">Rugiste Burger</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/shop" className="transition-colors hover:text-primary">
              Shop
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
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Image src="/rugisteburger.png" alt="Rugiste Burger Logo" width={45} height={45} />
                  <span>Rugiste Burger</span>
                </Link>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                  Shop
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 