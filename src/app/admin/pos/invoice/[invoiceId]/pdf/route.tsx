import { prisma } from '@/libs';
import { IOrder } from '@/modules/orders/interfaces/order.interface';
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

// Estilos para el recibo pequeño
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
    },
    section: {
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 12,
        marginBottom: 6,
    },
    text: {
        fontSize: 10,
        marginBottom: 4,
    },
    table: {
        // display: '',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 4,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
    },
    footer: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 10,
    }
});

// Componente para generar el PDF
interface InvoiceProps {
    order: IOrder;
}

const Invoice = ({ order }: InvoiceProps) => {
    return (
        <Document>
            <Page size="A6" wrap={false} style={styles.page}>
                {/* Encabezado */}
                <View style={styles.section}>
                    <Text style={styles.title}>Comprobante</Text>
                    <Text style={styles.text}>Fecha: {new Date(order.createdAt).toLocaleDateString()}</Text>
                    <Text style={styles.text}>Cliente: {order.client ? order.client.name : 'Cliente eliminado'}</Text>                    
                    <Text style={styles.text}>Pedido: {order.id}</Text>
                </View>

                {/* Detalles del Pedido */}
                <View style={styles.section}>
                    <Text style={styles.header}>Detalles:</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Producto</Text>
                            <Text style={styles.cell}>Cant.</Text>
                            <Text style={styles.cell}>Precio</Text>
                            <Text style={styles.cell}>Subtotal</Text>
                        </View>

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
                <View style={styles.section}>
                    <Text style={styles.text}>Total: {order.total.toFixed(2)}Bs</Text>
                </View>

                {/* Pie de página */}
                <Text style={styles.footer}>¡Gracias por su compra!</Text>
            </Page>
        </Document>
    );
};

// Controlador para generar el PDF
export async function GET(
    request: Request,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    const invoiceId = (await params).invoiceId;

    try {
        // Buscar la orden en la base de datos
        const order = await prisma.orders.findUnique({
            where: { id: invoiceId },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
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
                'Content-Disposition': `inline; filename="invoice-${invoiceId}.pdf"`,
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
