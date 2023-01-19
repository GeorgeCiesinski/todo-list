import listsData from "./assets/data/default.json"

const listsUtilities = function listsUtilitiesFunctions() {

    // Create Default List
    const createDefault = function createDefaultList() {
        return listsData.lists;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    let lists = JSON.parse(localStorage.getItem('lists')) || createDefault();

    // Returns an array of lists
    const listsArray = function returnListsArray() {
        return lists; 
    }

    // Returns length of list
    const listsLength = function returnListsLength() {
        return lists.length;
    }

    // Returns list located at index
    const getList = function getListByIndex(index) {
        return lists[index];
    }

    // Save lists to local storage
    const saveLists = function saveListsToDLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    // Loads list from local storage
    const loadLists = function loadListsFromLocalStorage() {
        lists = JSON.parse(localStorage.getItem('lists'));
    }

    return {
        listsArray,
        saveLists,
        loadLists,
        listsLength,
        getList,
        // collapseItem
    }
}

const listsBuilder = function listsBuilderFunctions(dom) {

    const util = listsUtilities();

    // List titles and index for navLinks
    const listIndex = []
    const listsArray = util.listsArray();
    for (let i = 0; i < listsArray.length; i += 1) {
        listIndex[i] = listsArray[i].title;
    }

    // Root page element for lists 
    const listsPage = dom.createElement(
        {
            tag: 'div',
            idName: 'lists-page'
        }
    );

    // List element containing list data
    const listElement = dom.createElement(
        {
            parent: listsPage,
            tag: 'div',
            idName: 'list-div'
        }
    );

    dom.setList(listElement);

    // List Title
    const createTitle = function createTitleElement(title) {
        dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-title',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: title
                }
            ]
        });
    }

    // List Description
    const createDescription = function createDescriptionElement(description) {
        dom.createElement({
            parent: listElement,
            tag: 'input',
            idName: 'list-description',
            className: 'list-elements',
            attributes: [
                {
                    name: 'value',
                    value: description
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
            innerHTML: 'X'
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
    const createTodos = function createTodoElement(todos) {
        const todosDiv = dom.createElement({
            parent: listElement,
            tag: 'div',
            idName: 'todos',
        });
        // Create todo items
        todos.forEach(item => createTodoItem(todosDiv, item));
    }

    // Builds listElement from list by index
    const showList = function showListByIndex(index) {
        const currentList = util.getList(index);
        createTitle(currentList.title);
        createDescription(currentList.description);
        createTodos(currentList.todos);
    }

    // Shows lists page
    const showPage = function switchPage() {
        dom.switchContent(listsPage);
    }

    // Adds event listeners to page
    const createEventListeners = function addEventListenersToElements() {
        dom.createCollapse();
    }

    return {
        listIndex,
        showList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder