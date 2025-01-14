export const validateForm = (formData: Record<string, string>): boolean => {
    for (const key in formData) {
        if (formData[key].trim() === '') {
            return false; // Si algún campo está vacío, retorna false
        }
    }
    return true;
};
