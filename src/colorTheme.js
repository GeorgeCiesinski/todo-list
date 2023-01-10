import { createPaletteFromColor } from "palettey";
import contrast from "./lib/color"

// Temporary fix for createPaletteFromColor
const fixPalette = function fixPaletteStep500(palette) {
    const newPalette = palette;
    newPalette[500] = newPalette[500].slice(1);
    return newPalette;
}

// Returns a new colorSettings object
const createColorSettings = function createNewColorSettingsObject(colorHex) {   
    let palette = createPaletteFromColor(
        "primary", 
        colorHex, 
        {
            useLightness: false,
        }
    ).primary;
    palette = fixPalette(palette);
    return {
        'primaryColor': colorHex,
        'palette': palette
    }
}

export default createColorSettings;