export const notEmpty = (value: string): [boolean, string] => {
    return [value.trim().length > 0, `Es obligatorio completar este campo.`];
  };
  
  export const minLength = (value: string, min: number): [boolean, string] => {
    return [
      value.length >= min,
      `El texto debe tener al menos ${min} caracteres.`,
    ];
  };
  
  export const maxLength = (value: string, max: number): [boolean, string] => {
    return [
      value.length <= max,
      `El texto no puede tener más de ${max} caracteres.`,
    ];
  };
  
  export const isEmail = (value: string): [boolean, string] => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return [
      emailRegex.test(value),
      "El formato del correo electrónico no es válido.",
    ];
  };

  export const isGreaterThanZero = (value: number): [boolean, string] => {
    return [
      value > 0,
      "El valor debe ser mayor que 0.",
    ];
  };
  
  export const validPassword = (value: string): [boolean, string] => {
    // La contraseña debe tener al menos 8 caracteres.
    if (value.length < 8) {
      return [false, "La contraseña debe tener al menos 8 caracteres."];
    }
  
    // La contraseña debe contener al menos una letra mayúscula.
    if (!/[A-Z]/.test(value)) {
      return [false, "La contraseña debe contener al menos una letra mayúscula."];
    }
  
    // La contraseña debe contener al menos una letra minúscula.
    if (!/[a-z]/.test(value)) {
      return [false, "La contraseña debe contener al menos una letra minúscula."];
    }
  
    // La contraseña debe contener al menos un número.
    if (!/\d/.test(value)) {
      return [false, "La contraseña debe contener al menos un número."];
    }
  
    // La contraseña debe contener al menos un carácter especial (!@#$%^&*-).
  if (!/[!@#$%^&*-]/.test(value)) {
    return [false, "La contraseña debe contener al menos un carácter especial (!@#$%^&*-)."];
  }
  
    // La contraseña cumple con todas las reglas, es una contraseña válida.
    return [true, "Contraseña válida."];
  };
  
  export const checkPassword = (value: string, password: string): [boolean, string] => {
    return [value === password, "Las contraseñas no coinciden."];
  };

  export const isValidPhone = (value: string): [boolean, string]  => {
    const phoneRegex = /^(0[1-9]|11|[2-9]\d{1})([2-9]\d{6,7})$/;
    return [phoneRegex.test(value), "El formato del número de teléfono no es válido. (código de área) número."];
  };

  export function isValidJWT(token: string): [boolean, string] {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    return [jwtRegex.test(token), "Formato de token inválido. Por favor, asegúrate de ingresar un token válido."];
}
  
  export const validateInput = (
    text: string,
    validations?: string[]
  ): [string[], string] => {
    const newErrors: string[] = [];
  
    if (validations) {
      validations.forEach((validation) => {
        if (validation.startsWith("minLength:")) {
          const min = Number(validation.split(":")[1]);
          const [isValid, errorText] = minLength(text, min);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation.startsWith("maxLength:")) {
          const max = Number(validation.split(":")[1]);
          const [isValid, errorText] = maxLength(text, max);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation.startsWith("checkPassword:")) {
          const password = validation.split(":")[1];
          const [isValid, errorText] = checkPassword(text, password);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "notEmpty") {
          const [isValid, errorText] = notEmpty(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "isEmail") {
          const [isValid, errorText] = isEmail(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "isValidPhone") {
          const [isValid, errorText] = isValidPhone(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "validPassword") {
          const [isValid, errorText] = validPassword(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "isValidJWT") {
          const [isValid, errorText] = isValidJWT(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "isGreaterThanZero") {
          const value = Number(text);
          const [isValid, errorText] = isGreaterThanZero(value);
          if (!isValid) {
            newErrors.push(errorText);
          }
        }
      });
    }
    
    
  
    const isValid = newErrors.length === 0;
    return [newErrors, isValid ? "" : newErrors[0]];
  };
  