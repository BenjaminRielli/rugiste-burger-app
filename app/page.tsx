"use client";
import Link from "next/link"
import { ArrowRight, ShoppingCart, Users, Target, FileText, AlertCircle, Rocket, ChartBar } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRef, useEffect, useState } from "react";

function Carousel() {
  const images = [
    { src: "/Imagen2.jpg", alt: "Equipo Rugiste Burger 1" },
    { src: "/Imagen3.jpg", alt: "Equipo Rugiste Burger 2" },
    { src: "/Imagen4.jpg", alt: "Equipo Rugiste Burger 3" },
  ];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative flex flex-col items-center mt-12 w-full md:w-2/3 mx-auto">
      <div className="w-full h-[350px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg bg-muted">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          width={600}
          height={400}
          className="object-contain w-full h-full transition-all duration-700 bg-white" />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prev}
          className="px-3 py-1 rounded-full bg-primary text-white hover:bg-primary/80 transition"
          aria-label="Anterior"
        >
          {"<"}
        </button>
        <button
          onClick={next}
          className="px-3 py-1 rounded-full bg-primary text-white hover:bg-primary/80 transition"
          aria-label="Siguiente"
        >
          {">"}
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-3 h-3 rounded-full ${idx === current ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#objetivo" className="transition-colors hover:text-primary">
              Objetivo
            </Link>
            <Link href="#producto" className="transition-colors hover:text-primary">
              Producto
            </Link>
            <Link href="#equipo" className="transition-colors hover:text-primary">
              Equipo
            </Link>
            <Link href="#presupuesto-detallado" className="transition-colors hover:text-primary">
              Presupuesto
            </Link>
            <Link href="#restricciones" className="transition-colors hover:text-primary">
              Restricciones
            </Link>
            <Link href="#resultados-principales" className="transition-colors hover:text-primary">
              Resultados
            </Link>
          </nav>
          <Button asChild>
            <Link href="/shop">TIENDA</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative" id="objetivo">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>

          <div className="container relative py-24">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Proyecto{" "}
                <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Rugiste Burger
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Diseñar y desarrollar una propuesta integral para la creación de una hamburguesería, desde la construcción de la identidad de la marca, la definición del menú, el diseño del local y la estrategia de marketing.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                <div className="space-y-2">
                  <Target className="h-6 w-6 mx-auto text-primary" />
                  <h4 className="font-semibold">Objetivo</h4>
                </div>
                <div className="space-y-2">
                  <Users className="h-6 w-6 mx-auto text-primary" />
                  <h4 className="font-semibold">Equipo</h4>
                </div>
                <div className="space-y-2">
                  <FileText className="h-6 w-6 mx-auto text-primary" />
                  <h4 className="font-semibold">Plan</h4>
                </div>
                <div className="space-y-2">
                  <ChartBar className="h-6 w-6 mx-auto text-primary" />
                  <h4 className="font-semibold">Resultados</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proposito" className="bg-muted/50 py-24">
          <div className="container max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Propósito del Proyecto</h2>
            <p className="text-lg text-muted-foreground">
              Rugiste Burger surge con el propósito de ofrecer una alternativa innovadora dentro del sector gastronómico, con la frescura de alimentos e ideas que teníamos en mente.
              El proyecto busca formar tanto un espacio atractivo, como accesible, donde la calidad y la experiencia sean prioridad.
            </p>
          </div>
        </section>

        <section id="propuesta" className="bg-muted/50 py-24">
          <div className="container space-y-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Propuesta de Valor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Calidad Premium</h3>
                  <p className="text-muted-foreground">Ingredientes frescos y recetas originales</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Ambiente Único</h3>
                  <p className="text-muted-foreground">Espacio diseñado para una experiencia completa</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Precios Accesibles</h3>
                  <p className="text-muted-foreground">Excelente relación calidad-precio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="equipo" className="py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Equipo del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Ignacio Berra</h3>
                  <p className="text-muted-foreground">Encargado de cocina/Menú</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Sofía Guerrico</h3>
                  <p className="text-muted-foreground">Encargada de Marketing</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Benjamín Rielli</h3>
                  <p className="text-muted-foreground">Encargado de Compras</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Alejandro Piccardo</h3>
                  <p className="text-muted-foreground">Encargado de Obras & Proyectos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Lucas Giffuni</h3>
                  <p className="text-muted-foreground">Owner / Sponsor del proyecto</p>
                </CardContent>
              </Card>
            </div>
            {/* Imágenes debajo del equipo */}
            <Carousel />
          </div>
        </section>

        <section id="interesados" className="bg-muted/50 py-24">
          <div className="container max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Partes Interesadas</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li>• Proveedores</li>
              <li>• Intendencia y organismos de control</li>
              <li>• Ministerio de Salud</li>
              <li>• Vecinos y comunidad local</li>
              <li>• Clientes</li>
              <li>• Owner / Sponsor</li>
            </ul>
          </div>
        </section>



        <section id="presupuesto-detallado" className="py-24">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Presupuesto Detallado</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li>• Alquiler del local: $60.000</li>
              <li>• Remodelación y diseño: $50.000</li>
              <li>• Equipamiento de cocina: $80.000</li>
              <li>• Trámites y habilitaciones: $30.000</li>
              <li>• Desarrollo de menú: $9.000</li>
              <li>• Stock inicial: $50.000</li>
              <li>• Identidad visual: $8.000</li>
              <li>• Campaña pre-apertura: $20.000</li>
              <li>• Sistema delivery: $15.000</li>
              <li>• Reserva contigencia: $35.000</li>
              <li className="font-semibold">Total estimado: $357.000</li>
            </ul>
          </div>
        </section>

        <section id="restricciones" className="py-24">
          <div className="container max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Restricciones del Proyecto</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li>• Duración estimada: 6 meses</li>
              <li>• Presupuesto inicial limitado</li>
              <li>• Cumplimiento de requisitos legales y habilitaciones</li>
            </ul>
          </div>
        </section>

        <section id="riesgos" className="bg-muted/50 py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Gestión de Riesgos y Oportunidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    Riesgos Identificados
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tiempo limitado de capacitación del personal</li>
                    <li>• Presupuesto ajustado para marketing</li>
                    <li>• Costos de alquiler y operación</li>
                    <li>• Requisitos legales y habilitaciones</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Acciones: Capacitación intensiva, búsqueda de alianzas, control de gastos y asesoría legal.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Oportunidades
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Integración con plataformas de delivery</li>
                    <li>• Colaboraciones con marcas reconocidas</li>
                    <li>• Desarrollo de delivery propio</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="resultados-principales" className="py-24">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Resultados Principales del Proyecto</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li>• Identidad de marca desarrollada</li>
              <li>• Menú definido y probado</li>
              <li>• Local remodelado y habilitado</li>
              <li>• Estrategia de marketing lanzada</li>
              <li>• Personal capacitado</li>
            </ul>
          </div>
        </section>

        <section id="indicadores" className="bg-muted/50 py-24">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Indicadores de Éxito</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li>• Menú con 6-10 variedades desarrolladas</li>
              <li>• Diseño del local 100% completado</li>
              <li>• Identidad de marca implementada</li>
              <li>• Cumplimiento de plazos y presupuesto</li>
              <li>• Satisfacción del cliente en la apertura</li>
            </ul>
          </div>
        </section>

      </main>

      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Rugiste Burger. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}