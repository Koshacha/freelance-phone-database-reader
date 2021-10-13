<?
$login = $_REQUEST['login'] ?: 'root';
$password = $_REQUEST['password'] ?: 'root';

$con = mysqli_connect('localhost', $login, $password, 'autogma');
mysqli_select_db($con, 'autogma');

if ($con) {
    $filter = "WHERE id IN (" . $_REQUEST['ids'] . ")";
    $set = "SET updated='" . $_REQUEST['date'] . "'";

    if (mysqli_query($con, "UPDATE phone $set $filter")) {
        die(json_encode(array(
            'success' => true
        )));
    } else {
        die(json_encode(array()));
    }
} else {
    die(json_encode(array(
        'success' => true
    )));
}
