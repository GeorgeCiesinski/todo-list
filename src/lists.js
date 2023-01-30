import listsData from "./assets/data/default.json"
import listsLinks from "./listsLinks"
import todosBuilder from "./todos"

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
        console.log('Generating default list');
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

    const timeDelay = 3000;  // 3 Seconds

    // Compares lastSave to lastChange to see if new changes occurred
    const checkChanges = function checkIfListsChanged() {
        if ((lastSave === null && lastChange !== null) || (lastChange > lastSave)) {
            // If more than timedelay since last change, save list
            if (new Date() - lastChange >= timeDelay) {
                saveLists(lists);
            }
        }
    }

    // Checks for changes every timeDelay period
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

const listsBuilder = function listsBuilderFunctions(dom) {

    // Lists Utilities - manage lists objects
    const util = listsUtilities();

    // Todos Builder - builds individual todo items
    const todos = todosBuilder(dom, util.getCurrent().list);

    // listsLink instance - defined later
    let listsNav = null; 
    
    // Root page element for lists 
    const listsPage = dom.createElement(
        {
            tag: 'div',
            idName: 'lists-page'
        }
    );

    // List element containing list data elements
    const listElement = dom.createElement(
        {
            parent: listsPage,
            tag: 'div',
            idName: 'list-div'
        }
    );

    // Set list in dom
    dom.setListElement(listElement);

    // Change Title Event - Changes the list.title variable and updates the last change time
    const changeTitle = function changeListTitle(event) {
        const element = event.target;
        const current = util.getCurrent();  // Current List
        current.list.title = element.value;
        util.updateChange();
        listsNav.build(util.listNavData(), current.index);  // Build Nav Links for Lists
    }

    // List Title
    const createTitle = function createTitleElement(current) {
        const title = dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-title',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: current.list.title
                },
                {
                    name: 'index',
                    value: current.index
                }
            ]
        });
        dom.keyUpEvent(title, changeTitle);
    }

    // Change Title Event - Changes the list.title variable and updates the last change time
    const changeDescription = function changeListDescription(event) {
        const element = event.target;
        const current = util.getCurrent();  // Current List
        current.list.description = element.value;
        util.updateChange();
    }

    // List Description
    const createDescription = function createDescriptionElement(current) {
        const description = dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-description',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: current.list.description
                },
                {
                    name: 'index',
                    value: current.index
                }
            ]
        });
        dom.keyUpEvent(description, changeDescription);
    }

    // Adds event listeners to page
    const createEventListeners = function addEventListenersToElements() {
        dom.createCollapse();
    }

    // Builds and rebuilds listElement from list by index
    const buildList = function buildListByIndex() {
        dom.clearList();
        const current = util.getCurrent();  // Current List
        createTitle(current);
        createDescription(current);
        todos.build(current.list);
        createEventListeners();
    }

    // Handle list nav event and show requested list
    const switchList = function switchListEvent(event) {
        const element = event.target;
        const index = Number(element.getAttribute('index'));
        util.switchCurrent(index);
        buildList();
        dom.switchListLinks(element);
    }

    // Define listsNav instance declared previously
    listsNav = listsLinks(dom, switchList);

    // Shows lists page
    const showPage = function switchPage(event) {
        // If called by event, change clicked link to show as active link
        if (event) {
            dom.switchNavLinks(event.target);
        }
        // Switch content element to display listsPage
        dom.switchContent(listsPage);
        // Build current list
        buildList();  
        // Build Nav Links for Lists
        listsNav.build(util.listNavData(), util.getCurrent().index); 
    }

    return {
        buildList,
        switchList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder