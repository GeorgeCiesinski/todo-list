import modifyDom from "./modifyDom";

/*
 * Builds settings page and includes various functions
 * - Color Palette Picker
 * - Dark Mode Toggle
 */
const settingsUtils = function settingsUtilityFunctions() {

    const dom = modifyDom();
    const settingsPage = dom.createElement({tag: 'div'});

    const build = function buildSettingsPage() {
        // Color Palette
        // Dark Mode
        // Delete Data (local)
    }

    return {
        build
    }
}

export default settingsUtils;