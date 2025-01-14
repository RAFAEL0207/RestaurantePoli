import { prisma } from '@/libs';
import { IOrder } from '@/modules/orders/interfaces/order.interface';
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

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
        fontSize: 32,
        fontWeight: 'extrabold',
        textAlign: 'left',
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
        // display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 2
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 0,
    },
    cellHeader: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
        backgroundColor: '#f0f0f0',
    },
    cell: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        padding: 4,
    },
    footer: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 10,
    },
    total: {
        textAlign:"right",
        textTransform: "uppercase",
        fontWeight: "bold",
        display: "flex"
    }
});

// Componente para generar el PDF
interface InvoiceProps {
    order: IOrder;
}

const Invoice = ({ order }: InvoiceProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Encabezado */}
                <View style={styles.section}>
                    <Text style={styles.title}>Factura</Text>
                    <Text style={styles.text}>Fecha: {new Date(order.createdAt).toLocaleDateString()}</Text>
                                
                    <Text style={styles.text}>Cliente: {order.client ? order.client.name : 'Cliente eliminado'}</Text>
                    
                    <Text style={styles.text}>Pedido ID: {order.id}</Text>
                    <Text style={styles.text}>Atendido por: {order.user?.name}</Text>
                </View>

                {/* Detalles del Pedido */}
                <View style={styles.section}>
                    <Text style={styles.header}>Detalles del Pedido:</Text>
                    <View style={styles.table}>
                        {/* Encabezados de la tabla */}
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Producto</Text>
                            <Text style={styles.cellHeader}>Cantidad</Text>
                            <Text style={styles.cellHeader}>Precio</Text>
                            <Text style={styles.cellHeader}>Subtotal</Text>
                        </View>

                        {/* Filas de la tabla */}
                        {order.orderProducts.map((product, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cell}>{product.productName}</Text>
                                <Text style={styles.cell}>{product.quantity}</Text>
                                <Text style={styles.cell}>{product.productPrice.toFixed(2)}Bs</Text>
                                <Text style={styles.cell}>{(product.productPrice * product.quantity).toFixed(2)}Bs</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Total */}
                <View style={styles.total}>
                    <Text style={styles.header}>Importe pagado: {order.total.toFixed(2)} Bs</Text>
                </View>

                {/* Pie de página */}
                <Text style={styles.footer}>
                    Este reporte es generado automáticamente. Gracias por utilizar nuestro sistema.
                </Text>
            </Page>
        </Document>
    );
};

// Controlador para generar el PDF
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    try {
        // Buscar la orden en la base de datos
        const order = await prisma.orders.findUnique({
            where: { id: id },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // Validar si la orden existe
        if (!order) {
            return NextResponse.json(
                { error: 'Venta no encontrada' },
                { status: 404 }
            );
        }

        // Renderizar el PDF
        const stream = await renderToStream(<Invoice order={order} />);

        // Responder con el PDF generado
        return new Response(stream as unknown as ReadableStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="report-${id}.pdf"`,
            },
        });

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
