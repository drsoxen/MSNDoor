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

		var $card = $('<div>');
		$card.addClass('col-md-3');
		$card.css('opacity', '100');
		$card.appendTo($doors);

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

	var $Txt = $('<h2>');
		$Txt.text(JSON.stringify(window.SystemInfo.doors));
		$Txt.appendTo($inner);
	}	


}

function SetupUserCards(){
$users.empty();
	for (var i = 0; i < window.SystemInfo.users.length; ++i) {

		var $card = $('<div>');
		$card.addClass('col-md-3');
		$card.css('opacity', '100');
		$card.appendTo($users);

	var $inner = $('<div>');
		$inner.addClass('inner');
		$inner.appendTo($card);

	var $Txt = $('<h2>');
		$Txt.text(JSON.stringify(window.SystemInfo.users[i].name));
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

	var $Txt = $('<h2>');
		$Txt.text(JSON.stringify(window.SystemInfo.log));
		$Txt.appendTo($inner);
}
