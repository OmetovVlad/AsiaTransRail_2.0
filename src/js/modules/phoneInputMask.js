const phoneInputs = document.querySelectorAll('.phone');
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

phoneInputs.forEach((phoneInput) => {
  const mask = IMask(phoneInput, maskOptions);
})