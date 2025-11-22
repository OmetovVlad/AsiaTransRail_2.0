import { Modal } from 'bootstrap';
import {bodyLock, bodyUnLock} from "./baseFunctions.js";

// Инициализация формы
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        // Закрываем текущее окно
        const currentModalEl = form.closest('.modal');
        const currentModal = Modal.getInstance(currentModalEl);

        if (currentModalEl) {
          currentModal.hide();
        }


        const phone = form.querySelector('input[name="phone"]').value;
        const approve = form.querySelector('input[name="isagree"]').checked;
        const subscribe = 0;

        let sendFormURL = '/lead_form_phone.php'
        let data = {};

        if (form.querySelector('input[name="name"]')) {
          sendFormURL = '/lead_form_price.php'

          const name = form.querySelector('input[name="name"]').value;
          const email = form.querySelector('input[name="email"]').value;
          const message = form.querySelector('textarea[name="message"]').value;

          data = {
            name: name,
            phone: phone,
            email: email,
            message: message,
            confirmPolicy: approve
          };
        } else {
          data = {
            phone: phone,
            confirmPolicy: approve,
            subscribe: subscribe
          };
        }

        fetch(sendFormURL, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(data => {
          // Очистим форму после отправки
          form.reset();
          form.classList.remove('was-validated');
        })
        .catch(err => {
          console.error("Ошибка при отправке формы:", err);
        });

        // Открываем модалку успеха
        const successModalEl = document.getElementById('successModal');
        const successModal = new Modal(successModalEl);
        successModal.show();

      } else {
        form.classList.add('was-validated');
      }
    }, false);
  });
})();

const phoneInputs = document.querySelectorAll('.phone');
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

phoneInputs.forEach((phoneInput) => {
  const mask = IMask(phoneInput, maskOptions);

  phoneInput.addEventListener('input', () => {
    const unmasked = mask.unmaskedValue;
    if (unmasked.length === 11) {
      phoneInput.setCustomValidity('');
    } else {
      phoneInput.setCustomValidity('Введите корректный номер телефона');
    }
  });
});