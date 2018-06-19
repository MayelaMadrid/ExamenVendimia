<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$query = "SELECT max(id_articulo)
				FROM 
				articulos 
			";
					
	if($stmt = $mysqli->prepare($query)){
		
		
		$stmt->execute();
		
		$stmt->bind_result($id_articulo);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_articulo" => $id_articulo + 1
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>