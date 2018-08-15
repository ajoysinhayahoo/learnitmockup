/**
 * 
 */

var domain = "http://127.0.0.1:8181";

$(document).ready(function() {

	displayproviderlist();
	
	$(document).on('submit', '#providrform', function() {
		 
		var postData = $("#providrform").serialize();
		
		$.ajax({			
			url : domain + '/addproviderdata',
			type : 'post',
			data : postData,			
			success : function(data) {
				var obj = JSON.parse(data);
				$('#providerlistholder').empty();
				$("#provider_list").tmpl(obj.extras).appendTo("#providerlistholder");
			},
			failure : function(data) {
				alert("Screen Not Added");
			}
		});
		
		$('#providrform')[0].reset(); 
		return false;
	});

});

var displayproviderlist = function() {
	
	$.ajax({			
		url : domain + '/getallproviderlist',
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#providerlistholder').empty();
			$("#provider_list").tmpl(obj.extras).appendTo("#providerlistholder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}

var deletedocument = function(id){
	$.ajax({			
		url : domain + '/removeprovider',
		type : 'post',
		data : {docid:id},			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#providerlistholder').empty();
			$("#provider_list").tmpl(obj.extras).appendTo("#providerlistholder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}
