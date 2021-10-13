<?
$login = $_REQUEST['login'] ?: 'root';
$password = $_REQUEST['password'] ?: 'root';

$con = mysqli_connect('localhost', $login, $password, 'autogma');
mysqli_select_db($con, 'autogma');

if ($con) {
    $result = array();

    $filter = $_REQUEST['filter'] ?: "";
    $sort = $_REQUEST['filter'] ?: "";
    $item_per_page = intval($_REQUEST['per_page']) ?: 50;
    $current_page = intval($_REQUEST['page']) ?: 0;

    if ($filter) {
        $where = 'WHERE ' . $filter;
    }

    if ($sort) {
        $order = 'ORDER BY ' . $sort;
    } else {
        $order = 'ORDER BY id ASC';
    }

    if ($item_per_page) {
        $limit = 'LIMIT ' . $item_per_page;
    }

    if ($current_page) {
        $offset = 'OFFSET ' . ($item_per_page * $current_page);
    }

    $count_query = mysqli_query($con, "SELECT COUNT(*) FROM phone");
    $count = mysqli_fetch_array($count_query);

    $query = mysqli_query($con, "SELECT * FROM phone $where $order $limit $offset");

    while ($item = mysqli_fetch_assoc($query)) {
        $result[] = $item;
    }

    die(json_encode(array(
        'count' => $count["COUNT(*)"],
        'items' => $result
    )));
} else {
    die(json_encode(array()));
}
