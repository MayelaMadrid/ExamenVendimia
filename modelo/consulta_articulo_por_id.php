<?PHP
	require ('conexion.php');
	$respuesta = array();
	
	$id_articulo = $_GET['id_articulo'];
	
	
	$query = "SELECT 
					id_articulo, descripcion,modelo,precio,existencia
				FROM 
					articulos
				WHERE id_articulo = ?";
					
	if($stmt = $mysqli->prepare($query)){
		
		$stmt->bind_param("i",$id_articulo);
		
		$stmt->execute();
		
		$stmt->bind_result($id_articulo, $descripcion,$modelo,$precio , $existencia);
		
		while($stmt->fetch()){
			
			$respuesta[] = array(
				"id_articulo" => $id_articulo,
				"descripcion" => $descripcion,
				"modelo" => $modelo,
				"precio" => $precio,
				"existencia" => $existencia
			);
			
		}
		
		$stmt->close();
	}
	
	echo json_encode($respuesta)


?>