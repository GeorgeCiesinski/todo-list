import createColorSettings from "./colorTheme"

/*
 * Utility functions for Settings Page
 */
const settingsUtilities = function settingsUtilitiesFunctions(dom) {

    const defaultColor = '#1D4ED8';  // Used to generate default palette
    
    // Load colorSettings or create new ones if don't exist
    let colorSettings = JSON.parse(localStorage.getItem('colorSettings')) || createColorSettings(defaultColor);

    // Returns primary color from colorSettings
    const getPrimaryColor = function getPrimaryColor() {
        return colorSettings.primaryColor;
    }
    
    // Updates SASS with variables in colorSettings
    const updateSASS = function updateSASSwithChanges() {
        dom.setPalette(colorSettings.palette)
        dom.setFont(colorSettings.primaryFontColor)
    }

    // Update theme colors in colorSettings
    const updateColorScheme = function updateColorValues(event) {
        colorSettings = createColorSettings(event.target.value);
        updateSASS();
    }

    // Update dark mode in local storage
    const updateDarkMode = function updateDarkModeLocalStorage(event) {
        colorSettings.darkMode = event.target.checked;
    }

    // Loads saved changes
    const loadSettings = function loadSettingsFromLocalStorage() {
        colorSettings = JSON.parse(localStorage.getItem('colorSettings'));
        updateSASS();
    }

    // Saves changed settings
    const saveSettings = function saveSettingChanges() {
        localStorage.setItem('colorSettings', JSON.stringify(colorSettings));
    }

     // Clear Local Storage
     const deleteData = function deleteLocalStorage() {
        localStorage.clear();
    }

    updateSASS();

    return {
        getPrimaryColor,
        updateColorScheme,
        updateDarkMode,
        loadSettings,
        saveSettings,
        deleteData
    }
}

/*
 * Builds settings page
 */
const settingsBuilder = function settingsBuilderFunctions(dom) {
    
    const util = settingsUtilities(dom);

    const settingsPage = dom.createElement(
        {
            tag: 'div',
            idName: 'settings-page'
        }
    );  // Base settings dom element  

    /*
     * Page Construction
     */

    // Page Title
    const createTitle = function createTitleHeader() {
        dom.createElement({
            parent: settingsPage,
            tag: 'h2',
            innerHTML: "Settings"
        });
    }

    // Creates color div
    const createColors = function createColorsElement(parent) {
        const colorDiv = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'color-div'
        });
        // Label
        dom.createElement({
            parent: colorDiv,
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
            parent: colorDiv,
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
                    value: util.getPrimaryColor()
                }
            ],
        });
        colorInput.addEventListener('input', util.updateColorScheme);
    }

    // Creates dark mode div
    const createDarkMode = function createDarkModeElement(parent) {
        const darkModeDiv = dom.createElement({
            parent,
            tag: "div",
            idName: 'dark-mode-div'
        });
        // Label
        dom.createElement({
            parent: darkModeDiv,
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
            parent: darkModeDiv,
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
        darkModeInput.addEventListener('input', util.updateDarkMode);
    }

    // Contains load and save buttons
    const createSettingsDiv = function createButtonsDivElement() {
        const settingsDiv = dom.createElement({
            parent: settingsPage,
            tag: "div",
            idName: 'color-settings-div', 
            className: 'settings-divs'
        });
        createColors(settingsDiv);
        createDarkMode(settingsDiv);
    }

    const createLoadButton = function createLoadButtonElement(parent) {
        const saveButtonDiv = dom.createElement({
            parent,
            tag: "div",
            idName: 'load-button-div'
        });
        // Button
        const saveButton = dom.createElement({
            parent: saveButtonDiv,
            tag: 'button',
            idName: 'load-button',
            className: 'settings-buttons',
            innerHTML: 'Load Settings',
        });
        saveButton.addEventListener('click', util.loadSettings);
    }

    const createSaveButton = function createSaveButtonElement(parent) {
        const saveButtonDiv = dom.createElement({
            parent,
            tag: "div",
            idName: 'save-button-div'
        });
        // Button
        const saveButton = dom.createElement({
            parent: saveButtonDiv,
            tag: 'button',
            idName: 'save-button',
            className: 'settings-buttons',
            innerHTML: 'Save Settings',
        });
        saveButton.addEventListener('click', util.saveSettings);
    }

    // Contains load and save buttons
    const createButtonsDiv = function createButtonsDivElement() {
        const buttonsDiv = dom.createElement({
            parent: settingsPage,
            tag: "div",
            idName: 'buttons-div', 
            className: 'settings-divs'
        });
        createLoadButton(buttonsDiv);
        createSaveButton(buttonsDiv);
    }

    // Data
    const createDataHeader = function createHeader() {
        dom.createElement({
            parent: settingsPage,
            tag: 'h3',
            innerHTML: "Data"
        });
    }

    // Create Delete Data Div
    const createDeleteData = function createDeleteData() {
        const deleteDataDiv = dom.createElement({
            parent: settingsPage,
            tag: "div",
            idName: 'delete-data-div', 
            className: 'settings-divs'
        });
        // Button
        const deleteDataButton = dom.createElement({
            parent: deleteDataDiv,
            tag: 'button',
            className: 'settings-buttons',
            innerHTML: 'Delete Local Data',
        });
        deleteDataButton.addEventListener('click', util.deleteData);
    }

    // Builds page page
    const build = function buildSettingsPage() {
        // Page Header
        createTitle();
        // Color Theme and Dark Mode
        createSettingsDiv();
        createButtonsDiv();
        // Data
        createDataHeader();
        createDeleteData();
    }

    // Shows built page
    const showPage = function switchPage(event) {
        if (event) {
            dom.switchNavLinks(event.target);
        }
        dom.switchContent(settingsPage);
    }

    build();  // Builds page

    return {
        showPage
    }
}

export default settingsBuilder;