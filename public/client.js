window.LoadFinished = false;
window.ReadyFinished = false;
var $window = $(window);
var $body = $('body');

var $tennants;
var $submitDialog = $('#confirm-submit')


$window.on('load', function() {
	window.LoadFinished = true;
	if (window.ReadyFinished) {
		Setup();
	}
});

$(document).ready(function() {
	window.ReadyFinished = true;
	if (window.LoadFinished) {
		Setup();
	}
});

function Setup() {
	$tennants = $('#Tenants')

	SetupDoorCards();
}

function SetupDoorCards(){
$tennants.empty();
	for (var i = 0; i < window.SystemInfo.tenants.length; ++i) {

	var tenantInfo = window.SystemInfo.tenants[i];

	var $card = $('<div>');
		$card.addClass('col-md-3');
		$card.css('opacity', '100');
		$card.appendTo($tennants);
		$card.attr('data-toggle', 'modal');
		$card.attr('data-target', '#confirm-submit');
		$card.attr('index',i);
		$card.on('click', function(){
			var tenant = window.SystemInfo.tenants[$(this).attr('index')];

			$companyname = $('#CompanyName');
			$companyname.text(tenant.company);
			$companyname.css('text-align','center');

			$companyinfo = $('#CompanyInfo');
			$companyinfo.text("");
			$companyinfo.css('text-align','left');
			$companyinfo.css('white-space', 'pre-wrap');

			for (var j = 0; j < tenant.contacts.length; ++j) {
				$tenantinfo = $('<div>');
				$tenantinfo.addClass('inner');
				$tenantinfo.addClass('col-md-3');
				if(tenant.contacts[j].hasOwnProperty('phone'))
					$tenantinfo.text(tenant.contacts[j].name + "\n" + tenant.contacts[j].phone + "\n" + tenant.contacts[j].email);
				else
					$tenantinfo.text(tenant.contacts[j].name + "\n" + tenant.contacts[j].email);
				
				
				$tenantinfo.appendTo($companyinfo);

				if(tenant.contacts[j].emailBtn == true)
				{
					$emailBtn = $('<button>');
					$emailBtn.css('float','right');
					$emailBtn.attr('tenantindex', j);
					$emailBtn.attr('data-toggle', 'modal');
					$emailBtn.attr('data-target', '#confirm-submit');

					$emailBtn.html('<span class="fa fa-bell"> Tell them you\'re here</span>');

					$emailBtn.on('click', function() { 
						$.ajax({
							type: "POST",
							url: "/email",
							data: {data: tenant.contacts[$(this).attr('tenantindex')].email},
							dataType: 'JSON',
							success: function(msg){
		               			console.log(success);
		                      }
		                    });
						});

					$emailBtn.appendTo($tenantinfo);
				}
			}

			$submitButton = $('#submit.btn.btn-success.success');
			var email = tenant.email;

			});

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

	var $Txt = $('<h4>');
		$Txt.text(window.SystemInfo.tenants[i].company);		
		$Txt.html($Txt.html().replace(/\n/g,'<br/>'));
		$Txt.css('text-align','center');
		$Txt.appendTo($inner);

	}

	// 	$lock = $('<a>');
	// 	$lock.addClass('btn');
	// 	$lock.addClass('btn-default');
	// 	$lock.addClass('btn-xs');
	// 	$lock.html('<span class="fa fa-lock"></span>');
	// 	$lock.appendTo($actionBtns);

	// 	$lock.on('click', function(){
	// 		$.ajax({
	// 			type: "POST",
	// 			url: 'http://' + ipaddress + '/Message',
	// 			data: "Message=lock",
	// 			dataType: 'x-www-form-urlencoded',
	// 			success: function() {
	// 				console.log('Success');
	//     		}
	// 		});
	// 		return false; 
	// 	});

	// 	$unlock = $('<a>');
	// 	$unlock.addClass('btn');
	// 	$unlock.addClass('btn-default');
	// 	$unlock.addClass('btn-xs');
	// 	$unlock.html('<span class="fa fa-unlock"></span>');
	// 	$unlock.appendTo($actionBtns);

	// 	$unlock.on('click', function(){
	// 		$.ajax({
	// 			type: "POST",
	// 			url: 'http://' + ipaddress + '/Message',
	// 			data: "Message=unlock",
	// 			dataType: 'x-www-form-urlencoded',
	// 			success: function() {
	// 				console.log('Success');
	//     		}
	// 		});
	// 		return false; 
	// 	});

	// 	$pulse_unlock = $('<a>');
	// 	$pulse_unlock.addClass('btn');
	// 	$pulse_unlock.addClass('btn-default');
	// 	$pulse_unlock.addClass('btn-xs');
	// 	$pulse_unlock.html('<span class="fa fa-unlock-alt"></span>' + '<span class="fa fa-clock-o"></span>');
	// 	$pulse_unlock.appendTo($actionBtns);

	// 	$pulse_unlock.on('click', function(){
	// 		$.ajax({
	// 			type: "POST",
	// 			url: 'http://' + ipaddress + '/Message',
	// 			data: "Message=long_pulse_unlock",
	// 			dataType: 'x-www-form-urlencoded',
	// 			success: function() {
	// 				console.log('Success');
	//     		}
	// 		});
	// 		return false; 
	// 	});
	// }
}