<?PHP
	require ('conexion.php');
	
	$respuesta = array();
	
	$query = "SELECT 
					id_configuracion, tasa, enganche, plazo
				FROM 
					configuracion";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->execute();
		
		$stmt->bind_result($id_configuracion, $tasa, $enganche, $plazo);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_configuracion" => $id_configuracion,
				"tasa" => $tasa,
				"enganche" => $enganche,
				"plazo" => $plazo
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>