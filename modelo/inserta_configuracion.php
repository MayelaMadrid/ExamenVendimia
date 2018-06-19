<?php
require ('conexion.php');
	$tasa = $_POST['tasa'];
	$enganche = $_POST['enganche'];
	$plazo = $_POST['plazo'];
	
	$query_config = "SELECT COUNT(*) as config FROM configuracion";
	
	if($stmt = $mysqli->prepare($query_config)){
		
		$stmt->execute();
		
		$stmt->bind_result($config);
		
		while($stmt->fetch()){
			
		}
		
		$stmt->close();
		
	}
	
	if($config == 0){
		
		$query = "INSERT INTO 
						configuracion(id_configuracion,tasa, enganche, plazo) 
					VALUES 
						(null,?,?,?)";
		
		if($stmt = $mysqli->prepare($query)){
			
			$stmt->bind_param("iii",$tasa, $enganche, $plazo);
			
			$stmt->execute();
			
			$stmt->close();
			
		}
	
	}else{
	
		$query = "UPDATE 
					configuracion 
				SET 
					tasa = ?, enganche = ?, plazo = ? WHERE id_configuracion = 1";
		
		if($stmt = $mysqli->prepare($query)){
			
			$stmt->bind_param("iii",$tasa, $enganche, $plazo);
			
			$stmt->execute();
			
			$stmt->close();
			
		}
		
	}
	
	$respuesta = 1;
	
?>