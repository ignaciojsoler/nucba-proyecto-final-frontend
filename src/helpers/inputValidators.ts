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
  
  export const validPassword = (value: string): [boolean, string] => {
    return [value.length >= 8, "La contraseña debe tener al menos 8 caracteres."];
  };
  
  export const checkPassword = (value: string, password: string): [boolean, string] => {
    return [value === password, "Las contraseñas no coinciden."];
  };
  
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
          const password = String(validation.split(":")[1]);
          const [isValid, errorText] = checkPassword(text, password);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else if (validation === "notEmpty") {
          const [isValid, errorText] = notEmpty(text);
          if (!isValid) {
            newErrors.push(errorText);
          }
        } else {
          switch (validation) {
            case "isEmail": {
              const [isValid, errorText] = isEmail(text);
              if (!isValid) {
                newErrors.push(errorText);
              }
              break;
            }
            case "validPassword": {
              const [isValid, errorText] = validPassword(text);
              if (!isValid) {
                newErrors.push(errorText);
              }
              break;
            }
            default:
              break;
          }
        }
      });
    }
  
    const isValid = newErrors.length === 0;
    return [newErrors, isValid ? "" : newErrors[0]];
  };
  