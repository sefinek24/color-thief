const { resolve } = require('path');
const ColorThief = require(resolve(process.cwd(), 'dist/color-thief.js'));
const img = resolve(process.cwd(), 'cypress/test-pages/img/rainbow-vertical.png');

describe('getColor()', function() {
	it('returns valid color', async function() {
		const color = await ColorThief.getColor(img);
		expect(color).toHaveLength(3);
	});
});

describe('getPalette()', function() {
	it('returns 5 colors when colorCount set to 5', async function() {
		const palette = await ColorThief.getPalette(img, 5);
		expect(palette).toHaveLength(5);
	});

	it('returns 9 colors when colorCount set to 9', async function() {
		const palette = await ColorThief.getPalette(img, 9);
		expect(palette).toHaveLength(9);
	});
});
