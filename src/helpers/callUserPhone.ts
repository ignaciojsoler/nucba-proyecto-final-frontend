export const callUserPhone = (userPhone: string | undefined | null) => {
    if (!userPhone || userPhone === undefined) alert("Parece que el número de teléfono del usuario no está disponible :(")
  window.location.href = `tel:${userPhone}`;
};