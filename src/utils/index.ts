export { validateForm } from "./validate-form";


export const toSlug = (text: string): string => {
    return text
        .toString()                   // Aseguramos que es string
        .normalize('NFD')             // Normalizamos caracteres Unicode
        .replace(/[\u0300-\u036f]/g, '') // Eliminamos diacríticos (tildes)
        .toLowerCase()                // Convertimos a minúsculas
        .trim()                       // Eliminamos espacios al inicio y al final
        .replace(/[^a-z0-9 -]/g, '')  // Eliminamos caracteres no permitidos
        .replace(/\s+/g, '-')         // Reemplazamos espacios por guiones
        .replace(/-+/g, '-');         // Reemplazamos múltiples guiones por uno solo
};


export function formatDate(fechaString: Date): string {
    const fecha = new Date(fechaString);

    const opcionesFecha = { day: 'numeric', month: 'short', year: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha as any);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora as any);

    return `${fechaFormateada} ${horaFormateada}`;
}