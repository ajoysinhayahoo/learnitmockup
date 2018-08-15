/**
 * 
 */

var domain = "http://127.0.0.1:8181";

$(document).ready(function() {

	displayscreenlist();
	
	$(document).on('submit', '#screenaddition', function() {
		 
		var postData = $("#screenaddition").serialize();
		$.ajax({			
			url : domain + '/addscreendata',
			type : 'post',
			data : postData,			
			success : function(data) {
				var obj = JSON.parse(data);
				$('#screenlistholder').empty();
				$("#screen_list").tmpl(obj.extras).appendTo("#screenlistholder");
			},
			failure : function(data) {
				alert("Screen Not Added");
			}
		});
		
		$("#screen_identifier").val("");
		$("#screen_name").val("");
		$("#screen_desc").val("");
		return false;
	});

});

var displayscreenlist = function() {
	
	$.ajax({			
		url : domain + '/getallscreenlist',
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#screenlistholder').empty();
			$("#screen_list").tmpl(obj.extras).appendTo("#screenlistholder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}

var deletedocument = function(id){
	$.ajax({			
		url : domain + '/removescreen',
		type : 'post',
		data : {docid:id},			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#screenlistholder').empty();
			$("#screen_list").tmpl(obj.extras).appendTo("#screenlistholder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}
