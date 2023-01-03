/*
 * Builds settings page and includes various functions
 * - Color Palette Picker
 * - Dark Mode Toggle
 */
const settingsUtils = function settingsUtilityFunctions(dom) {
    
    // Empty Settings Page
    const settingsPage = dom.createElement({tag: 'div'});  // Base settings dom element

    /*
     * Headers
     */

    // Page Title
    const createTitle = function createHeader() {
        dom.createElement({
            parent: settingsPage.element,
            tag: 'h2',
            innerHTML: "Settings"
        });
    }

    // Data
    const createDataHeader = function createHeader() {
        dom.createElement({
            parent: settingsPage.element,
            tag: 'h3',
            innerHTML: "Data"
        });
    }

    // Creates color div
    const createColors = function createColorPalette() {
        const colorDiv = dom.createElement({
            parent: settingsPage.element, 
            tag: 'div', 
            idName: 'color-div', 
            className: 'settings-divs'
        });
        // Label
        dom.createElement({
            parent: colorDiv.element,
            tag: 'label',
            className: 'labels',
            innerHTML: 'Primary Color: ',
            attributes: [
                {
                    name: 'for',
                    value: 'color-input'
                }
            ],
        });
        // Input
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

    // Creates dark mode div
    const createDarkMode = function createDarkMode() {
        const darkModeDiv = dom.createElement({
            parent: settingsPage.element,
            tag: "div",
            idName: 'dark-mode-div', 
            className: 'settings-divs'
        });
        // Label
        dom.createElement({
            parent: darkModeDiv.element,
            tag: 'label',
            className: 'labels',
            innerHTML: 'Dark Mode: ',
            attributes: [
                {
                    name: 'for',
                    value: 'dark-mode-input'
                }
            ],
        });
        // Input
        dom.createElement({
            parent: darkModeDiv.element,
            tag: 'input',
            className: 'inputs',
            idName: 'dark-mode-input',
            attributes: [
                {
                    name: 'type',
                    value: 'checkbox'
                },
                {
                    name: 'name',
                    value: 'dark-mode-input',
                },
                {
                    name: 'value',
                    value: '#1D4ED8'
                }
            ],
        });
    }

    // Create Delete Data Div
    const createDeleteData = function createDeleteData() {
        const deleteDataDiv = dom.createElement({
            parent: settingsPage.element,
            tag: "div",
            idName: 'delete-data-div', 
            className: 'settings-divs'
        });
        // Button
        dom.createElement({
            parent: deleteDataDiv.element,
            tag: 'button',
            className: 'buttons',
            innerHTML: 'Delete Local Data',
        });
    }

    // Build page
    const build = function buildSettingsPage() {
        // Page Header
        createTitle();
        // Color Theme and Dark Mode
        createColors();
        createDarkMode();
        // Data
        createDataHeader();
        createDeleteData();
    }

    // Shows built page
    const showPage = function switchPage() {
        dom.switchContent(settingsPage.element);
    }

    build();  // Builds page

    return {
        showPage
    }
}

export default settingsUtils;