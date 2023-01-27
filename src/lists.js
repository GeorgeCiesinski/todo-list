import listsData from "./assets/data/default.json"
import listsLinks from "./listsLinks"

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
    dom.setList(listElement);

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

    // Creates left side of visible div
    const createLeftVisibleDiv = function createLeftVisibleDivElements(parent, item) {
        const leftDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'left-visible-elements',
        });
        // Checkbox
        dom.createElement({
            parent: leftDiv,
            tag: 'input',
            className: 'item-checkbox',
            attributes: [
                {
                    name: 'type',
                    value: 'checkbox'
                }
            ]
        });
        // Item Name
        dom.createElement({
            parent: leftDiv,
            tag: 'input',
            className: 'item-names',
            attributes: [
                {
                    name: 'value',
                    value: item.name
                }
            ]
        });
    }

    // Create priority div
    const createPriority = function createPriorityElements(parent, item) {
        // Label
        dom.createElement({
            parent,
            tag: 'label',
            className: 'tracking-label',
            innerHTML: 'Priority: '
        });
        // Priority
        dom.createElement({
            parent,
            tag: 'input',
            className: 'priority-input',
            attributes: [
                {
                    name: 'type',
                    value: 'number'
                },
                {
                    name: 'min',
                    value: 1
                },
                {
                    name: 'max',
                    value: 3
                },
                {
                    name: 'value',
                    value: item.priority
                }
            ]
        });
    }

    // Creates right side of visible div
    const createRightVisibleDiv = function createRightVisibleDivElements(parent, item) {
        const rightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'right-visible-elements',
        });
        // Priority
        createPriority(rightDiv, item);
        // Collapse Button
        const collapseButton = dom.createElement({
            parent: rightDiv,
            tag: 'button',
            className: 'collapse-buttons',
            innerHTML: '<i class="fa-solid fa-plus"></i>'  // Font awesome plus icon
        });
        dom.addClass(collapseButton, 'collapsed');
    }

    // Div is still visible when the todo item is collapsed
    const createVisibleDiv = function createVisibleDivElements(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        createLeftVisibleDiv(itemDiv, item);
        createRightVisibleDiv(itemDiv, item);
    }

    // Create due date div
    const createDueDate = function createDueDateElements(parent, item) {
        const dueDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'due-div',
        });
        // Label
        dom.createElement({
            parent: dueDiv,
            tag: 'label',
            className: 'date-labels',
            innerHTML: 'Due: '
        });
        // Date
        dom.createElement({
            parent: dueDiv,
            tag: 'input',
            className: 'due-date',
            attributes: [
                {
                    name: 'type',
                    value: 'date'
                },
                {
                    name: 'value',
                    value: item.due
                }
            ]
        });
    }

    // Create item tracking div
    const createItemTracking = function createItemTrackingElements(parent, item) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv, item);
    }

    // Create item description div
    const createItemDescription = function createItemDescriptionElements(parent, item) {
        const descriptionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'description-div',
        });
        dom.createElement({
            parent: descriptionDiv,
            tag: 'label',
            className: 'label',
            innerHTML: 'Notes'
        });
        dom.createElement({
            parent: descriptionDiv,
            tag: 'textarea',
            className: 'item-description',
            innerHTML: item.description
        });
    }

    // Create created date div
    const createCreated = function createCreatedElements(parent, item) {
        const createdDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'created-div',
        });
        // Label
        dom.createElement({
            parent: createdDiv,
            tag: 'label',
            className: 'date-labels',
            innerHTML: 'Created: '
        });
        // Date
        dom.createElement({
            parent: createdDiv,
            tag: 'input',
            className: 'created-date',
            attributes: [
                {
                    name: 'type',
                    value: 'date'
                },
                {
                    name: 'value',
                    value: item.added
                }
            ]
        });
    }

    const createDelete = function createDeleteElement(parent, item) {
        dom.createElement({
            parent,
            tag: 'button',
            className: 'delete-item-button',
            innerHTML: 'X',
            // attributes: [
            //     {
            //         name: 'index',
            //         value: 
            //     }
            // ]
        });
        // console.log(item);
    }

    // Create item deletion div
    const createItemDeletion = function createItemDeletionElements(parent, item) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        createCreated(deletionDiv, item);
        createDelete(deletionDiv, item);
    }

    const createCollapsibleDiv = function createCollapsibleDivElements(parent, item) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        createItemTracking(collapsibleDiv, item);
        createItemDescription(collapsibleDiv, item);
        createItemDeletion(collapsibleDiv, item);
    }

    // Create div with visible and collapsible elements
    const createTodoItem = function createTodoItemElement(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
        });
        createVisibleDiv(itemDiv, item);
        createCollapsibleDiv(itemDiv, item);
    }

    // Creates todo div
    const createTodos = function createTodoElement() {
        const todosDiv = dom.createElement({
            parent: listElement,
            tag: 'div',
            idName: 'todos',
        });
        const { todos } = currentList;
        // Create todo items
        todos.forEach(item => {
            const todoItem = item;
            todoItem.index = todos.indexOf(item);
            createTodoItem(todosDiv, todoItem);
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
        createTodos(currentList);
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
        const index = element.getAttribute('index');
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