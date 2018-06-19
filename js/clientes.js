
$(document).ready(function(){  
	
	
	$('#NuevoCliente').hide();
	$('#alert_Exito').hide();
	$('#alert_falla').hide();
	
	$('#botonNC').click(function(){
		$('#Clientes').hide();
		$('#NuevoCliente').fadeIn('fast');
	});
	
	$.ajax({
		url: 'modelo/consulta_cliente.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#catalogo_clientes').append('<tr>'
					  +'<td>'+v.id_cliente+'</td>'
					  +'<td>'+v.nombre_completo+'</td>'
					  +'<td class="text-right"><button class="btn btn-small btn-info" id="btn_editar" data-id="'+v.id_cliente+'"></button></td>'
					 +'</tr>');
			});
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	///////////////////////////////////////////////
	$.ajax({
		url: 'modelo/maximo_cliente.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
			$('#folio_cliente').html("Clave: " + v.id_cliente);
			});
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	

	////////////////////////////////////////////
	
	
	$('#catalogo_clientes').on('click','#btn_editar',function(){
		$('#Clientes').hide();
		$('#NuevoCliente').fadeIn('fast');
		var id_cliente = $(this).data('id');
		
		$.ajax({
		url: 'modelo/consulta_cliente_por_id.php?id_cliente='+id_cliente,
		type: 'GET',
		data: id_cliente,
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#Name').val(v.nombre);
				$('#apepat').val(v.apellido_paterno);
				$('#apemat').val(v.apellido_materno);
				$('#RFC').val(v.rfc );
			});
			
				$('#btn_guardar').data('id',id_cliente);
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
		
		
		
	});
	
	
	
	////////////////////////////////////////////
	
	
	
	$('#btn_guardar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
	if(!$('#Name').val() || !$('#apepat').val() || !$('#apemat').val() || !$('#RFC').val()){
			
			
			if(!$('#Name').val()){
				
				mensaje.innerHTML="El campo nombre es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			
			if(!$('#apepat').val()){
				mensaje.innerHTML="El campo apellido paterno es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			
			if(!$('#apemat').val()){
				mensaje.innerHTML="El campo apellido materno es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			if(!$('#RFC').val()){
				mensaje.innerHTML="El campo RFC es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
		}else{
		var datosCliente = {
			"id_cliente": $('#btn_guardar').data('id'),
			"nombre" : $('#Name').val(),
			"apellido_paterno" : $('#apepat').val(),
			"apellido_materno" : $('#apemat').val(),
			"rfc" : $('#RFC').val()
		};
		
		$.ajax({
			url: 'modelo/inserta_cliente.php',
			data: datosCliente,
			type: 'POST',
			success:function(data){
				if(!$('#btn_guardar').data('id')){
					$('#alert_Exito').fadeIn('fast');
				}else{
					mensaje.innerHTML="El cliente ha sido actualizado correctamente.";
					$('#alert_Exito').fadeIn('fast');
				}
			
			setTimeout(function(){
				cargaCuerpo('vistas/clientes');}
			,3000);
			
			},
			error: function(xhr, desc, err){
				console.log(xhr);
				console.log("Detalles: " + desc + "\nError: " + err);
			}
		});
		
		}

	});


	
	//////////////////////////////////////////////
	
	$('#btn_cancelar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
		var mensaje2=document.getElementById("m2");
		mensaje2.innerHTML="Imposible continuar";
		mensaje.innerHTML="Usted ha cancelado";
				$('#alert_falla').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/clientes');}
			,3000);
		
		
		
	});
	
	
	
	
});