export function formatDate(fechaString: Date): string {
    const fecha = new Date(fechaString);

    const opcionesFecha = { day: 'numeric', month: 'short', year: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha as any);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora as any);

    return `${fechaFormateada} ${horaFormateada}`;
}