export const validateTime = (params) => {
    const regex = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/
    return regex.test(params);
} 

export const timeValidatorMessage = 'La hora debe ser de la forma HH:MM:SS'