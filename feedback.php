<?php
// Проверяем, что форма была отправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $to = htmlspecialchars($_POST['to']); // Адрес получателя из JavaScript

    // Проверяем, что все поля заполнены
    if (empty($name) || empty($email) || empty($message)) {
        echo "Все поля обязательны для заполнения.";
        exit;
    }

    // Проверяем корректность email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Введите корректный email.";
        exit;
    }

    // Тема письма
    $subject = "Новое сообщение с сайта от $name";

    // Текст письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Сообщение:\n$message\n";

    // Заголовки письма
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Отправка письма
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Сообщение отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
} else {
    echo "Некорректный запрос.";
}
?>