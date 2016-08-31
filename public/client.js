window.LoadFinished = false;
window.ReadyFinished = false;
var $window = $(window);
var $body = $('body');

var $doors;
var $users;
var $log;

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
	$doors = $('#Doors')
	$users = $('#Users')
	$log = $('#Log')

	SetupDoorCards();
	SetupUserCards();
	SetupLogCard();
}


function SetupDoorCards(){
$doors.empty();
	for (var i = 0; i < window.SystemInfo.doors.length; ++i) {

	var ipaddress = window.SystemInfo.doors[i].ip;

	var $card = $('<div>');
		$card.addClass('col-md-3');
		$card.css('opacity', '100');
		$card.appendTo($doors);

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

	var $Txt = $('<h4>');
		$Txt.text('Device id: ' + window.SystemInfo.doors[i].id + '\n' + 'Device ip: ' + window.SystemInfo.doors[i].ip);		
		$Txt.html($Txt.html().replace(/\n/g,'<br/>'));
		$Txt.appendTo($inner);

		$actionBtns = $('<div>');
		$actionBtns.addClass('btn-group-justified');
		$actionBtns.attr('role', 'group');
		$actionBtns.attr('aria-label', '...');
		$actionBtns.appendTo($inner);

		$lock = $('<a>');
		$lock.addClass('btn');
		$lock.addClass('btn-default');
		$lock.addClass('btn-xs');
		$lock.html('<span class="fa fa-lock"></span>');
		$lock.appendTo($actionBtns);

		$lock.on('click', function(){
			$.ajax({
				type: "POST",
				url: 'http://' + ipaddress + '/Message',
				data: "Message=lock",
				dataType: 'x-www-form-urlencoded',
				success: function() {
					console.log('Success');
	    		}
			});
			return false; 
		});

		$unlock = $('<a>');
		$unlock.addClass('btn');
		$unlock.addClass('btn-default');
		$unlock.addClass('btn-xs');
		$unlock.html('<span class="fa fa-unlock"></span>');
		$unlock.appendTo($actionBtns);

		$unlock.on('click', function(){
			$.ajax({
				type: "POST",
				url: 'http://' + ipaddress + '/Message',
				data: "Message=unlock",
				dataType: 'x-www-form-urlencoded',
				success: function() {
					console.log('Success');
	    		}
			});
			return false; 
		});

		$pulse_unlock = $('<a>');
		$pulse_unlock.addClass('btn');
		$pulse_unlock.addClass('btn-default');
		$pulse_unlock.addClass('btn-xs');
		$pulse_unlock.html('<span class="fa fa-unlock-alt"></span>' + '<span class="fa fa-clock-o"></span>');
		$pulse_unlock.appendTo($actionBtns);

		$pulse_unlock.on('click', function(){
			$.ajax({
				type: "POST",
				url: 'http://' + ipaddress + '/Message',
				data: "Message=long_pulse_unlock",
				dataType: 'x-www-form-urlencoded',
				success: function() {
					console.log('Success');
	    		}
			});
			return false; 
		});
	}	


}

function SetupUserCards(){
$users.empty();
	for (var i = 0; i < window.SystemInfo.users.length; ++i) {

		var $card = $('<div>');
		$card.addClass('col-md-2');
		$card.css('opacity', '100');
		$card.appendTo($users);

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

	var $Txt = $('<h4>');
		$Txt.addClass('centerText');
		$Txt.text(window.SystemInfo.users[i].name + '\n' + window.SystemInfo.users[i].id);
		$Txt.html($Txt.html().replace(/\n/g,'<br/>'));
		$Txt.appendTo($inner);
	}	
}

function SetupLogCard(){
	$log.empty();

	var $card = $('<div>');
		$card.addClass('col-md-15');
		$card.css('opacity', '100');
		$card.appendTo($log);

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

for (var i = 0; i < window.SystemInfo.log.length; ++i) {

	var $Txt = $('<h4>');
		$Txt.text(window.SystemInfo.log[i].time + ' ' + window.SystemInfo.log[i].name);
		$Txt.appendTo($inner);
	}
}
