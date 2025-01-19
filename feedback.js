document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отключаем стандартное поведение формы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Очистка предыдущих ошибок
    clearErrors();

    // Проверка имени
    if (!name) {
        showError(document.getElementById('name'), "Поле 'Имя' обязательно для заполнения.");
        return;
    }

    // Проверка email
    if (!email) {
        showError(document.getElementById('email'), "Поле 'Email' обязательно для заполнения.");
        return;
    } else if (!validateEmail(email)) {
        showError(document.getElementById('email'), "Введите корректный email. Пример: example@mail.com");
        return;
    }

    // Проверка сообщения
    if (!message) {
        showError(document.getElementById('message'), "Поле 'Сообщение' обязательно для заполнения.");
        return;
    }

    // Если все проверки пройдены, отправляем данные через EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('NMvqxvmuH1LvzRBNaV-ck', 'husL8zOcDy95XFJkK', templateParams) // Замените на ваш Service ID и Template ID
        .then(function(response) {
            Swal.fire({
                title: 'Успех!',
                text: 'Ваше сообщение успешно отправлено! Спасибо за обратную связь!',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            document.getElementById('feedback-form').reset(); // Очистка формы
        }, function(error) {
            Swal.fire({
                title: 'Ошибка!',
                text: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
});

// Функция для проверки email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Функция для вывода ошибки
function showError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
}

// Функция для очистки ошибок
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}
