import Image from "next/image"

export function TransformationsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wide mb-2">Resultados reales</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transformaciones que hablan por sí solas</h2>
          <p className="text-muted-foreground text-lg">Estos son algunos de los resultados que hemos logrado juntos</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/502903707-4097245297213076-1836789078342719368-n.jpg"
              alt="Transformación - Pérdida de grasa"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <p className="text-3xl font-bold text-primary mb-1">12</p>
              <p className="text-sm text-muted-foreground">Semanas de programa</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <p className="text-3xl font-bold text-primary mb-1">-8kg</p>
              <p className="text-sm text-muted-foreground">Grasa perdida</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border/50">
              <p className="text-3xl font-bold text-primary mb-1">+4kg</p>
              <p className="text-sm text-muted-foreground">Músculo ganado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
