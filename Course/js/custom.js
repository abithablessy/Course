$(document).ready(function () {
	debugger;
	/*$.ajax({
		  crossOrigin: true,
		  url: "https://frontend-hiring.appspot.com/all_courses?secret=HelloMars",
		  //dataType: "json", //no need. if you use crossOrigin, the dataType will be override with "json"
		  //charset: 'ISO-8859-1', //use it to define the charset of the target url
		  context: {},
		  success: function(data) {
			  alert(data);
			  console.log(JSON.parse(data));
			  var obj =JSON.parse(data);
			  var categoryobj =JSON.parse(obj.payload);
			  console.log(categoryobj);
			  alert(obj.payload);
			  alert(categoryobj[0].category);
			  //$( '#test' ).html(data);
			}
		}).done(function( data, textStatus, jqXHR ) {
			//alert(data);
		});*/

	var data = {
		"status": 200,
		"message": "OK",
	"payload": "[{\"category\": \"Engineering\", \"description\": \"\\u003Cspan style=\\\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\\\"\\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis semper ipsum sed convallis. Integer eget quam ac felis imperdiet hendrerit id ac lectus. Proin nec laoreet est, a tincidunt felis\\u003C/span\\u003E\", \"end_date\": \"2020-08-19\", \"title\": \"Course 1\", \"estimated_workload\": \"4 hrs per day\", \"instructor_name\": \"Hello C\", \"start_date\": \"2020-03-18\"}, {\"category\": \"Engineering\", \"description\": \"\\u003Cspan style=\\\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\\\"\\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis semper ipsum sed convallis. Integer eget quam ac felis imperdiet hendrerit id ac lectus. Proin nec laoreet est, a tincidunt felis\\u003C/span\\u003E\", \"end_date\": \"2020-08-19\", \"title\": \"Course 2\", \"estimated_workload\": \"3 hrs per day\", \"instructor_name\": \"Prof B\", \"start_date\": \"2020-03-18\"}, {\"category\": \"Mathematics\", \"description\": \"\\u003Cspan style=\\\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\\\"\\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis semper ipsum sed convallis. Integer eget quam ac felis imperdiet hendrerit id ac lectus. Proin nec laoreet est, a tincidunt felis\\u003C/span\\u003E\", \"end_date\": \"2020-05-27\", \"title\": \"Course 3\", \"estimated_workload\": \"2 hrs per day\", \"instructor_name\": \"Prof B\", \"start_date\": \"2020-04-22\"}, {\"category\": \"Computer\", \"description\": \"\\u003Cspan style=\\\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\\\"\\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis semper ipsum sed convallis. Integer eget quam ac felis imperdiet hendrerit id ac lectus. Proin nec laoreet est, a tincidunt felis\\u003C/span\\u003E\", \"end_date\": \"2020-05-27\", \"title\": \"Course 4 - Hello World\", \"estimated_workload\": \"2 hrs per day\", \"instructor_name\": \"Prof A\", \"start_date\": \"2020-04-22\"}]"
	};
	var obj = JSON.parse(JSON.stringify(data));
	var categoryobj = JSON.parse(obj.payload);
	console.log(categoryobj);
	var binddata = '';
	for (i = 0; i < categoryobj.length; i++) {
		var regstatus = '';
		var converttosd = new Date(categoryobj[i].start_date);
		var startmonth = converttosd.toLocaleString('default', {
			month: 'long'
		});
		var startdate = converttosd.getDate();

		var converttoed = new Date(categoryobj[i].end_date);
		var endmonth = converttoed.toLocaleString('default', {
			month: 'long'
		});
		var enddate = converttoed.getDate();
		var weeks = getweeks(converttosd, converttoed);

		if (new Date(categoryobj[i].start_date).getTime() > new Date().getTime()) {
			//Date greater than today's date 
			regstatus = 'Pre-registration';
		} else if ((new Date(categoryobj[i].start_date).getTime() < new Date().getTime()) && (new Date().getTime() < new Date(categoryobj[i].end_date).getTime())) {
			regstatus = 'Ongoing';
		} else {
			regstatus = 'Completed';
		}

		binddata += '<div class="col-md-4 box ' + categoryobj[i].category + ' all"><div class="card"><div class="card-body"><div class="top-title"><div class="row"><div class="col-md-3"><span class="dot"></span></div><div class="col-md-9"><h5 class="card-title">' + categoryobj[i].title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + categoryobj[i].instructor_name + '</h6></div></div></div><div class="desc margintop20"><div class="row"><div class="col-md-3 divmiddle"><i class="fa fa-info-circle imiddle" aria-hidden="true"></i></div><div class="col-md-9"><p class="card-text">' + categoryobj[i].description + '</p></div></div></div><div class="details margintop20"><div class="row"><div class="col-md-3 divmiddle"><i class="fa fa-calendar imiddle" aria-hidden="true"></i></div><div class="col-md-9 prereg"><p class="card-text bold">' + regstatus + '</p><p class="card-text bold">' + startmonth + ' ' + startdate + ' - ' + endmonth + ' ' + enddate + '</p><p class="card-text">' + weeks + ' weeks, ' + categoryobj[i].estimated_workload + '</p></div></div></div></div></div></div>'

	}
	$("#coursedata").html(binddata);


	function getweeks(d1, d2) {
		return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
	}
});