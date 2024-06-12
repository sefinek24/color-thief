const { getPixels } = require('ndarray-pixels');
const quantize = require('@lokesh.dhakar/quantize');

function createPixelArray(imgData, pixelCount, quality) {
	const pixelArray = [];

	for (let i = 0; i < pixelCount; i += quality) {
		const offset = i * 4;
		const [r, g, b, a] = [imgData[offset], imgData[offset + 1], imgData[offset + 2], imgData[offset + 3]];

		if (a === undefined || a >= 125) {
			if (!(r > 250 && g > 250 && b > 250)) {
				pixelArray.push([r, g, b]);
			}
		}
	}
	return pixelArray;
}

function validateOptions({ colorCount = 10, quality = 10 }) {
	if (!Number.isInteger(colorCount) || colorCount < 2 || colorCount > 20) {
		throw new Error('colorCount should be between 2 and 20.');
	}
	if (!Number.isInteger(quality) || quality < 1) {
		quality = 10;
	}
	return { colorCount, quality };
}

function loadImg(img) {
	return getPixels(img, 'image/png');
}

async function getColor(img, quality) {
	const palette = await getPalette(img, 5, quality);
	return palette[0];
}

async function getPalette(img, colorCount = 10, quality = 10) {
	const options = validateOptions({ colorCount, quality });
	const imgData = await loadImg(img);
	const pixelCount = imgData.shape[0] * imgData.shape[1];
	const pixelArray = createPixelArray(imgData.data, pixelCount, options.quality);
	const cmap = quantize(pixelArray, options.colorCount);
	return cmap ? cmap.palette() : null;
}

module.exports = {
	getColor,
	getPalette
};
