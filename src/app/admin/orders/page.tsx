import { TitlePage } from "@/modules/shared"
import { OrderList } from "@/modules/orders/components/OrderList";
import { OrdersFilter } from "@/modules/orders/components/OrdersFilter";
import { getOrdersByDateRange } from "@/modules/orders/actions/get-orders-by-date";
import { RefreshOrdersButton } from "@/modules/orders/components/RefreshOrdersButton";


export default async function OrdersPage() {

    const orders = await getOrdersByDateRange();

    return (
        <>

            <header className="orders__header">
                <div className="orders__header--container">

                    <TitlePage
                        title="Ordenes"
                        subTitle="Comandas del dia para la cocina"
                    />

                    <OrdersFilter />
                </div>
            </header>

            <section className="pt-8">
                <div className="container">
                    <RefreshOrdersButton />
                </div>
            </section>

            <section>
                <div className="container">
                    <OrderList orders={orders} />
                </div>
            </section>
        </>
    );
}