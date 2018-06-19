<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$query = "SELECT MAX(folio)
				FROM 
				ventas
			";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->execute();
		
		$stmt->bind_result($folio);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"folio" => $folio + 1
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>