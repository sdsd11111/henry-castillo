"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import type { AvailabilitySettings } from "@/lib/availability-settings"

const DAYS = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
}

export function AvailabilityForm() {
    const [settings, setSettings] = useState<AvailabilitySettings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch("/api/admin/availability")
            .then(res => res.json())
            .then(data => {
                setSettings(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const handleSave = async () => {
        if (!settings) return
        setSaving(true)
        try {
            const res = await fetch("/api/admin/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            })
            if (!res.ok) throw new Error("Error al guardar")
            alert("Disponibilidad actualizada exitosamente")
        } catch (error) {
            alert("Error al guardar la configuración")
        } finally {
            setSaving(false)
        }
    }

    const updateDay = (day: keyof AvailabilitySettings, field: string, value: any) => {
        if (!settings) return
        setSettings({
            ...settings,
            [day]: { ...settings[day], [field]: value }
        })
    }

    if (loading) return <Loader2 className="animate-spin h-8 w-8 mx-auto" />
    if (!settings) return <p>Error al cargar configuración</p>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Configuración de Horario Semanal</h3>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Guardar Cambios
                </Button>
            </div>

            <div className="space-y-4">
                {(Object.keys(DAYS) as Array<keyof AvailabilitySettings>).map(day => (
                    <div key={day} className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                        <div className="w-32 flex items-center gap-2">
                            <Switch
                                checked={settings[day].enabled}
                                onCheckedChange={(c) => updateDay(day, "enabled", c)}
                            />
                            <Label className="font-bold">{DAYS[day]}</Label>
                        </div>

                        <div className={`flex items-center gap-4 ${!settings[day].enabled ? "opacity-50 pointer-events-none" : ""}`}>
                            <div className="flex items-center gap-2">
                                <Label>Inicio (Hora)</Label>
                                <Input
                                    type="number"
                                    min="0" max="23"
                                    value={settings[day].start}
                                    onChange={(e) => updateDay(day, "start", parseInt(e.target.value))}
                                    className="w-20"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>Fin (Hora)</Label>
                                <Input
                                    type="number"
                                    min="0" max="23"
                                    value={settings[day].end}
                                    onChange={(e) => updateDay(day, "end", parseInt(e.target.value))}
                                    className="w-20"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
