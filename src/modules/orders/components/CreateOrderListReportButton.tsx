"use client";

import { Button, Input } from "@nextui-org/react";
import { PrinterIcon } from "hugeicons-react";
import { useState } from "react";

export const CreateOrderListReportButton = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");

    const handleClick = () => {
        if (!startDate || !endDate) {
            setError("Por favor, seleccione ambas fechas.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setError("La fecha de inicio no puede ser mayor que la fecha de fin.");
            return;
        }

        setError(""); // Limpiar errores si todo está bien
        window.open(`/admin/orders/reports/orders?startDate=${startDate}&endDate=${endDate}`, "_blank");
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        if (endDate && new Date(e.target.value) > new Date(endDate)) {
            setError("La fecha de inicio no puede ser mayor que la fecha de fin.");
        } else {
            setError("");
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        if (startDate && new Date(startDate) > new Date(e.target.value)) {
            setError("La fecha de inicio no puede ser mayor que la fecha de fin.");
        } else {
            setError("");
        }
    };

    const today = new Date().toISOString().split("T")[0]; // Fecha máxima (hoy)

    return (
        <>
            <h3>Generar reportes</h3>
            <div className="flex flex-col lg:flex-row items-center justify-start gap-4">
                <Input
                    type="date"
                    variant="bordered"
                    name="startDate"
                    label="Fecha inicio"
                    className="max-w-80 bg-white border-none"
                    max={today} // Establece el día actual como fecha máxima
                    value={startDate}
                    onChange={handleStartDateChange}
                />

                <Input
                    type="date"
                    name="endDate"
                    variant="bordered"
                    label="Fecha fin"
                    className="max-w-80 bg-white border-none"
                    max={today} // Establece el día actual como fecha máxima
                    value={endDate}
                    onChange={handleEndDateChange}
                />

                <Button
                    startContent={<PrinterIcon size={20} />}
                    onPress={handleClick}
                    variant="light"
                    className="btn-primary"
                    color="primary"
                >
                    Generar Reporte
                </Button>
            </div>

            {/* Mostrar error si existe */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
};
