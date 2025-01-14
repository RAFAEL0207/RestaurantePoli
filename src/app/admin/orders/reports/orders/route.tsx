import { prisma } from '@/libs';
import { IOrder } from '@/modules/orders/interfaces/order.interface';
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { formatDate } from '../../../../../utils/format-date';

// Estilos para el reporte en tamaño carta
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        fontSize: 12,
        marginBottom: 4,
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 2,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 0,
    },
    cellHeader: {
        flex: 1,
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
        backgroundColor: '#f0f0f0',
    },
    cell: {
        flex: 1,
        fontSize: 8,
        textAlign: 'center',
        padding: 2,
    },
    footer: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 10,
    },
});

interface ReportProps {
    orders: IOrder[];
}

// Componente para generar el PDF
const Report = ({ orders }: ReportProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Título */}
                <View style={styles.section}>
                    <Text style={styles.title}>Reporte General de Ventas</Text>
                </View>

                {/* Tabla de Órdenes */}
                <View style={styles.table}>
                    {/* Encabezados de la tabla */}
                    <View style={styles.row}>
                        <Text style={styles.cellHeader}>Fecha</Text>
                        <Text style={styles.cellHeader}>Cliente</Text>
                        <Text style={styles.cellHeader}>N. Productos</Text>
                        <Text style={styles.cellHeader}>Tipo</Text>
                        <Text style={styles.cellHeader}>Estado</Text>
                        <Text style={styles.cellHeader}>Atendido Por</Text>
                        <Text style={styles.cellHeader}>Creado</Text>
                        <Text style={styles.cellHeader}>Total</Text>
                    </View>

                    {/* Filas de la tabla */}
                    {orders.map((order) => (
                        <View key={order.id} style={styles.row}>
                            <Text style={styles.cell}>{formatDate(order.createdAt)}</Text>
                            <Text style={styles.cell}>
                                {order.client ? order.client.name : 'Cliente eliminado'}
                            </Text>
                            <Text style={styles.cell}>{order.orderProducts.length}</Text>
                            <Text style={styles.cell}>
                                {order.type == "TABLE" ? "Mesa" : "Delivery"}
                            </Text>
                            <Text style={styles.cell}>{order.status}</Text>
                            <Text style={styles.cell}>
                                {order.user ? order.user.name : 'Usuario eliminado'}
                            </Text>
                            <Text style={styles.cell}>{order.total.toFixed(2)}Bs</Text>
                        </View>
                    ))}
                </View>

                {/* Pie de página */}
                <Text style={styles.footer}>
                    Este reporte es generado automáticamente. Gracias por utilizar nuestro sistema.
                </Text>
            </Page>
        </Document>
    );
};
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validar las fechas
    if (!startDate || !endDate) {
        return NextResponse.json(
            { error: 'Los parámetros de fecha son obligatorios.' },
            { status: 400 }
        );
    }

    // Ajustar la fecha inicial y final
    const startDateUTC = new Date(startDate); // Inicio del día
    const endDateUTC = new Date(endDate);     // Fin del día
    endDateUTC.setHours(23, 59, 59, 999);     // Asegurarse de incluir todo el día

    try {
        // Consultar órdenes dentro del rango de fechas
        const orders = await prisma.orders.findMany({
            where: {
                createdAt: {
                    gte: startDateUTC,  // Desde la fecha inicial
                    lte: endDateUTC,    // Hasta el final del día
                },
            },
            include: {
                client: {
                    select: { id: true, name: true },
                },
                user: {
                    select: { id: true, name: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Validar si hay órdenes
        if (orders.length === 0) {
            return NextResponse.json(
                { error: 'No hay órdenes disponibles en este rango de fechas.' },
                { status: 404 }
            );
        }

        // Renderizar el PDF
        const stream = await renderToStream(<Report orders={orders} />);

        // Responder con el PDF generado
        return new Response(stream as unknown as ReadableStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="report.pdf"',
            },
        });

    } catch (error) {
        console.error('Error al generar el reporte:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
