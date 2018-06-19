<?PHP

	$mysqli = new mysqli('localhost', 'root', '12345678', 'lavendimia');

	mysqli_set_charset($mysqli, "utf8");

	if (mysqli_connect_errno()){
		printf("La conexion fallo: %s\n", mysqli_connect_error());
		exit();
	}
?>
