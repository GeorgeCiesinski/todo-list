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
     * Local lists variables
     */

    let lists = null;  // Loaded lists object
    let currentListIndex = null;  // Current List Index for continuity
    let currentList = null;  // Current List for continuity

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
        const defaultList = listsData.lists;
        saveLists(defaultList);
        return defaultList;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    const assignListsObject = function loadListsOrCreateDefaultLists() {
        lists = loadLists() || createDefault();
    }

    // Load or create lists
    assignListsObject();

    /*
     * Current List
     */

    // Returns list located at index
    const getList = function getListByIndex(index) {
        return lists[index];
    }

    // Changes currentList and currentListIndex
    const switchCurrent = function switchCurrentList(index) {
        currentList = getList(index);
        currentListIndex = index;
    }

    // Load first list when app loads
    switchCurrent(0);

    // Deletes the current list from the lists array
    const deleteCurrent = function deleteCurrentList() {
        lists.splice(currentListIndex, 1);
        switchCurrent(0);
    }

    const createNewList = function createNewListData() {
        const { newList } = listsData;
        lists.push(newList);
        const newListIndex = lists.indexOf(newList);
        switchCurrent(newListIndex);
    }

    // Gets the title element and switches focus to it
    const titleFocus = function focusOnTitleElement() {
        const listTitle = document.querySelector('#list-title');
        listTitle.focus();
    }

    // Returns true if title element is empty - prevents untitled lists from being created
    const titleEmpty = function checkIfTitleIsEmpty() {
        const listTitle = document.querySelector('#list-title');
        return listTitle.value === '' || listTitle.value === null;
    }
    
    /* 
     * Refreshes lists data with default data and switches current list to first list
     * This is required after local storage data is deleted so that the lists array does not include old deleted data
     */
    const deleteRefresh = function refreshListAfterDataDelete() {
        assignListsObject();
        switchCurrent(0);
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

    const timeDelay = 500;  // Delay between change checks

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
        createNewList,
        titleFocus,
        titleEmpty,
        listNavData,
        saveLists,
        loadLists,
        listsLength,
        switchCurrent,
        deleteCurrent,
        deleteRefresh,
        getCurrent,
        updateChange
    }
}

export default listsUtilities;
