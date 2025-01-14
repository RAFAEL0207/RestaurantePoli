import { useState } from "react";

import { toast } from "sonner";
import { deleteClient } from "../actions/delete-client";


export const useDeleteClient = (clientId: string) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
    
        setIsLoading(true);
        
        const { error, data } = await deleteClient( clientId );

        if( error ){
            toast.error('Ocurrio un error', {
                description: error,
            });

            setIsLoading(false);

            return;
        }

        toast.success(data);
        
        setIsLoading(false);                
    }

    return {
        isLoading,
        handleSubmit
    }
}