/**
 * 
 */

var domain = "http://127.0.0.1:8181";

$(document).ready(function() {
	
	displayadvertisementlist();

	displaycompanylistondropdown();
	
	displayscreenlistondropdown();

	$(document).on('submit', '#newadd', function() {
		 
		var postData = $("#newadd").serialize();
		
		$.ajax({			
			url : domain + '/addnewadvertisement',
			type : 'POST',
			data : postData,			
			success : function(data) {
				if (data.success == false) {
					alert(data.extras);
				}  
				displayadvertisementlist();
			},
			failure : function(data) {
				alert("Screen Not Added");
			}
		});
		
		return false;
	});

});

$('#screennameid').on('change', function() {
	
	var selectedvalue = $('#screennameid').val();
	var screendetails_array = selectedvalue.split("~");	
	displaypositionlistondropdown(screendetails_array[0]);
});

$('#selectpositionid').on('change', function() {
	
	var selectpositionval = $('#selectpositionid').val();
	var selectpositionval_array = selectpositionval.split("~");
	var newSrc = "/findimage/"+selectpositionval_array[3];
	$('img[id="referenceimageid"]').attr('src', newSrc);
	
	var chargeAmount = selectpositionval_array[4];
	$('#charge_amount').val(chargeAmount);
	$('#charge_amount').focus();
});




var displaycompanylistondropdown = function() {
	
	$.ajax({			
		url : domain + '/getallcompanylist',
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#company_list').empty();
			$('#company_list').append(
			        $('<option></option>').val("").html("-Choose Company Name-")
			);
			$("#company_list_dropdown").tmpl(obj.extras).appendTo("#company_list");
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

var displaypositionlistondropdown = function(screenid) {
	
	$.ajax({			
		url : domain + '/getpositionsforscreen/'+screenid,
		type : 'GET',			
		success : function(data) {
			var obj = JSON.parse(data);
			$('#selectpositionid').empty();
			$('#selectpositionid').append(
			        $('<option></option>').val("").html("-Choose Position Name-")
			);
			$("#position_list_dropdown").tmpl(obj.extras).appendTo("#selectpositionid");
		},
		failure : function(data) {
			alert("Position Not Added");
		}
	});
}

var deletedocument = function(id){
	$.ajax({			
		url : domain + '/removeadvertisement',
		type : 'post',
		data : {docid:id},			
		success : function(data) {
			displaylist(data);
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
        	var newSrc = "/findimage/"+obj.extras._id;
        	$('img[id="imageid"]').attr('src', newSrc);
        	$('#uploaded_add_id').val(obj.extras._id);
        },
        failure: function(data) {
            alert("file not uploaded");
    	}
    });
});


$('#displaystartdate').on('change', function() {
	
	totalpricecalculation(); 
	
});

$('#displayenddate').on('change', function() {
	
	totalpricecalculation(); 
	
});

var totalpricecalculation = function() {
	
	var enddateval = $('#displayenddate').val();
	var startdateval = $('#displaystartdate').val();
	var baseCharge = $('#charge_amount').val();
	
	var totalCalculatedMonths = 0;
	
	if (enddateval === "" || startdateval === "") {
		return false;
	} else {
		var enddateval_array = enddateval.split("~");	
		var startdateval_array = startdateval.split("~");	
		
		var startdate_MON 	= startdateval_array[1];
		var startdate_YEAR 	= startdateval_array[0];
		var enddate_MON 	= enddateval_array[1];
		var enddate_YEAR 	= enddateval_array[0];	
		
		if (enddate_YEAR > startdate_YEAR) {
			alert("End date can not be before Start Date !!");
			return false;
		} else if (enddate_YEAR == startdate_YEAR) {
			
			if (startdate_MON > enddate_MON) {
				alert("End date can not be before Start Date !!");
				return false;
			} else if (startdate_MON === enddate_MON) {
				totalCalculatedMonths = 1;
			} else if (startdate_MON < enddate_MON) {
				totalCalculatedMonths = (enddate_MON - startdate_MON) + 1;
			}
			
		} else if (enddate_YEAR > startdate_YEAR) {
			
			var yeardifference = enddate_YEAR - startdate_YEAR;
			
			if (startdate_MON >= enddate_MON) {
				if (yeardifference > 1) {
					totalCalculatedMonths =  ((enddate_MON + 12) - startdate_MON ) + 1 + (yeardifference * 12);
				} else if (yeardifference === 1) {
					totalCalculatedMonths =  ((enddate_MON + 12) - startdate_MON ) + 1 ;
				}
				
				
			}  else if (startdate_MON < enddate_MON) {
				totalCalculatedMonths = (enddate_MON - startdate_MON) + 1 + (yeardifference * 12);
			}

		}
	} 
	
	
	 $('#total_charge_amount').val(totalCalculatedMonths*baseCharge);
	 $('#total_charge_amount').focus();
	
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
        	$("#generatedimageidentifier").val(obj.extras._id);
        	$('img[id="imageid"]').attr('src', newSrc);
        },
        failure: function(data) {
            alert("file not uploaded");
    	}
    });
});

var displayadvertisementlist = function() {
	
	$.ajax({			
		url : domain + '/getalladvertisementlist',
		type : 'GET',			
		success : function(data) {
			displaylist(data);
		},
		failure : function(data) {
			alert("Screen Not Added");
		}
	});
}

var displaylist = function(data) {
	var obj = JSON.parse(data);
	$('#advertisementHolder').empty();
	$("#addvertisement_list").tmpl(obj.extras).appendTo("#advertisementHolder");
}

var formatdate = function(date) {
	var date_array = date.split("~");
	var formatteddate = date_array[1] + " / "+ (Number(2000) + Number(date_array[0])); 
	return formatteddate;
}


