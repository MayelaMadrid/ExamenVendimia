<?php
	require ('conexion.php');
	
	$id_cliente = $_POST['id_cliente'];
	$nombre = $_POST['nombre'];
	$apellido_paterno = $_POST['apellido_paterno']; 
	$apellido_materno = $_POST['apellido_materno']; 
	$rfc = $_POST['rfc'] ;
		
	
		if( !isset( $id_cliente ) ){	
			
	$query = "INSERT INTO clientes(id_cliente, nombre,  apellido_paterno, apellido_materno, RFC) 
				VALUES 	(null,?,?,?,?)";
									
			if ($stmt = $mysqli->prepare($query)){
				
				$stmt->bind_param("ssss",$nombre, $apellido_paterno, $apellido_materno, $rfc);

				$stmt->execute();
								
				$id_cliente = $stmt->insert_id;
				
				$stmt->close();
			}
			
	return $id_cliente;
		}else{
			$query = "UPDATE 
					clientes
				SET 
					nombre = ?,  apellido_paterno = ?, apellido_materno = ?, RFC = ?   
				WHERE id_cliente = ?";
		
		if($stmt = $mysqli->prepare($query)){
			
			$stmt->bind_param("ssssi",$nombre, $apellido_paterno, $apellido_materno, $rfc, $id_cliente);
			
			$stmt->execute();
			
			$stmt->close();
			
		}
}
		
?>