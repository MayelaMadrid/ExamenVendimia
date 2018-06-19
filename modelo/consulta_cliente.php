<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	
	$query = "SELECT 
					id_cliente, nombre, apellido_paterno, apellido_materno, rfc
				FROM 
					clientes";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->execute();
		
		$stmt->bind_result($id_cliente, $nombre, $apellido_paterno, $apellido_materno, $rfc);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_cliente" => $id_cliente,
				"nombre_completo" => $nombre.' '.$apellido_paterno.' '.$apellido_materno,
				"rfc" => $rfc
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>