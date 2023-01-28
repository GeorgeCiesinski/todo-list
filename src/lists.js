import listsData from "./assets/data/default.json"
import listsLinks from "./listsLinks"
import todosBuilder from "./todos"

const listsUtilities = function listsUtilitiesFunctions() {

    let lastChange = null;
    let lastSave = null;

    // Save listsObject to local storage
    const saveLists = function saveListsToDLocalStorage(listsObject) {
        console.log('New save occurred.');
        localStorage.setItem('lists', JSON.stringify(listsObject));
        lastSave = new Date();
    }

    // Loads list from local storage
    const loadLists = function loadListsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('lists'));
    }

    // Create Default List
    const createDefault = function createDefaultList() {
        console.log('Generating default list');
        const defaultList = listsData.lists;
        saveLists(defaultList);
        return defaultList;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    const lists = loadLists() || createDefault();

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

    // Returns list located at index
    const getList = function getListByIndex(index) {
        return lists[index];
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
        getList,
        updateChange
    }
}

const listsBuilder = function listsBuilderFunctions(dom) {

    // Todos Builder - builds individual todo items
    const todos = todosBuilder(dom);

    // Lists Utilities - manage lists objects
    const util = listsUtilities();
    
    // Current list and list index
    let currentList = util.getList(0);
    let currentListIndex = 0;

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
        currentList.title = element.value;
        util.updateChange();
        listsNav.build(util.listNavData(), currentListIndex);  // Build Nav Links for Lists
    }

    // List Title
    const createTitle = function createTitleElement() {
        const title = dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-title',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: currentList.title
                },
                {
                    name: 'index',
                    value: currentListIndex
                }
            ]
        });
        dom.keyUpEvent(title, changeTitle);
    }

    // Change Title Event - Changes the list.title variable and updates the last change time
    const changeDescription = function changeListDescription(event) {
        const element = event.target;
        currentList.description = element.value;
        util.updateChange();
    }

    // List Description
    const createDescription = function createDescriptionElement() {
        const description = dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-description',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: currentList.description
                },
                {
                    name: 'index',
                    value: currentListIndex
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
        createTitle(currentList);
        createDescription(currentList);
        todos.build(currentList);
        createEventListeners();
    }

    // Changes currentList and currentListIndex
    const switchCurrent = function switchCurrentList(index) {
        currentList = util.getList(index);
        currentListIndex = index;
    }

    // Handle list nav event and show requested list
    const switchList = function switchListEvent(event) {
        const element = event.target;
        const index = Number(element.getAttribute('index'));
        switchCurrent(index);
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
        listsNav.build(util.listNavData(), currentListIndex); 
    }

    return {
        buildList,
        switchList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder