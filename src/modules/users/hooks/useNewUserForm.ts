"use client"
import { useState } from "react";
import { toast } from "sonner";

import { UserRole } from "../interfaces/user.interface";
import { registerNewUser } from "../actions/register-new-user";

import { uploadImage } from "@/modules/shared";
import { useRouter } from "next/navigation";


export const useNewUserForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const lastName = form.elements.namedItem('lastName') as HTMLInputElement;
        const email = form.elements.namedItem('email') as HTMLInputElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;
        const role = form.elements.namedItem('role') as HTMLInputElement;
        const imageInput = form.elements.namedItem('image') as HTMLInputElement;


        if (imageInput.files![0]) {

            const { data, error: errorImageUpload } = await uploadImage(
                imageInput.files![0]
            );

            
            if (errorImageUpload) {
                toast.error('Error al subir imagen', {
                    description: errorImageUpload,
                });
                setIsLoading(false);
                return;
            }

            setImageUrl(data!)
        }

        const user = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            role: role.value as UserRole,
            image: imageUrl
        }

        const { data, error } = await registerNewUser(user)

        if (error) {
            toast.error('Error al crear usuario', {
                description: error,
            });
            setIsLoading(false);
            return;
        }

        toast.success(data);
        form.reset();
        setIsLoading(false);
        router.push('/admin/users')
    }

    return {
        isLoading,
        handleSubmit
    }
}