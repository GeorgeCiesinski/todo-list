import createColorSettings from './colorTheme'

/*
 * Utility functions for Settings Page
 */
const settingsUtilities = function settingsUtilitiesFunctions(dom, list) {
    const defaultColor = '#1D4ED8' // Used to generate default palette

    // Load colorSettings or create new ones if don't exist
    let colorSettings =
        JSON.parse(localStorage.getItem('colorSettings')) ||
        createColorSettings(defaultColor)

    // Returns primary color from colorSettings
    const getPrimaryColor = function getPrimaryColor() {
        return colorSettings.primaryColor
    }

    // Updates SASS with variables in colorSettings
    const updateSASS = function updateSASSwithChanges() {
        dom.setPalette(colorSettings.palette)
        dom.setFont(colorSettings.primaryFontColor)
    }

    // Update theme colors in colorSettings
    const updateColorScheme = function updateColorValues(event) {
        colorSettings = createColorSettings(event.target.value)
        updateSASS()
    }

    // Loads saved changes
    const loadSettings = function loadSettingsFromLocalStorage() {
        colorSettings = JSON.parse(localStorage.getItem('colorSettings')) || createColorSettings(defaultColor)
        updateSASS()
    }

    // Saves changed settings
    const saveSettings = function saveSettingChanges() {
        localStorage.setItem('colorSettings', JSON.stringify(colorSettings))
    }

    // Clear Local Storage
    const deleteData = function deleteLocalStorage() {
        localStorage.clear()
        list.deleteDataRefresh()
    }

    updateSASS()

    return {
        getPrimaryColor,
        updateColorScheme,
        loadSettings,
        saveSettings,
        deleteData,
    }
}

export default settingsUtilities
