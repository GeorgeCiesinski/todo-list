import createColorSettings from "./colorTheme"

/*
 * Utility functions for Settings Page
 */
const settingsUtilities = function settingsUtilitiesFunctions() {

    const defaultColor = '#1D4ED8';
    let colorSettings = JSON.parse(localStorage.getItem('colorSettings')) || createColorSettings(defaultColor);

    console.log(colorSettings);

    const getPrimaryColor = function getPrimaryColor() {
        return colorSettings.primaryColor;
    }

    // Update theme colors in colorSettings
    const updateColorScheme = function updateColorValues(event) {
        colorSettings = createColorSettings(event.target.value);
    }

    // Update dark mode in local storage
    const updateDarkMode = function updateDarkModeLocalStorage(event) {
        colorSettings.darkMode = event.target.checked;
    }

    // Temp for debugging
    const logLocalStorage = function() {
        console.log(JSON.parse(localStorage.getItem('colorSettings')));
    }

    // Saves changed settings
    const saveSettings = function saveSettingChanges() {
        localStorage.setItem('colorSettings', JSON.stringify(colorSettings));
        Object.entries(colorSettings.palette).forEach((entry) => {
            const [step, color] = entry;
            document.documentElement.style.setProperty(
                `--color-primary-${step}`, 
                color
            );
        });
        logLocalStorage();
    }

     // Clear Local Storage
     const deleteData = function deleteLocalStorage() {
        localStorage.clear();
        logLocalStorage();
    }

    return {
        getPrimaryColor,
        updateColorScheme,
        updateDarkMode,
        saveSettings,
        deleteData
    }
}

/*
 * Builds settings page
 */
const settingsBuilder = function settingsBuilderFunctions(dom) {
    
    const settingsPage = dom.createElement({tag: 'div'});  // Base settings dom element  
    const util = settingsUtilities();

    /*
     * Page Construction
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
                    value: util.getPrimaryColor()
                }
            ],
        });
        colorInput.element.addEventListener('input', util.updateColorScheme);
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
        darkModeInput.element.addEventListener('input', util.updateDarkMode);
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
        saveButton.element.addEventListener('click', util.saveSettings);
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
        deleteDataButton.element.addEventListener('click', util.deleteData);
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

export default settingsBuilder;