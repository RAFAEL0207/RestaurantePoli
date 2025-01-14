import { getClientByCI } from "@/modules/clients";
import { IClient } from "@/modules/clients/interfaces/clients.interface";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const useSearchClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ci, setCi] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeCI = (e: FormEvent<HTMLInputElement>) => {
        setCi(e.currentTarget.value);
    }

    const [client, setClient] = useState<IClient>({
        id: '',
        ci: '',
        name: '',
        firstSurname: '',
        secondSurname: '',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const searchClient = async () => {
        setIsLoading(true);
        

        if( ci.trim() === '' ) {
            toast.warning('El campo CI es requerido');
            setIsLoading(false);
            return;
        }

        const { data: clientResponse, error } = await getClientByCI(ci);
        
        if (error) {
            setError(error);
            setIsLoading(false);
            toast.error("No se encontro el cliente");
            return;
        }

        setClient(clientResponse as IClient);
        setIsLoading(false);
    }


    return {
        isLoading,
        client,
        error,
        onChangeCI,
        searchClient,
    }
}