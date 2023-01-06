import { createPaletteFromColor } from "palettey";

/*
 * Utility functions for Settings Page
 */
const settingsUtilities = function settingsUtilitiesFunctions() {

    const defaultColor = '#1D4ED8';

    const colorSettings = JSON.parse(localStorage.getItem('colorSettings')) || {};

    // Sets primary color in colorSettings Object
    const setPrimary = function setPrimaryColor(colorHex) {
        colorSettings.primaryColor = colorHex;
    }

    // Sets palette in colorSettings Object
    const setPalette = function setPaletteColors(colorHex) {
        const palette = createPaletteFromColor(
            "primary", 
            colorHex, 
            {
                useLightness: false,
            }
        )
        colorSettings.palette = palette.primary;
    }

    // Updates the colorSettings object with primary color and palette
    const setColorScheme = function setColorSchemeSetting(colorHex) {
        setPrimary(colorHex);
        setPalette(colorHex);
    }

    if (!localStorage.getItem("colorSettings")) {
        console.log("Settings Exist");
    } else {
        console.log("Settings Don't Exist");
    }

    // Update theme colors in colorSettings
    const updateColor = function updateColorValues(event) {
        setColorScheme(event.target.value);  
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
        logLocalStorage();
    }

     // Clear Local Storage
     const deleteData = function deleteLocalStorage() {
        localStorage.clear();
    }

    return {
        defaultColor,
        updateColor,
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
                    value: util.defaultColor
                }
            ],
        });
        colorInput.element.addEventListener('input', util.updateColor);
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