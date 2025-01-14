import { CheckoutForm } from "@/modules/cart";
import { TitlePage } from "@/modules/shared";

export default function CheckoutPage() {


    return (
        <>
            <header className="pt-8">
                <div className="container">

                    <TitlePage
                        title="Finalizar venta"
                        subTitle="Confirma la order"
                    />
                </div>
            </header>

            <section>
                <div className="container">

                    <CheckoutForm />
                </div>
            </section>
        </>
    );
}