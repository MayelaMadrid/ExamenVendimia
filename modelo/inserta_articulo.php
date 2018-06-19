<?php
	require ('conexion.php');
	
	$id_articulo = $_POST['id_articulo'];
	$descripcion = $_POST['descripcion'];
	$modelo = $_POST['modelo']; 
	$precio = $_POST['precio']; 
	$existencia = $_POST['existencia'] ;
		
	 
if( !isset( $id_articulo ) ){	
	$query = "INSERT INTO articulos(id_articulo, descripcion,  modelo, precio, existencia) 
				VALUES 	(null,?,?,?,?)";
									
			if ($stmt = $mysqli->prepare($query)){
				
				$stmt->bind_param("ssii",$descripcion, $modelo, $precio, $existencia);

				$stmt->execute();
								
				$id_cliente = $stmt->insert_id;
				
				$stmt->close();
			}
			
	return $id_articulo;
}else{
	
	$query = "UPDATE 
					articulos
				SET 
					descripcion = ?,  modelo = ?, precio = ?, existencia = ?   
				WHERE id_articulo = ?";
		
		if($stmt = $mysqli->prepare($query)){
			
			$stmt->bind_param("ssiii",$descripcion, $modelo, $precio, $existencia, $id_articulo);
			
			$stmt->execute();
			
			$stmt->close();
			
		}
	
	
}
		
?>