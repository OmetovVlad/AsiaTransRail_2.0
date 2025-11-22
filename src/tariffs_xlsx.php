<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__DIR__) . '/error.log');

$vendorPath = dirname(__DIR__) . '/vendor/box/spout';
require_once $vendorPath . '/src/Spout/Autoloader/autoload.php';

use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;

const FROM = 0;
const TO = 1;
const TYPE = 2;
const COST = 3;
const COST_TYPE = 4;
const DELIVERY_TIME = 5;

try {
    $dataPath = __DIR__ . '/files/tariffs-data.xlsx';
    $reader = ReaderEntityFactory::createReaderFromFile($dataPath);
    $reader->open($dataPath);

    foreach ($reader->getSheetIterator() as $sheet) {
        foreach ($sheet->getRowIterator() as $row) {
            if ($sheet->getRowIterator()->key() === 1) continue;
            $data = $row->toArray();
            $routes[$data[FROM]][$data[TO]][] = [
                'Тип перевозки' => [$data[TYPE]][0],
                'Стоимость' => [$data[COST]][0],
                'Единица измерения' => [$data[COST_TYPE]][0],
                'Сроки' => [$data[DELIVERY_TIME]][0],
            ];
        }
    }
    $reader->close();
}
catch (Exception $exception){
    $log_file = dirname(__DIR__) . '/error.log';
    error_log($exception, 3, $log_file);
    return false;
}
?>

<section id="tariffs">
    <div class="container">

        <div class="title title--white">
            <h2>Наши тарифы</h2>
            <!--<span>Главное в бизнесе — люди</span>-->
        </div>

        <div class="routes__controls">
            <div class="routes__select">
                <label for="fromSelect">Откуда:</label>
                <select id="fromSelect" name="from">
                    <?php
                    $first = true;
                    foreach ($routes as $from => $toList) {
                    echo '<option value="' . htmlspecialchars($from) . '"' . ($first ? ' selected' : '') . '>' . htmlspecialchars($from) . '</option>';
                    $first = false;
                    }
                    ?>
                </select>
            </div>

            <div class="routes__selects-group">
                <?php
                    $firstGroup = true;
                    foreach ($routes as $from => $toList) {
                        echo '<div class="routes__select' . ($firstGroup ? ' active' : '') . '" id="' . htmlspecialchars($from) . '">';
                        echo '<label>Куда:</label>';
                        echo '<select>';
                            $firstTo = true;
                            foreach ($toList as $to => $rows) {
                                echo '<option value="' . htmlspecialchars($to) . '"' . ($firstTo && $firstGroup ? ' selected' : '') . '>' . htmlspecialchars($to) . '</option>';
                                $firstTo = false;
                            }
                            echo '</select>';
                        echo '</div>';
                        $firstGroup = false;
                    }
                ?>
            </div>
        </div>

        <div class="routes__tables">
            <?php
                foreach ($routes as $from => $toList) {
                    foreach ($toList as $to => $rows) {
                        echo '<table class="table table-hover" id="' . htmlspecialchars($from) . '_' . htmlspecialchars($to) . '">';
                        echo '<colgroup>';
                        echo '<col>';
                        echo '<col>';
                        echo '<col>';
                        echo '<col>';
                        echo '</colgroup>';
                        echo '<thead><tr>';
                        echo '<th>Тип перевозки</th><th>Стоимость</th><th>Единица измерения</th><th>Сроки</th>';
                        echo '</tr></thead><tbody>';

                        $prevType = null;
                        foreach ($rows as $row) {
                            $type = trim($row['Тип перевозки']);

                            // Определяем класс по типу
                            $class = '';
                            if (stripos($type, 'Авиа') !== false) $class = 'avia';
                            elseif (stripos($type, 'Прямое ж/д генеральное') !== false) $class = 'train';
                            elseif (stripos($type, 'Море') !== false) $class = 'ship';
                            elseif (stripos($type, 'Авто генеральное') !== false) $class = 'avto';

                            echo '<tr class="' . $class . '">';
                            // Если тип совпадает с предыдущим — оставляем ячейку пустой
                            if ($type !== $prevType && $type !== '') {
                                echo '<th><span>' . htmlspecialchars($type) . '</span></th>';
                            } else {
                                echo '<th></th>';
                            }
                            echo '<td>' . htmlspecialchars($row['Стоимость']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['Единица измерения']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['Сроки']) . '</td>';
                            echo '</tr>';

                            $prevType = $type;
                        }

                        echo '</tbody></table>';
                    }
                }
            ?>
        </div>

    </div>

</section>