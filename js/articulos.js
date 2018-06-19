$(document).ready(function(){  
	
	
	$('#NuevoArticulo').hide();
	$('#alert_Exito').hide();
	$('#alert_falla').hide();
	
	
	$('#btnArticulo').click(function(){
		$('#Articulos').hide();
		$('#NuevoArticulo').fadeIn('fast');
		$('#h2').html("Registro de Articulos");
	});
	
	
	$.ajax({
		url: 'modelo/consulta_articulo.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#catalogo_articulos').append('<tr>'
					  +'<td>'+v.id_articulo+'</td>'
					  +'<td>'+v.descripcion+'</td>'
					  +'<td class="text-right"><button class="btn btn-small btn-info" id="btn_editar" data-id="'+v.id_articulo+'"></button></td>'
					 +'</tr>');
			});
		},
		error: function(xhr, desc, err){
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	
	/////////////////////////////////////////////////
	
	
	$('#catalogo_articulos').on('click','#btn_editar',function(){
		$('#h2').html("Actualizacion de Articulos");
		$('#Articulos').hide();
		$('#NuevoArticulo').fadeIn('fast');
		var id_articulo = $(this).data('id');
		
		$.ajax({
		url: 'modelo/consulta_articulo_por_id.php?id_articulo='+id_articulo,
		type: 'GET',
		data: id_articulo,
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#descripcion').val(v.descripcion);
				$('#modelo').val(v.modelo);
				$('#precio').val(v.precio);
				$('#existencia').val(v.existencia );
			});
			
				$('#btn_guardar').data('id',id_articulo);
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
		
		
		
	});
	
	
//////////////////////////////////////////////////
	$('#btn_guardar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
	if(!$('#descripcion').val() || !$('#modelo').val() || !$('#precio').val() || !$('#existencia').val()){
			
			
			if(!$('#descripcion').val()){
				
				mensaje.innerHTML="El campo descripcion es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			
			if(!$('#modelo').val()){
				mensaje.innerHTML="El campo modelo es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			
			if(!$('#precio').val()){
				mensaje.innerHTML="El campo precio es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
			if(!$('#existencia').val()){
				mensaje.innerHTML="El campo existencia es obligatorio.";
				$('#alert_falla').fadeIn('fast');
			}
		}else{
		
		var datosArticulo = {
			"id_articulo": $('#btn_guardar').data('id'),
			"descripcion" : $('#descripcion').val(),
			"modelo" : $('#modelo').val(),
			"precio" : $('#precio').val(),
			"existencia" : $('#existencia').val()
		};
		
		$.ajax({
			url: 'modelo/inserta_articulo.php',
			data: datosArticulo,
			type: 'POST',
			success:function(data){
			$('#alert_Exito').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/articulo');}
			,3000);
			
			},
			error: function(xhr, desc, err){
				console.log(xhr);
				console.log("Detalles: " + desc + "\nError: " + err);
			}
		});
		
		}
		
	});
	
	//////////////////////////////////////////////////////////
	$('#btn_cancelar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
		var mensaje2=document.getElementById("m2");
		mensaje2.innerHTML="Imposible continuar";
		mensaje.innerHTML="Usted ha cancelado";
				$('#alert_falla').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/articulo');}
			,3000);
		
		
		
	});

});