const colorThief = new ColorThief();


const images = [
	'black.png',
	'red.png',
	'rainbow-horizontal.png',
	'rainbow-vertical.png'
	// 'transparent.png',
	// 'white.png',
];

// Render example images
const examplesHTML = Mustache.to_html(document.getElementById('image-tpl').innerHTML, images);
document.getElementById('example-images').innerHTML = examplesHTML;

// Once images are loaded, process them
document.querySelectorAll('.image').forEach((image) => {
	const section = image.closest('.image-section');
	if (this.complete) {
		showColorsForImage(image, section);
	} else {
		image.addEventListener('load', function() {
			showColorsForImage(image, section);
		});
	}
});

// Run Color Thief functions and display results below image.
// We also log execution time of functions for display.
const showColorsForImage = function(image, section) {
	// getColor(img)
	const start = Date.now();
	const result = colorThief.getColor(image);
	const elapsedTime = Date.now() - start;
	const colorHTML = Mustache.to_html(document.getElementById('color-tpl').innerHTML, {
		color: result,
		colorStr: result.toString(),
		elapsedTime
	});

	// getPalette(img)
	let paletteHTML = '';
	const colorCounts = [2, 3, 5, 7, 10, 20];
	colorCounts.forEach((count) => {
		const start = Date.now();
		const result = colorThief.getPalette(image, count);
		const elapsedTime = Date.now() - start;
		paletteHTML += Mustache.to_html(document.getElementById('palette-tpl').innerHTML, {
			count,
			palette: result,
			paletteStr: result.toString(),
			elapsedTime
		});
	});

	const outputEl = section.querySelector('.output');
	outputEl.innerHTML += colorHTML + paletteHTML;
};
