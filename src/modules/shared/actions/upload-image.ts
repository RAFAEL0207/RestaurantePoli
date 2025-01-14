"use server"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImage = async (image: File) => {

    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
    
        const imageUrl = await cloudinary.uploader.upload('data:image/png;base64,' + base64Image)
            .then(response => response.secure_url);

        return {
            data: imageUrl,
            error: null
        }
        

    } catch (error) {
        console.log(error)
        return {
            error: "Oruccio un error al subir la imagen",
            data: null
        }
    }


}