/**
 * 
 */

var domain = "http://127.0.0.1:8181";

$(document).ready(function() {
	

});

 

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
        	var newSrc = "/findimage/"+obj.extras._id;
        	$('img[id="imageid"]').attr('src', newSrc);
        	$('#uploaded_add_id').val(obj.extras._id);
        },
        failure: function(data) {
            alert("file not uploaded");
    	}
    });
});



