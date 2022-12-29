import modifyDom from "./modifyDom";

/*
 * Builds settings page and includes various functions
 * - Color Palette Picker
 * - Dark Mode Toggle
 */
const settingsUtils = function settingsUtilityFunctions() {

    const dom = modifyDom();
    
    const settingsPage = dom.createElement({tag: 'div'});  // Base settings dom element

    const createColors = function createColorPalette(parent) {
        // Create Div
        const colorDiv = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'color-div', 
            className: 'settings-divs'
        })
        // Create label
        // Create input
    }

    const build = function buildSettingsPage() {
        // Create Form
        const settingsForm = dom.createElement({
            parent: settingsPage, 
            tag: 'form',
            idName: 'settings-form',
            className: 'forms'
        });
        // Add Color Palette
        createColors(settingsForm);
        // Dark Mode
        // Delete Data (local)
    }

    return {
        build
    }
}

export default settingsUtils;