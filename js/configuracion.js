$(document).ready(function(){  
	
	
	$('#alert_Exito').hide();
	$('#alert_falla').hide();
	
	
	
	$.ajax({
		url: 'modelo/consulta_configuracion.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#tasa').val(v.tasa);
				$('#enganche').val(v.enganche);
				$('#plazo').val(v.plazo);
			});
		},
		error: function(xhr, desc, err){
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	

	$('#btn_guardar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
	if($(!'#tasa').val() && !$('#enganche').val() && !$('#plazo').val()){ 
		mensaje.innerHTML="Por lo menos un campo debe ser rellenado.";
		$('#alert_falla').fadeIn('fast');
		}else{
		
		var datosConfig = {
			"tasa" : $('#tasa').val(),
			"enganche" : $('#enganche').val(),
			"plazo" : $('#plazo').val(),
		};
		
		$.ajax({
			url: 'modelo/inserta_configuracion.php',
			data: datosConfig,
			type: 'POST',
			success:function(data){
			$('#alert_Exito').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/configuracion');}
			,3000);
			
			},
			error: function(xhr, desc, err){
				console.log(xhr);
				console.log("Detalles: " + desc + "\nError: " + err);
			}
		});
		
		}
		
	});
	/////////////////////////////////////
	$('#btn_cancelar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
		var mensaje2=document.getElementById("m2");
		mensaje2.innerHTML="Imposible continuar";
		mensaje.innerHTML="Usted ha cancelado";
				$('#alert_falla').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/configuracion');}
			,3000);
		
		
		
	});
	
	
	
});