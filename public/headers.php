<?
function get_column_names($con, $table)
{
    $sql = "SELECT COLUMN_NAME, COLUMN_COMMENT
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = '$table'
    ORDER BY ORDINAL_POSITION";
    $result = mysqli_query($con, $sql);

    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        if ($row['COLUMN_COMMENT']) {
            $rows[] = array(
                'code' => $row['COLUMN_NAME'],
                'text' => $row['COLUMN_COMMENT']
            );
        }
    }

    return $rows;
}

$login = $_REQUEST['login'];
$password = $_REQUEST['password'];

if (!$login && !$password) {
    echo json_encode(array());
    die();
}

$con = mysqli_connect('localhost', $login, $password, 'autogma');
mysqli_select_db($con, 'autogma');

if ($con) {
    $col_names = get_column_names($con, 'phone');
    echo json_encode($col_names);
} else {
    echo json_encode(array());
}

mysqli_close($con);
