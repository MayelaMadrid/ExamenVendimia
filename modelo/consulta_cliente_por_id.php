<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$id_cliente = $_GET['id_cliente'];
	
	
	
	$query = "SELECT 
					id_cliente, nombre, apellido_paterno, apellido_materno, rfc
				FROM 
					clientes 
				WHERE id_cliente = ?";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->bind_param("i",$id_cliente);
		
		$stmt->execute();
		
		$stmt->bind_result($id_cliente, $nombre, $apellido_paterno, $apellido_materno, $rfc);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_cliente" => $id_cliente,
				"nombre" => $nombre,
				"apellido_paterno" => $apellido_paterno,
				"apellido_materno" => $apellido_materno,
				"rfc" => $rfc
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>