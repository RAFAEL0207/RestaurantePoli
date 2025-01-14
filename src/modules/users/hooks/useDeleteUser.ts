import { useState } from "react";

import { toast } from "sonner";
import { deleteUser } from "../actions/delete-user";


export const useDeleteUser = (userId: string) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
    
        setIsLoading(true);
        
        const { error, data } = await deleteUser( userId );

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