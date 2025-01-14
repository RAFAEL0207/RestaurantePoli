import { EditClientsForm, getClientsById } from "@/modules/clients";
import { TitlePage } from "@/modules/shared";

interface Props {
    params: Promise<{ id:string }>
}

export default async function EditClientsPage({ params }: Props) {
    const clientsId = (await params).id;

    const clientsPromise = getClientsById(clientsId);

    const [ clientsResponse ] = await Promise.all([ clientsPromise ]);

    const { data:client, error } = clientsResponse;

    if(error){
        return (
            <>
                <h2>Ocurrio un error.</h2>
            </>
        )
    }

    return (
        <>
            <TitlePage
                title="Editar Cliente"
                subTitle="Edita la informacion del cliente"
            />

            <EditClientsForm
                client={client!}
            />

        </>
    );
}