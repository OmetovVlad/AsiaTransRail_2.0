<?php

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : '';

if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'POST-request empty']);
    exit;
}

function validateAndNormalizePhone($phone) {
    // Удаляем все нецифровые символы
    $cleanedPhone = preg_replace('/[^0-9]/', '', $phone);

    // Проверяем длину и формат
    if (strlen($cleanedPhone) === 11 && preg_match('/^7[0-9]{10}$/', $cleanedPhone)) {
        // Нормализуем к формату +7 (999) 999-99-99
        return sprintf('+7 (%s) %s-%s-%s',
            substr($cleanedPhone, 1, 3),
            substr($cleanedPhone, 4, 3),
            substr($cleanedPhone, 7, 2),
            substr($cleanedPhone, 9, 2)
        );
    } elseif (strlen($cleanedPhone) === 10 && preg_match('/^[0-9]{10}$/', $cleanedPhone)) {
        // Если введен номер без кода страны (10 цифр), добавляем +7
        return sprintf('+7 (%s) %s-%s-%s',
            substr($cleanedPhone, 0, 3),
            substr($cleanedPhone, 3, 3),
            substr($cleanedPhone, 6, 2),
            substr($cleanedPhone, 8, 2)
        );
    }

    return false;
}

function validateLang($lang){
    $lang = htmlspecialchars(trim($lang));
    if($lang === 'en'){
        return $lang;
    }
    else return 'ru';
}

function validateEmail($email) {
    $email = htmlspecialchars(trim($email));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return '';
    }

    return $email;
}


// Валидация телефона
$normalizedPhone = validateAndNormalizePhone($phone);
if ($normalizedPhone === false) {
    echo json_encode(['success' => false, 'message' => 'Wrong phone format. Example: +7 (999) 999-99-99 or 79999999999', 'normalizedPhone' => $normalizedPhone]);
    exit;
}

$confirmPolicy = isset($data['confirmPolicy']) ? htmlspecialchars($data['confirmPolicy']) : '';
// $subscribe = isset($data['subscribe']) ? htmlspecialchars($data['subscribe']) : '';
$lang = isset($data['lang']) ? validateLang($data['lang']) : 'ru';
$name = isset($data['name']) ? htmlspecialchars($data['name']) : '';
$email = isset($data['email']) ? validateEmail($data['email']) : '';
$message = isset($data['message']) ? htmlspecialchars($data['message']) : '';


$webhookUrl = 'https://b24-s2bzt2.bitrix24.ru/rest/1/mifivml9rgtdowo3/crm.lead.add.json';

// Подготовка данных для отправки в Битрикс24
$data = [
    'fields' => [
        'TITLE' => 'Лид с сайта: АТР (Рассчитать стоимость)',
        'LANGUAGE' => $lang,
        'NAME' => $name,
        'PHONE' => [['VALUE' => $normalizedPhone, 'VALUE_TYPE' => 'WORK']],
        'EMAIL' => [['VALUE' => $email, 'VALUE_TYPE' => 'WORK']],
        'COMMENTS' => $message,
        'CONFIRM_POLICY' => $confirmPolicy,
        'SOURCE_ID' => 'WEB', // Источник лида
        'SOURCE_DESCRIPTION' => 'Заявка с формы сайта'
    ],
    'params' => ['REGISTER_SONET_EVENT' => 'Y'] // Регистрация события в ленте
];

$log = json_encode($data);
file_put_contents('logged_leads.log', date('Y-m-d H:i:s') . ": $log\n", FILE_APPEND);

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $webhookUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_SSL_VERIFYPEER => false
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);


if ($httpCode == 200) {
    $result = json_decode($response, true);
    if (isset($result['result'])) {
        echo json_encode(['success' => true, 'message' => 'Lead successful created', 'lead_id' => $result['result']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error during lead creating: ' . $result['error_description']]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error HTTP: ' . $httpCode]);
}