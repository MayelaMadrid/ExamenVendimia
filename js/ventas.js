$(document).ready(function(){  
	
	
	var tasa ;
	var enganche1 ;
	var plazo ;
	
	$('#nuevaVenta').hide();
	$('#alert_Exito').hide();
	$('#alert_falla').hide();
	$('#mensualidades_Buttons').hide();
	
	
	$('#btn_nuevaV').click(function(){
		$('#Ventas').hide();
		$('#nuevaVenta').fadeIn('fast');
	});
	
	//////////////////////////////////////

	$.ajax({
		url: 'modelo/consulta_venta.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#catalogo_ventas').append('<tr>'
					  +'<td>'+v.folio+'</td>'
					  +'<td>'+v.id_cliente+'</td>'
					   +'<td>'+v.nombre_completo+'</td>'
					    +'<td>'+v.total+'</td>'
						 +'<td>'+v.fecha+'</td>'
					 +'</tr>');
			});
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	
	/////////////////////////////////////////
	
	$.ajax({
		url: 'modelo/maximo_venta.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				$('#folio_venta').html("Folio Venta: " + v.folio );
			});
		},
		error: function(xhr, desc, err){ 
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});
	
	
	
///////////////////////////////////
$.ajax({
		url: 'modelo/consulta_configuracion.php',
		type: 'GET',
		dataType: 'JSON',
		success:function(data){
			$(data).each(function(i,v){
				tasa = v.tasa;
				enganche1 = v.enganche;
				plazo = v.plazo;
			});
		},
		error: function(xhr, desc, err){
			console.log(xhr);
			console.log("Detalles: " + desc + "\nError: " + err);
		}
	});	
	
	
	
	
	/////////////////
	
		var ac_cliente = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace("nombre_completo"),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch:{ 
			url:'modelo/consulta_cliente.php',
			cache: false
		}
	});

	ac_cliente.initialize();
	
	$('#cliente').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'ac_cliente',
		source: ac_cliente,
		displayKey: "nombre_completo"
	}).bind("typeahead:selected", function(obj, datum, name) {
		$('#cliente').data('id', datum.id_cliente);
		$('#rfc_cliente').html('RFC: '+datum.rfc);
	});
	///////////////////////
	
		var ac_articulo = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace("descripcion"),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch:{ 
			url:'modelo/consulta_articulo.php',
			cache: false
		}
	});

	ac_articulo.initialize();
	
	$('#articulo').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'ac_articulo',
		source: ac_articulo,
		displayKey: "descripcion"
	}).bind("typeahead:selected", function(obj, datum, name) {
		$('#articulo').data('id', datum.id_articulo);
		$('#articulo').data('existencia', datum.existencia);
		$('#articulo').data('descripcion', datum.descripcion);
		$('#articulo').data('modelo', datum.modelo);
		$('#articulo').data('precio', datum.precio);
		
	});
	
	
	var id_cliente;
		var id_articulo;
		var existencia ;
		var mensaje=document.getElementById("fallaalgo"),cantidad =0;
		var descripcion ;
		var modelo ;
		var precio ;
	var  importe_total=0;
	////////////////////////////////////////
	
	$('#btn_agregar').click(function(){
	
		 id_cliente = $('#cliente').data('id');
		 id_articulo = $('#articulo').data('id');
		 existencia = $('#articulo').data('existencia');
		 cantidad =0;
		 descripcion = $('#articulo').data('descripcion');
		 modelo = $('#articulo').data('modelo');
		 precio = $('#articulo').data('precio');
		 
		 if ($('#im'+id_articulo).length) {
			mensaje.innerHTML="Ya agrego ese articulo";
					$('#alert_falla').fadeIn('fast');
					esconder();
           }else{
		 
				
		if($('#articulo').val() && id_articulo != 0 && existencia >= 1 ){
				
		

				$('#articulos_compra').append(
							'<tr id="'+id_articulo+'tr">'
							  +'<td>'+descripcion+'</td>'
							  +'<td>'+modelo+'</td>'
							  +'<td><input type="number" class="form-control text-center" min="1" id="cantidad" min=1 value="'+0+'" data-precio="'+precio+'" data-id="'+id_articulo+'" data-exi="'+existencia+'"></td>'
							  +'<td id="pi'+id_articulo+'" >$'+0+'</td>'
							  +'<td id="im'+id_articulo+'" >$'+0+'</td>'
							  +'<td class="text-right"><button class="btn btn-small btn-danger" id="btn_eliminar_articulo" data-id="'+id_articulo+'"><i class="fas fa-times"></i>  </button></td>'
							+'</tr>');
						
						
		}else{
			if(existencia == 0) {
					mensaje.innerHTML="El articulo que ha escogido no tiene existencia";
					$('#alert_falla').fadeIn('fast');
					esconder();
					
			}		
			if(!$('#articulo').val() || id_articulo == 0){
				mensaje.innerHTML="Escoja un articulo valido";
					$('#alert_falla').fadeIn('fast');
					esconder();
			}	
			
		   }
		   }
	});
	////////////////////////////////////////////
	
	var precio_iva ;
	var importe;
	var enganche_t;
	var bonificacion_enganche;
	var total_adeudo;
	
	$('#articulos_compra').on('change','#cantidad',function (){
		var cantidad2 = 0, exis;
		var id_articulo2, precio2;
		id_articulo2 =  $(this).data('id');
		cantidad2 = $(this).val();
		precio2 =  $(this).data('precio');
		exis =  $(this).data('exi');
		var imp = $('#im'+id_articulo2).text();
			if(exis<cantidad2){
				mensaje.innerHTML="La cantidad excede la existencia, Favor de verificar";
					$('#alert_falla').fadeIn('fast');
					esconder();
			}	
					 
			
		calcula(imp, cantidad2,precio2,id_articulo2);
		
							
						});
						
	function calcula(imp,cantidad2,precio2,id_articulo2){
		if(imp > 0){
			importe_total -= parseFloat(imp);
			}
		 precio_iva = parseFloat(precio2 * (1 + ((parseFloat(tasa * plazo)) / 100))).toFixed(2);
		 importe = parseFloat( precio_iva  * cantidad2  ).toFixed(2);
		$('#'+"pi"+id_articulo2).html(precio_iva);
		$('#im'+id_articulo2).html(importe);
		importe_total += parseFloat(importe);
							
		 enganche_t = (parseFloat(enganche1 / 100) * importe_total).toFixed(2);
			$('#in_enganche').val(enganche_t);
		
		
		 bonificacion_enganche = (parseFloat(enganche_t *((tasa * plazo)/100))).toFixed(2);
			$('#in_bonificacion').val(bonificacion_enganche);
		
		
		 total_adeudo = (parseFloat(importe_total - enganche_t - bonificacion_enganche)).toFixed(2);
			$('#in_total').val(total_adeudo);
	}
////////////////////////////////////////////
	$('#articulos_compra').on('click','#btn_eliminar_articulo',function(){
		
		var id_articulo3 = $(this).data('id');
		var menos = $('#im'+id_articulo3).text();
		var precio3 = $('#pi'+id_articulo3).text();
		calcula(menos, 0 ,precio3,id_articulo3);
		$(this).closest('tr').remove();
		
		

	});
	/////////////////////////////////////////////
	$('#btn_cancelar').click(function(){
		var mensaje=document.getElementById("fallaalgo");
		var mensaje2=document.getElementById("m2");
		mensaje2.innerHTML="Imposible continuar";
		mensaje.innerHTML="Usted ha cancelado";
				$('#alert_falla').fadeIn('fast');
			setTimeout(function(){
				cargaCuerpo('vistas/ventas');}
			,3000);
		
		
		
	});
	////////////////////////////////////
	
	$('#btn_siguiente').click(function(){
		if(!$('#cliente').data('id') || !$('#in_total').val()){
			if(!$('#cliente').data('id')){
				mensaje.innerHTML="Inserte un cliente";
				$('#alert_falla').fadeIn('fast');
				esconder();
				
			}
			if(!$('#in_total').val()){
				mensaje.innerHTML="Inserte articulos";
				$('#alert_falla').fadeIn('fast');
				esconder();
				
			}
		}else{
			
			mensualidades();
		}
		
		
		
		
		
	});
	/////////////////////////////////////
	function esconder(){
		
	setTimeout(function(){
	$('#alert_falla').hide();}
			,1000);
			
	setTimeout(function(){ 
	$('#alert_Exito').hide();}
			,1000);
	}
	//////////////////////////////////////////////////////
	function mensualidades(){
		$('#botones_venta').hide();
		$('#mensualidades_Buttons').fadeIn('fast');
		
		var mes = 3,precio_contado,total_pago,importe_abono,importe_ahorra ;
		
		precio_contado = parseFloat(total_adeudo / (1 + ((tasa * plazo)/100))).toFixed(2);
		
		while(mes <=12 ){
		total_pago = parseFloat(precio_contado * (1 + (tasa * mes) /100)).toFixed(2);;
		importe_abono = parseFloat(total_pago / mes).toFixed(2);;
		importe_ahorra = parseFloat(total_adeudo - total_pago).toFixed(2);;
			$('#radiobutton-mes').append('<tr>'
									+'<td>'+ mes + ' Abonos de </td>' 
									+'<td>$' + importe_abono + '</td>'
									+'<td id="total_p" data-pago="'+total_pago+'"> Total a pagar: $' + total_pago + '</td>'
									+'<td> Se ahorra: $' + importe_ahorra +'</td>'
									+'<td> <input type="radio" name="mensualidades" id="mes" class="form-control" data-id="'+mes+'"></td>'
									+'</tr>');
			
			
			
		mes +=3;
		}
	}
	
	var mes_seleccionado = 0;
	$('#radiobutton-mes').on('click','#mes',function(){
		mes_seleccionado = $(this).data('id');
	});
	
	//////////////////////////////////////////////////////
	$('#btn_guardar').click(function(){
		
		
		var articulos_a = Array();
				$('#articulos_compra tbody tr').each(function(i, v){
					articulos_a[i] = Array();
					$(this).children('td').each(function(j, k ){
						if(j != 5 ){
							if(j == 2){
								articulos_a[i][j] = $(this).children('.form-control').val();
								articulos_a[i][j+1] = $(this).children('.form-control').data('id');
								// alert(articulos_a[i][j]);
								// alert(articulos_a[i][j+1]);
							}
						}
					});
					
					
				});				
		var mensaje=document.getElementById("fallaalgo");
		
		var datosVenta = {
			"id_cliente": $('#cliente').data('id'),
			"plazos" : mes_seleccionado,
			"total" : $('#in_total').val(),
			"articulos_v": articulos_a
		};
		
		
		
		$.ajax({
			url: 'modelo/inserta_venta.php',
			data: datosVenta,
			type: 'POST',
			success:function(data){
				if(!$('#btn_guardar').data('id')){
					$('#alert_Exito').fadeIn('fast');
				}else{
					mensaje.innerHTML="La venta ha sido registrada correctamente.";
					$('#alert_Exito').fadeIn('fast');
				}
			
				setTimeout(function(){
					cargaCuerpo('vistas/ventas');}
				,3000);
			},
			error: function(xhr, desc, err){
				console.log(xhr);
				console.log("Detalles: " + desc + "\nError: " + err);
			}
		});
		
		

	});

	$('#in_enganche').prop('disabled',true);
	$('#in_bonificacion').prop('disabled',true);
	$('#in_total').prop('disabled',true);
	////////////////////////////////////////////////////////
	
});