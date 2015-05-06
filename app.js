$(function() {
	$('#canvas').mousemove(xy);
	$('#canvas').on('click', colorClicked);
});

xy = function(event) {
	var x = event.offsetX;
	var y = event.offsetY;

	hsl(x,y);
};

hsl = function(x,y) {
	// Hue is a value from 0 - 360.
	var h = Math.round((x / 360) * 360); // The divisor is the width of the html element.
	var s = 100; // Saturation = 100 when dealing with solid colors.
	var l = Math.round((y / 360) * 100); // The divisor is the height of the html element.

	changeColor(h,s,l);
};

changeColor = function(h,s,l) {
	// Changes the color of the background as you move the mouse.
	$('#canvas').css('background','hsl('+h+','+s+'%,'+l+'%)');

	displayRGB(h,s,l);
};

displayRGB = function(h,s,l) {
	$('#hsl').html(h+', '+s+'%, '+l+'%');

	// Javascript converts hsl css properties to rgb automatically.
	// How nice. Now we can just scrape that data ;)
	var rgbBg = $('#canvas').css('background');
	var end = rgbBg.split('').indexOf(')');
	
	rgb = rgbBg.split('').slice(3, end + 1).join('').slice(1,-1);
	rgb = rgb.split(',');
	
	r = rgb[0];
	g = rgb[1];
	b = rgb[2];

	// Display the rgb values.
	$('#rgb').html(r+', '+g+', '+b);

	// Pass the r,g,b values to the displayHEX fxn
	// so we can do the conversions there.
	displayHEX(r,g,b);
};

displayHEX = function(r,g,b) {
	// All the math courtesy of: https://goo.gl/Gi0WAb

	// HEX letter conversion logic.
	var hexLetterizer = function(num) {
		if(num === 10) {num = 'a'};
		if(num === 11) {num = 'b'};
		if(num === 12) {num = 'c'};
		if(num === 13) {num = 'd'};
		if(num === 14) {num = 'e'};
		if(num === 15) {num = 'f'};

		return num;
	};

	var rHexWhole = hexLetterizer(parseInt(r / 16)); // The whole-number portion.
	var rHexRemainder = hexLetterizer(Math.round(((r / 16) % 1) * 16)); // The decimal-point portion.
	var hexR = '' + rHexWhole + rHexRemainder;

	var gHexWhole = hexLetterizer(parseInt(g / 16)); // The whole-number portion.
	var gHexRemainder = hexLetterizer(Math.round(((g / 16) % 1) * 16)); // The decimal-point portion.
	var hexG = '' + gHexWhole + gHexRemainder;

	var bHexWhole = hexLetterizer(parseInt(b / 16)); // The whole-number portion.
	var bHexRemainder = hexLetterizer(Math.round(((b / 16) % 1) * 16)); // The decimal-point portion.
	var hexB = '' + bHexWhole + bHexRemainder;

	// Display the HEX values.
	$('#hex').html(hexR+', '+hexG+', '+hexB);
};

colorClicked = function() {
	// Swatch background changing.
	bg = $('#canvas').css('background');
	$('#swatch').css('background', bg);

	var hsl = $('<p>').html($('<span class="swatchValue">').text('HSL: ' + $('#hsl').text()));
	var rgb = $('<p>').html($('<span class="swatchValue">').text('RGB: ' + $('#rgb').text()));
	var hexValue = $('#hex').text().split(', ').join('');
	var hex = $('<p>').html($('<span class="swatchValue">').text('HEX: #' + hexValue));

	$('#swatch').empty();
	$('#swatch').append(hsl)
							.append(rgb)
							.append(hex);
};

