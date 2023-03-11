import { createPaletteFromColor } from 'palettey';
import contrast from './lib/color';

// Temporary fix for createPaletteFromColor
const fixPalette = function fixPaletteStep500(palette) {
    const newPalette = palette;
    newPalette[500] = newPalette[500].slice(1);
    return newPalette;
};

// Returns a new colorSettings object
const createColorSettings = function createNewColorSettingsObject(colorHex) {
    const black = '#000000';
    const white = '#FFFFFF';
    const blackContrast = contrast(colorHex, black);
    const whiteContrast = contrast(colorHex, white);
    const primaryFontColor = blackContrast > whiteContrast ? black : white;
    let palette = createPaletteFromColor('primary', colorHex, {
        useLightness: false,
    }).primary;
    palette = fixPalette(palette); // Temporary fix until palette lib is updated

    return {
        primaryColor: colorHex,
        primaryFontColor: primaryFontColor,
        palette: palette,
    };
};

export default createColorSettings;
