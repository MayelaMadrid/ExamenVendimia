<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	
	
	
	$query = "SELECT max(id_cliente)
				FROM 
				clientes
			";
					
	if($stmt = $mysqli->prepare($query)){
		
		
		$stmt->execute();
		
		$stmt->bind_result($id_cliente);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_cliente" => $id_cliente + 1
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>