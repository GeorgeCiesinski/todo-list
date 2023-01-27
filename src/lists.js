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

    // Compares lastSave to lastChange to see if new changes occurred
    const checkChanges = function checkIfListsChanged() {
        if ((lastSave === null && lastChange !== null) || (lastChange > lastSave)) {
            // If more than 5 seconds since last change, save list
            if (new Date() - lastChange >= 5000) {
                saveLists(lists);
            }
        }
    }

    setInterval(checkChanges, 5000);

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

    const todos = todosBuilder(dom);
    const util = listsUtilities();
    
    let currentList = util.getList(0);
    let currentListIndex = 0;
    let listsNav = null;  // listsLink instance - defined later
    
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

    // Change Title Event
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

    // List Description
    const createDescription = function createDescriptionElement() {
        dom.createElement({
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

    listsNav = listsLinks(dom, switchList);

    // Shows lists page
    const showPage = function switchPage(event) {
        if (event) {
            dom.switchNavLinks(event.target);
        }
        dom.switchContent(listsPage);
        buildList();  // Build current list
        listsNav.build(util.listNavData(), currentListIndex);  // Build Nav Links for Lists
    }

    return {
        buildList,
        switchList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder