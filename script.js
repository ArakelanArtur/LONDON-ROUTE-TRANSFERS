document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });

  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.97)';
  });

  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1.05)';
  });
});

const form = document.querySelector('#booking form');
if (form) {
  const fields = {
    name: { selector: 'input[name="name"]', validate: v => v.trim() ? '' : 'Введите имя и фамилию' },
    phone: {
      selector: 'input[name="phone"]',
      validate: v => {
        if (!v.trim()) return 'Введите телефон';
        if (!/^[\d\s\-\+\(\)]{7,20}$/.test(v.trim())) return 'Некорректный номер телефона';
        return '';
      }
    },
    email: {
      selector: 'input[name="email"]',
      validate: v => {
        if (!v.trim()) return 'Введите email';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Некорректный email';
        return '';
      }
    },
    service: { selector: 'select[name="service"]', validate: v => v ? '' : 'Выберите тип услуги' },
    pickup: { selector: 'input[name="pickup"]', validate: v => v.trim() ? '' : 'Введите адрес подачи' },
    destination: { selector: 'input[name="destination"]', validate: v => v.trim() ? '' : 'Введите пункт назначения' },
    date: { selector: 'input[name="date"]', validate: v => v ? '' : 'Выберите дату поездки' },
    time: { selector: 'input[name="time"]', validate: v => v ? '' : 'Выберите время подачи' },
    passengers: {
      selector: 'input[name="passengers"]',
      validate: v => {
        if (!v) return 'Укажите количество пассажиров';
        if (parseInt(v) < 1) return 'Минимум 1 пассажир';
        return '';
      }
    },
    consent: {
      selector: 'input[name="consent"]',
      validate: v => v ? '' : 'Подтвердите согласие на обработку данных'
    }
  };

  Object.values(fields).forEach(({ selector }) => {
    const el = form.querySelector(selector);
    if (el) {
      const err = document.createElement('span');
      err.className = 'field-error';
      el.parentNode.insertBefore(err, el.nextSibling);
      el.addEventListener('input', () => validateField(el, fields));
      el.addEventListener('change', () => validateField(el, fields));
    }
  });

  function validateField(el, fields) {
    const entry = Object.values(fields).find(f => el.matches(f.selector));
    if (!entry) return;
    const err = el.parentNode.querySelector('.field-error');
    const msg = entry.validate(el.type === 'checkbox' ? el.checked : el.value);
    err.textContent = msg;
    el.classList.toggle('field-invalid', !!msg);
    el.classList.toggle('field-valid', !msg);
    return !msg;
  }

  form.addEventListener('submit', e => {
    let valid = true;
    Object.values(fields).forEach(({ selector, validate }) => {
      const el = form.querySelector(selector);
      if (!el) return;
      const err = el.parentNode.querySelector('.field-error');
      const msg = validate(el.type === 'checkbox' ? el.checked : el.value);
      err.textContent = msg;
      el.classList.toggle('field-invalid', !!msg);
      el.classList.toggle('field-valid', !msg);
      if (msg) valid = false;
    });
    if (!valid) e.preventDefault();
  });
}
