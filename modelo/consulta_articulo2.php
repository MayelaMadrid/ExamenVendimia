<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$query = "SELECT 
					id_articulo, descripcion
				FROM 
					articulos";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->execute();
		
		$stmt->bind_result($id_articulo, $descripcion);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"descripcion" => $descripcion,
				"modelo" => $modelo,
				"precio" => $precio
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>