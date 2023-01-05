/*
 * Builds settings page and includes various functions
 * - Color Palette Picker
 * - Dark Mode Toggle
 */
const settingsUtils = function settingsUtilityFunctions(dom) {
    
    const settingsPage = dom.createElement({tag: 'div'});  // Base settings dom element

    const defaultColor = '#1D4ED8';
    const colorSettings = {};  // Color settings object
    

    /*
     * Utilities
     * 
     * Carry out settings functions unrelated to constructing the page elements
     */

    // Clear Local Storage
    const deleteData = function deleteLocalStorage() {
        localStorage.clear();
    }

    // Update theme colors in local storage
    const updateColor = function updateColorLocalStorage(event) {
        colorSettings.defaultColor = event.target.value;
    }

    // Update dark mode in local storage
    const updateDarkMode = function updateDarkModeLocalStorage(event) {
        colorSettings.darkMode = event.target.checked;
    }

    // Saves changed settings
    const saveSettings = function saveSettingChanges() {
        localStorage.setItem('colorSettings', colorSettings);
        console.log("Saved");
    }

    /*
     * Page Element Construction
     */

    // Page Title
    const createTitle = function createTitleHeader() {
        dom.createElement({
            parent: settingsPage.element,
            tag: 'h2',
            innerHTML: "Settings"
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
        const colorInput = dom.createElement({
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
                    value: 'color-input'
                },
                {
                    name: 'value',
                    value: defaultColor
                }
            ],
        });
        colorInput.element.addEventListener('input', updateColor);
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
        const darkModeInput = dom.createElement({
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
                    value: 'on'
                }
            ],
        });
        darkModeInput.element.addEventListener('input', updateDarkMode);
    }

    const createSaveButton = function createSaveButton() {
        const saveButtonDiv = dom.createElement({
            parent: settingsPage.element,
            tag: "div",
            idName: 'save-button-div', 
            className: 'settings-divs'
        });
        // Button
        const saveButton = dom.createElement({
            parent: saveButtonDiv.element,
            tag: 'button',
            className: 'buttons',
            innerHTML: 'Save',
        });
        saveButton.element.addEventListener('click', saveSettings);
    }

    // Data
    const createDataHeader = function createHeader() {
        dom.createElement({
            parent: settingsPage.element,
            tag: 'h3',
            innerHTML: "Data"
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
        const deleteDataButton = dom.createElement({
            parent: deleteDataDiv.element,
            tag: 'button',
            className: 'buttons',
            innerHTML: 'Delete Local Data',
        });
        deleteDataButton.element.addEventListener('click', deleteData);
    }

    // Builds page page
    const build = function buildSettingsPage() {
        // Page Header
        createTitle();
        // Color Theme and Dark Mode
        createColors();
        createDarkMode();
        createSaveButton();
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