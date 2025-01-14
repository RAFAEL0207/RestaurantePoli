import { TitlePage } from "@/modules/shared";
import { getOrders } from "@/modules/orders/actions/get-orders";
import { OrderTable } from "@/modules/orders/components/OrderTable";
import { CreateOrderListReportButton } from "@/modules/orders/components/CreateOrderListReportButton";

interface Props {
    searchParams: Promise<{ [key: string]: string | number | undefined }>
}


export default async function OrdersPage(props: Props) {
    const searchParams = await props.searchParams

    const ordersResponse = await getOrders(searchParams.page as number, searchParams.limit as number,);


    return (
        <>
            <header className="orders__header">
                <div className="container">
                    <TitlePage
                        subTitle="Gestiona las ordenes realizadas en el sistema"
                        title="Registro de ordenes"
                    />

                </div>
            </header>

            <section>
                <div className="container">
                    <CreateOrderListReportButton/>
                </div>
            </section>


            <section>
                <div className="container">
                    <OrderTable ordersResponse={ordersResponse}/>
                </div>
            </section>

        </>
    );
}