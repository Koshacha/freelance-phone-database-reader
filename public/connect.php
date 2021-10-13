<?
error_reporting(E_ERROR | E_PARSE);

$login = $_REQUEST['login'] ?: 'root';
$password = $_REQUEST['password'] ?: 'root';

$con = mysqli_connect('localhost', $login, $password, 'autogma');
if (!$con) {
    die(json_encode(array(
        'success' => false
    )));
} else {
    die(json_encode(array(
        'success' => true
    )));
}
