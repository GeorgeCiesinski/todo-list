import modifyDom from "./modifyDom";

/*
 * Builds settings page and includes various functions
 * - Color Palette Picker
 * - Dark Mode Toggle
 */
const settingsUtils = function settingsUtilityFunctions() {

    const dom = modifyDom();
    
    const settingsPage = dom.createElement({tag: 'div'});  // Base settings dom element

    const createHeader = function createHeader(parent) {
        dom.createElement({
            parent,
            tag: 'h3',
            innerHTML: "Settings"
        });
    }

    const createColors = function createColorPalette(parent) {
        // Create Div
        const colorDiv = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'color-div', 
            className: 'settings-divs'
        });
        // Create label
        dom.createElement({
            parent: colorDiv.element,
            tag: 'label',
            className: 'labels',
            innerHTML: 'Primary Color',
            attributes: [
                {
                    name: 'for',
                    value: 'color'
                }
            ],
        });
        // Create input
        dom.createElement({
            parent: colorDiv.element,
            tag: 'input',
            className: 'inputs',
            idName: 'color-input',
            attributes: [
                {
                    name: 'type',
                    value: 'color'
                },
                {
                    name: 'name',
                    value: 'color-input',
                },
                {
                    name: 'value',
                    value: '#1D4ED8'
                }
            ],
        });
    }

    const build = function buildSettingsPage() {
        // Create Header
        createHeader(settingsPage.element);
        // Create Form
        const settingsForm = dom.createElement({
            parent: settingsPage.element, 
            tag: 'form',
            idName: 'settings-form',
            className: 'forms'
        });
        // Add Color Palette
        createColors(settingsForm.element);
        // createColors(settingsForm.element);
        // Dark Mode
        // Delete Data (local)
        // Append to Content
        dom.updateContent(settingsPage.element);  // Temp
    }

    return {
        build
    }
}

export default settingsUtils;