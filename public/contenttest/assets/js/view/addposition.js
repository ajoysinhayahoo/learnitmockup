/**
 * 
 */

var domain = "http://127.0.0.1:8181";

$(document).ready(function() {

	displaypositionlist();
	
	displayscreenlistondropdown();
	
	
	$(document).on('submit', '#screenpositions', function() {
		 
		var postData = $("#screenpositions").serialize();
		$.ajax({			
			url : domain + '/addscreenposition',
			type : 'post',
			data : postData,			
			success : function(data) {
				var obj = JSON.parse(data);
				$('#positionHolder').empty();
				$("#position_list").tmpl(obj.extras).appendTo("#positionHolder");
			},
			failure : function(data) {
				alert("Screen Not Added");
			}
		});
		
		return false;
	});

});

var displaypositionlist = function() {
	
	$.ajax({			
		url : domain + '/getallpositionlist',
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#positionHolder').empty();
			$("#position_list").tmpl(obj.extras).appendTo("#positionHolder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}

var displayscreenlistondropdown = function() {
	
	$.ajax({			
		url : domain + '/getallscreenlist',
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#screennameid').empty();
			$('#screennameid').append(
			        $('<option></option>').val("").html("-Choose Screen Name-")
			);
			$("#screen_list_dropdown").tmpl(obj.extras).appendTo("#screennameid");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}

var deletedocument = function(id){
	$.ajax({			
		url : domain + '/removeposition',
		type : 'post',
		data : {docid:id},			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#positionHolder').empty();
			$("#position_list").tmpl(obj.extras).appendTo("#positionHolder");
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}


$('button#uploadimage').click( function() {
	
    $.ajax({
        url: domain + '/api/photo',
        type: 'post',
        data: new FormData($('form#uploadForm')[0]),
        processData: false,
        contentType: false,
        multiple: true,
        success: function(data) {
        	var obj = JSON.parse(data);
        	console.log(JSON.stringify(obj));
        	console.log(JSON.stringify(obj.extras));	        	
        	alert(obj.extras._id);
        	var newSrc = "/findimage/"+obj.extras._id;
        	alert($("#generatedimageidentifier"));
        	$("#generatedimageidentifier").val(obj.extras._id);
        	$('img[id="imageid"]').attr('src', newSrc);
        },
        failure: function(data) {
            alert("file not uploaded");
    	}
    });
});