"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Dumbbell, ClipboardList, Send } from "lucide-react"

const totalSections = 8

export function TrainingEvaluationForm() {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState({
    // Sección 1: Datos Generales
    nombreCompleto: "",
    edad: "",
    estatura: "",
    peso: "",
    ocupacion: "",
    actividadDiaria: "",
    // Sección 2: Historial Deportivo
    deportePrevio: "",
    tiempoPractica: "",
    // Sección 3: Entrenamiento Actual
    entrenamientoActual: "",
    rutinaActual: "",
    diasEntrenamiento: "",
    ejerciciosEvitar: "",
    lugarEntrenamiento: "",
    dolorIncomodidad: "",
    // Sección 4: Historial de Lesiones
    lesionesPrevia: "",
    // Sección 5: Salud y Enfermedades
    enfermedades: "",
    medicamentos: "",
    calidadSueno: "",
    // Sección 6: Disponibilidad
    diasDisponibles: "",
    tiempoPorSesion: "",
    horarioPreferido: "",
    // Sección 7: Objetivos
    objetivoPrincipal: "",
    movimientoInseguridad: "",
    seguimiento: "",
    comentariosAdicionales: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection((prev) => prev + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Formulario enviado:", formData)
    alert("¡Formulario enviado con éxito! Pronto recibirás tu rutina personalizada.")
  }

  const progress = ((currentSection + 1) / totalSections) * 100

  const sections = [
    // Sección 0: Introducción
    <div key="intro" className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <ClipboardList className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Evaluación para tu Rutina de Entrenamiento</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Este formulario me ayudará a conocer tu historial, objetivos y condiciones actuales para diseñarte una rutina
          de entrenamiento totalmente personalizada. Completarlo te tomará menos de 5 minutos.
        </p>
      </div>
    </div>,

    // Sección 1: Datos Generales
    <div key="datos" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 1: Datos Generales</h3>
        <p className="text-sm text-muted-foreground">Información básica sobre ti</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">1. Nombre completo *</Label>
          <Input
            id="nombre"
            value={formData.nombreCompleto}
            onChange={(e) => updateFormData("nombreCompleto", e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edad">2. Edad *</Label>
            <Input
              id="edad"
              type="number"
              value={formData.edad}
              onChange={(e) => updateFormData("edad", e.target.value)}
              placeholder="Ej: 25"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estatura">3. Estatura (cm) *</Label>
            <Input
              id="estatura"
              type="number"
              value={formData.estatura}
              onChange={(e) => updateFormData("estatura", e.target.value)}
              placeholder="Ej: 175"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="peso">4. Peso actual (kg) *</Label>
            <Input
              id="peso"
              type="number"
              value={formData.peso}
              onChange={(e) => updateFormData("peso", e.target.value)}
              placeholder="Ej: 70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ocupacion">5. Ocupación *</Label>
            <Input
              id="ocupacion"
              value={formData.ocupacion}
              onChange={(e) => updateFormData("ocupacion", e.target.value)}
              placeholder="Tu ocupación"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>6. ¿Cómo describes tu actividad diaria? *</Label>
          <RadioGroup
            value={formData.actividadDiaria}
            onValueChange={(value) => updateFormData("actividadDiaria", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="sedentaria" id="sedentaria" />
              <Label htmlFor="sedentaria" className="flex-1 cursor-pointer">
                Sedentaria (paso mucho tiempo sentado)
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="moderada" id="moderada" />
              <Label htmlFor="moderada" className="flex-1 cursor-pointer">
                Moderada (camino y me muevo durante el día)
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="activa" id="activa" />
              <Label htmlFor="activa" className="flex-1 cursor-pointer">
                Activa (trabajo físicamente o me muevo bastante)
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>,

    // Sección 2: Historial Deportivo
    <div key="historial" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 2: Historial Deportivo</h3>
        <p className="text-sm text-muted-foreground">Tu experiencia previa con el ejercicio</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="deportePrevio">7. ¿Has practicado algún deporte o actividad física anteriormente? *</Label>
          <Textarea
            id="deportePrevio"
            value={formData.deportePrevio}
            onChange={(e) => updateFormData("deportePrevio", e.target.value)}
            placeholder="Describe los deportes o actividades que has practicado..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tiempoPractica">8. ¿Durante cuánto tiempo lo practicaste? *</Label>
          <Input
            id="tiempoPractica"
            value={formData.tiempoPractica}
            onChange={(e) => updateFormData("tiempoPractica", e.target.value)}
            placeholder="Ej: 2 años, 6 meses, etc."
          />
        </div>
      </div>
    </div>,

    // Sección 3: Entrenamiento Actual
    <div key="actual" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 3: Entrenamiento Actual</h3>
        <p className="text-sm text-muted-foreground">Tu situación de entrenamiento actual</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>9. ¿Actualmente estás entrenando? *</Label>
          <RadioGroup
            value={formData.entrenamientoActual}
            onValueChange={(value) => updateFormData("entrenamientoActual", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 flex-1 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="si" id="entrena-si" />
              <Label htmlFor="entrena-si" className="cursor-pointer">
                Sí
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 flex-1 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="no" id="entrena-no" />
              <Label htmlFor="entrena-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.entrenamientoActual === "si" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="rutinaActual">10. Describe la rutina que estás siguiendo actualmente *</Label>
              <Textarea
                id="rutinaActual"
                value={formData.rutinaActual}
                onChange={(e) => updateFormData("rutinaActual", e.target.value)}
                placeholder="Describe tu rutina actual..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diasEntrenamiento">11. ¿Cuántos días entrenas a la semana actualmente? *</Label>
              <Input
                id="diasEntrenamiento"
                value={formData.diasEntrenamiento}
                onChange={(e) => updateFormData("diasEntrenamiento", e.target.value)}
                placeholder="Ej: 3 días, 5 días"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="ejerciciosEvitar">12. ¿Qué ejercicios no te gustan o prefieres evitar? *</Label>
          <Textarea
            id="ejerciciosEvitar"
            value={formData.ejerciciosEvitar}
            onChange={(e) => updateFormData("ejerciciosEvitar", e.target.value)}
            placeholder="Lista los ejercicios que prefieres evitar..."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>13. ¿Dónde entrenas actualmente? *</Label>
          <RadioGroup
            value={formData.lugarEntrenamiento}
            onValueChange={(value) => updateFormData("lugarEntrenamiento", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="gimnasio" id="gimnasio" />
              <Label htmlFor="gimnasio" className="flex-1 cursor-pointer">
                Gimnasio
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="casa" id="casa" />
              <Label htmlFor="casa" className="flex-1 cursor-pointer">
                En casa
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="aireLibre" id="aireLibre" />
              <Label htmlFor="aireLibre" className="flex-1 cursor-pointer">
                Al aire libre
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dolorIncomodidad">
            14. ¿Actualmente sientes dolor, incomodidad o limitación en alguna parte del cuerpo? *
          </Label>
          <Textarea
            id="dolorIncomodidad"
            value={formData.dolorIncomodidad}
            onChange={(e) => updateFormData("dolorIncomodidad", e.target.value)}
            placeholder="Describe cualquier dolor o molestia que sientas..."
            rows={2}
          />
        </div>
      </div>
    </div>,

    // Sección 4: Historial de Lesiones
    <div key="lesiones" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 4: Historial de Lesiones</h3>
        <p className="text-sm text-muted-foreground">Información sobre lesiones previas</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lesionesPrevia">15. ¿Has tenido alguna lesión previa? Si es así, descríbela. *</Label>
          <Textarea
            id="lesionesPrevia"
            value={formData.lesionesPrevia}
            onChange={(e) => updateFormData("lesionesPrevia", e.target.value)}
            placeholder="Describe tus lesiones previas, cuándo ocurrieron y cómo te afectan actualmente..."
            rows={4}
          />
        </div>
      </div>
    </div>,

    // Sección 5: Salud y Enfermedades
    <div key="salud" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 5: Salud y Enfermedades</h3>
        <p className="text-sm text-muted-foreground">Tu estado de salud general</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="enfermedades">
            16. ¿Tienes alguna enfermedad diagnosticada? (ej: hipertensión, diabetes, problemas articulares, etc.) *
          </Label>
          <Textarea
            id="enfermedades"
            value={formData.enfermedades}
            onChange={(e) => updateFormData("enfermedades", e.target.value)}
            placeholder="Lista cualquier condición médica diagnosticada..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicamentos">17. ¿Tomas algún medicamento actualmente? *</Label>
          <Textarea
            id="medicamentos"
            value={formData.medicamentos}
            onChange={(e) => updateFormData("medicamentos", e.target.value)}
            placeholder="Lista los medicamentos que tomas actualmente..."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>18. ¿Cómo calificas tu calidad de sueño? *</Label>
          <p className="text-sm text-muted-foreground">1 = Muy mala, 5 = Excelente</p>
          <RadioGroup
            value={formData.calidadSueno}
            onValueChange={(value) => updateFormData("calidadSueno", value)}
            className="flex justify-between gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex flex-col items-center space-y-2 rounded-lg border p-3 flex-1 hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={num.toString()} id={`sueno-${num}`} />
                <Label htmlFor={`sueno-${num}`} className="cursor-pointer font-semibold">
                  {num}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>,

    // Sección 6: Disponibilidad y Estilo de Vida
    <div key="disponibilidad" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 6: Disponibilidad y Estilo de Vida</h3>
        <p className="text-sm text-muted-foreground">Tu tiempo disponible para entrenar</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="diasDisponibles">19. ¿Cuántos días a la semana puedes entrenar? *</Label>
          <Input
            id="diasDisponibles"
            value={formData.diasDisponibles}
            onChange={(e) => updateFormData("diasDisponibles", e.target.value)}
            placeholder="Ej: 3, 4, 5 días"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tiempoPorSesion">20. ¿Cuánto tiempo puedes dedicar por sesión? *</Label>
          <Input
            id="tiempoPorSesion"
            value={formData.tiempoPorSesion}
            onChange={(e) => updateFormData("tiempoPorSesion", e.target.value)}
            placeholder="Ej: 45 minutos, 1 hora"
          />
        </div>

        <div className="space-y-2">
          <Label>21. ¿En qué horario prefieres entrenar? *</Label>
          <RadioGroup
            value={formData.horarioPreferido}
            onValueChange={(value) => updateFormData("horarioPreferido", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="manana" id="manana" />
              <Label htmlFor="manana" className="flex-1 cursor-pointer">
                🌅 Mañana
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="tarde" id="tarde" />
              <Label htmlFor="tarde" className="flex-1 cursor-pointer">
                ☀️ Tarde
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="noche" id="noche" />
              <Label htmlFor="noche" className="flex-1 cursor-pointer">
                🌙 Noche
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>,

    // Sección 7: Objetivos
    <div key="objetivos" className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">SECCIÓN 7: Objetivos</h3>
        <p className="text-sm text-muted-foreground">Tus metas y preferencias de seguimiento</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="objetivoPrincipal">22. ¿Cuál es tu objetivo principal? *</Label>
          <p className="text-sm text-muted-foreground">
            Detalla por favor tu objetivo principal: ganar músculo, perder grasa, salud, etc.
          </p>
          <Textarea
            id="objetivoPrincipal"
            value={formData.objetivoPrincipal}
            onChange={(e) => updateFormData("objetivoPrincipal", e.target.value)}
            placeholder="Describe tu objetivo principal con el mayor detalle posible..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="movimientoInseguridad">
            23. ¿Hay algún movimiento que te genere inseguridad o miedo realizar? (sentadilla, peso muerto, etc.) *
          </Label>
          <Textarea
            id="movimientoInseguridad"
            value={formData.movimientoInseguridad}
            onChange={(e) => updateFormData("movimientoInseguridad", e.target.value)}
            placeholder="Lista los movimientos que te generan inseguridad..."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>24. ¿Te gustaría tener seguimiento? *</Label>
          <RadioGroup
            value={formData.seguimiento}
            onValueChange={(value) => updateFormData("seguimiento", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="semanal" id="semanal" />
              <Label htmlFor="semanal" className="flex-1 cursor-pointer">
                Semanal
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="quincenal" id="quincenal" />
              <Label htmlFor="quincenal" className="flex-1 cursor-pointer">
                Quincenal
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="mensual" id="mensual" />
              <Label htmlFor="mensual" className="flex-1 cursor-pointer">
                Mensual
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comentariosAdicionales">
            25. ¿Existe alguna situación adicional que le gustaría comentarme y que pueda ayudarme a elaborar mejor su
            rutina de entrenamiento? *
          </Label>
          <Textarea
            id="comentariosAdicionales"
            value={formData.comentariosAdicionales}
            onChange={(e) => updateFormData("comentariosAdicionales", e.target.value)}
            placeholder="Cualquier información adicional que consideres relevante..."
            rows={4}
          />
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">FitPlan Pro</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progreso</span>
            <span>
              {currentSection + 1} de {totalSections}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {currentSection + 1}
              </span>
              {currentSection === 0 && "Bienvenido"}
              {currentSection === 1 && "Datos Generales"}
              {currentSection === 2 && "Historial Deportivo"}
              {currentSection === 3 && "Entrenamiento Actual"}
              {currentSection === 4 && "Historial de Lesiones"}
              {currentSection === 5 && "Salud y Enfermedades"}
              {currentSection === 6 && "Disponibilidad"}
              {currentSection === 7 && "Objetivos"}
            </CardTitle>
            <CardDescription>
              {currentSection === 0 && "Comencemos con tu evaluación personalizada"}
              {currentSection > 0 && "Completa todos los campos marcados con *"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="min-h-[400px]">{sections[currentSection]}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              {currentSection < totalSections - 1 ? (
                <Button onClick={nextSection} className="gap-2">
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4" />
                  Enviar Formulario
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Tu información es confidencial y será utilizada únicamente para diseñar tu rutina personalizada.
        </p>
      </div>
    </div>
  )
}
