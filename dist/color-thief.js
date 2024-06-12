const { getPixels } = require('ndarray-pixels');
const quantize = require('@lokesh.dhakar/quantize');
const fs = require('fs').promises;

async function createPixelArray(imgData, pixelCount, quality) {
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

function validateOptions(options) {
	let { colorCount, quality } = options;
	colorCount = Number.isInteger(colorCount) ? Math.max(2, Math.min(colorCount, 20)) : 10;
	quality = Number.isInteger(quality) && quality > 0 ? quality : 10;
	return { colorCount, quality };
}

async function loadImg(imgPath) {
	const imgBuffer = await fs.readFile(imgPath);
	const imgUint8Array = new Uint8Array(imgBuffer);
	return getPixels(imgUint8Array, 'image/png');
}

async function getColor(img, quality) {
	const palette = await getPalette(img, 5, quality);
	return palette[0];
}

async function getPalette(img, colorCount = 10, quality = 10) {
	const options = validateOptions({ colorCount, quality });
	const imgData = await loadImg(img);
	const pixelCount = imgData.shape[0] * imgData.shape[1];
	const pixelArray = await createPixelArray(imgData.data, pixelCount, options.quality);
	const cmap = quantize(pixelArray, options.colorCount);
	return cmap ? cmap.palette() : null;
}

module.exports = {
	getColor,
	getPalette
};
