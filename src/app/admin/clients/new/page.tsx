
import { TitlePage } from "@/modules/shared";
import { NewClientsForm } from "@/modules/clients";
import { PreviousPageButton } from "@/modules/shared/components/PreviousPageButton";

export default async function NewClientsPage() {

    return (
        <>
            <header className="pt-8">
                <div className="container flex flex-col items-start">

                    <PreviousPageButton />

                    <TitlePage
                        title="Nuevo Empleado"
                        subTitle="Agrega un nuevo cliente a tus registros"
                    />
                </div>
            </header>

            <section>
                <div className="container">
                    <NewClientsForm />
                </div>
            </section>
        </>
    );
}