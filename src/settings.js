import settingsUtilities from "./settingsUtilities";

/*
 * Builds settings page
 */
const settingsBuilder = function settingsBuilderFunctions(dom, list) {
    
    const util = settingsUtilities(dom, list);

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

    // Contains load and save buttons
    const createSettingsDiv = function createButtonsDivElement() {
        const settingsDiv = dom.createElement({
            parent: settingsPage,
            tag: "div",
            idName: 'color-settings-div', 
            className: 'settings-divs'
        });
        createColors(settingsDiv);
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
            innerHTML: 'Load Previous',
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
        // Color Theme
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
        dom.closeMenus();
    }

    build();  // Builds page

    return {
        showPage
    }
}

export default settingsBuilder;