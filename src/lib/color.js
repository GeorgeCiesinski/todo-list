// Measure the relative luminance of each RGB value
const reLum = function relativeLuminance(RGB) {
    let newRGB = RGB;
    newRGB /= 255;
    return newRGB <= 0.03928 ?
    newRGB / 12.92 :
    (newRGB + 0.055) / 1.055 ** 2.4;
}

// Measure the luminance of the color
const lum = function luminance(r, g, b) {
    const a = [r, g, b].map(reLum);
    return Number(a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722).toFixed(3);
}

// Convert hex values to RGB
const hexToRGB = function convertHexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] :
    null;
}

// Measure the contrast between two colors
const contrast = function findContrast(hex1, hex2) {
    const rgb1 = hexToRGB(hex1);
    const rgb2 = hexToRGB(hex2);
    const lum1 = lum(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = lum(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

export default contrast;