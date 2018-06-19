<?php
	require ('conexion.php');
	
	$id_cliente = $_POST['id_cliente'];
	$plazos = $_POST['plazos'];
	$total = $_POST['total']; 
	
	$id_venta = 0;
	
	$query = "INSERT INTO ventas(folio, id_cliente, plazos, total, fecha) 
				VALUES 	(null,?,?,?,NOW())";
									
	if ($stmt = $mysqli->prepare($query)){
		
		$stmt->bind_param("iis",$id_cliente, $plazos , $total);

		$stmt->execute();
						
		$id_venta = $stmt->insert_id;
		
		$stmt->close();
	}
	
	$articulos_v = $_POST['articulos_v'];
	
	$id_venta_articulo = 0;
	
	foreach ($articulos_v as $articulos_a){
		
		$cantidad = $articulos_a['2'] ;
		$id_articulo = $articulos_a['3'] ;
		
		$query2 = "INSERT INTO ventas_articulos(id_venta_articulo, id_venta, id_articulo, cantidad) 
			VALUES 	(null,?,?,?)";
		
		if ($stmt2 = $mysqli->prepare($query2)){
			
			$stmt2->bind_param("iii", $id_venta, $id_articulo, $cantidad);

			$stmt2->execute();

			$id_venta_articulo = $stmt2->insert_id;
			
			$stmt2->close();
		}
		
		$query3 = "UPDATE 
						articulos
					SET 
						existencia = existencia - ?   
					WHERE 
						id_articulo = ?";
		
		if ($stmt3 = $mysqli->prepare($query3)){
			
			$stmt3->bind_param("ii", $cantidad, $id_articulo);

			$stmt3->execute();
			
			$stmt3->close();
		}
		
		
	}
	
	echo json_encode($id_venta_articulo);
?>