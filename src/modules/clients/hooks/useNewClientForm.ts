"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import { createClient } from "../actions/create-client";



export const useNewClientForm = () => {
    
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsLoading(true);
        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const ci = form.elements.namedItem('ci')  as HTMLInputElement;
        const lastname = form.elements.namedItem('firstSurname')  as HTMLInputElement;
        const secondlastname = form.elements.namedItem('secondSurname')  as HTMLInputElement;


        const client: Prisma.ClientsCreateInput = {
            name: name.value,
            ci: ci.value, 
            firstSurname: lastname.value,
            secondSurname: secondlastname.value,
        }


        const { data, error } = await createClient(client);

        if (error) {
            toast.error('Ocurrio un error', {
                description: error,
            });

            setIsLoading(false);

            return;
        }

        toast.success(data);

        setIsLoading(false);

        router.push('/admin/clients');
    }

    return {
        isLoading,
        handleSubmit,
    }
}