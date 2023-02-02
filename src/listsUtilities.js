import listsData from "./assets/data/default.json";

/*
 * ListsUtilities - Manages Lists Object
 * - Save/Load Lists
 * - Create default list
 * - Track current list data
 * - Track lastChange and lastSave
 * - Autosave after a delay
 */
const listsUtilities = function listsUtilitiesFunctions() {

    /*
     * Save Lists
     */

    let lastChange = null;  // Date() of last change
    let lastSave = null;  // Date() of last save

    const saveLists = function saveListsToLocalStorage(listsObject) {
        console.log('New save occurred.');
        localStorage.setItem('lists', JSON.stringify(listsObject));
        lastSave = new Date();
    }

    /*
     * Load / Create lists
     */

    const loadLists = function loadListsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('lists'));
    }

    const createDefault = function createDefaultList() {
        // console.log('Generating default list');
        const defaultList = listsData.lists;
        saveLists(defaultList);
        return defaultList;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    const lists = loadLists() || createDefault();

    /*
     * Current List
     */

    // Returns list located at index
    const getList = function getListByIndex(index) {
        return lists[index];
    }

    // Current list and list index
    let currentListIndex = 0;
    let currentList = getList(currentListIndex);

    // Changes currentList and currentListIndex
    const switchCurrent = function switchCurrentList(index) {
        currentList = getList(index);
        currentListIndex = index;
    }

    // Return a current list object {list, index}
    const getCurrent = function getCurrentListData() {
        return {
            "list": currentList,
            "index": currentListIndex
        }
    }

    // Create a new array with list titles to populate navbar
    const listNavData = function generateListNavData() {
        const newArray = [];
        for (let i = 0; i < lists.length; i += 1) {
            newArray[i] = lists[i].title;
        }
        return newArray;
    }

    // Returns length of list
    const listsLength = function returnListsLength() {
        return lists.length;
    }

    // Updates last change
    const updateChange = function updateChangeTime() {
        lastChange = new Date();
    }

    const timeDelay = 3000;  // Delay between change checks

    // Compares lastSave to lastChange to see if new changes occurred
    const checkChanges = function checkIfListsChanged() {
        if ((lastSave === null && lastChange !== null) || (lastChange > lastSave)) {
            // If more than (timeDelay) since last change, save list
            if (new Date() - lastChange >= timeDelay) {
                saveLists(lists);
            }
        }
    }

    // Checks for changes
    setInterval(checkChanges, timeDelay);

    return {
        listNavData,
        saveLists,
        loadLists,
        listsLength,
        switchCurrent,
        getCurrent,
        updateChange
    }
}

export default listsUtilities;
