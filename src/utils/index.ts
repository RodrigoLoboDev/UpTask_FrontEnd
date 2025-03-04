export function formatearFecha(fecha: string): string {
    const fechaNueva = new Date(fecha)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })
    return formatter.format(fechaNueva)
}