$(document).ready(function(){

	var link = "";
	
	$('.navbar').on('click','.dropdown-item',function(){
		
		var file_name = $(this).data('link');
		
		switch(file_name){
			case 0:
				cargaCuerpo("index"+link);
				break;
			case 1:
				link = "ventas";
				break;
			case 2:
				link = "clientes";
				break;
			case 3:
				link  = "articulo";
				break;
			case 4:
				link = "configuracion";    /*nombre de las vistas*/
				break;
		}		
		
		cargaCuerpo("vistas/"+link);
		
	});
	
fecha();
	
	
});

function cargaCuerpo(link){
	$('#cuerpo').load(link +'.html');
}	

function fecha(){				
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = 'Fecha: ' + d.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;
	
	$('#fecha').html(output);
}