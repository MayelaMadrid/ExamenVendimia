<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$query = "SELECT 
					v.folio, v.id_cliente , c.nombre, c.apellido_paterno, c.apellido_materno , v.total, v.fecha
				FROM 
					ventas v
					
				INNER JOIN clientes c
				
				ON v.id_cliente = c.id_cliente";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->execute();
		
		$stmt->bind_result($folio,$id_cliente, $nombre, $apellido_paterno, $apellido_materno, $total,$fecha);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"folio" => $folio,
				"id_cliente" => $id_cliente,
				"nombre_completo" => $nombre.' '.$apellido_paterno.' '.$apellido_materno,
				"total" => $total,
				"fecha" => $fecha
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)

?>