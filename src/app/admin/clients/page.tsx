
import { TitlePage } from "@/modules/shared";
import { ClientsReportCard, ClientsTable, getAllClients } from "@/modules/clients";
import { Add01Icon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";


export default async function ClientsPage() {

    const { data: clients, error } = await getAllClients();


    return (
        <>
            <header className="clients__header">
                <div className="clients__header--container">

                    <TitlePage
                        title="Cliente"
                        subTitle="Gestiona los clientes de tu empresa"
                    />
                    <Link href={`/admin/clients/new`}>
                        <Button
                            as='div'
                            startContent={<Add01Icon />}
                            className="btn-primary"
                        >
                            Registrar cliente
                        </Button>
                    </Link>

                </div>
            </header>

            <section className="pt-8">
                <div className="container flex flex-col gap-8">
                    <ClientsTable
                        clients={clients!}
                    />
                </div>
            </section>
        </>
    );
}