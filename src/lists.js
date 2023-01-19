import { format } from 'date-fns'
import listsData from "./assets/data/default.json"

const listsUtilities = function listsUtilitiesFunctions(dom) {

    // Create Default List
    const createDefault = function createDefaultList() {
        return listsData.lists;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    let lists = JSON.parse(localStorage.getItem('lists')) || createDefault();

    // Returns length of list
    const listsLength = function returnListsLength() {
        return lists.length;
    }

    // Returns list at index
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

    const collapseItem = function collapseItemElements() {
        const content = this.parentNode.nextElementSibling;
        console.log(content);
    }

    return {
        saveLists,
        loadLists,
        listsLength,
        getList,
        collapseItem
    }
}

const listsBuilder = function listsBuilderFunctions(dom) {

    const util = listsUtilities(dom);

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
            parent: listsPage.element,
            tag: 'div',
            idName: 'list-div'
        }
    );
    dom.setList(listElement.element);

    // List Title
    const createTitle = function createTitleElement(title) {
        dom.createElement({
            parent: listElement.element,
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
            parent: listElement.element,
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

    // Div is still visible when the todo item is collapsed
    const createVisibleDiv = function createVisibleDivElements(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        const leftDiv = dom.createElement({
            parent: itemDiv.element,
            tag: 'div',
            className: 'left-visible-elements',
        });
        const rightDiv = dom.createElement({
            parent: itemDiv.element,
            tag: 'div',
            className: 'right-visible-elements',
        });
        // Checkbox
        const itemCheckbox = dom.createElement({
            parent: leftDiv.element,
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
        const itemName = dom.createElement({
            parent: leftDiv.element,
            tag: 'input',
            className: 'item-names',
            attributes: [
                {
                    name: 'value',
                    value: item.name
                }
            ]
        });
        // Collapse Button
        const collapseButton = dom.createElement({
            parent: rightDiv.element,
            tag: 'button',
            className: 'collapse-buttons',
            innerHTML: '+'
        });
    }

    // Create due date div
    const createDueDate = function createDueDateElements(parent, item) {
        const dueDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'due-div',
        });
        // Label
        const dueLabel = dom.createElement({
            parent: dueDiv.element,
            tag: 'label',
            className: 'tracking-label',
            innerHTML: 'Due: '
        });
        // Date
        const dueDate = dom.createElement({
            parent: dueDiv.element,
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

    // Create priority div
    const createPriority = function createPriorityElements(parent, item) {
        const priorityDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'priority-div',
        });
        // Label
        const priorityLabel = dom.createElement({
            parent: priorityDiv.element,
            tag: 'label',
            className: 'tracking-label',
            innerHTML: 'Priority: '
        });
        // Priority
        const priority = dom.createElement({
            parent: priorityDiv.element,
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

    // Create item tracking div
    const createItemTracking = function createItemTrackingElements(parent, item) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv.element, item);
        createPriority(itemTrackingDiv.element, item);
    }

    // Create item description div
    const createItemDescription = function createItemDescriptionElements(parent, item) {
        const descriptionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'description-div',
        });
        const descriptionLabel = dom.createElement({
            parent: descriptionDiv.element,
            tag: 'label',
            className: 'label',
            innerHTML: 'Notes'
        });
        const description = dom.createElement({
            parent: descriptionDiv.element,
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
        const createdLabel = dom.createElement({
            parent: createdDiv.element,
            tag: 'label',
            className: 'created-label',
            innerHTML: 'Created: '
        });
        // Date
        const createdDate = dom.createElement({
            parent: createdDiv.element,
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
        const deleteItem = dom.createElement({
            parent,
            tag: 'button',
            className: 'delete-item-button',
            innerHTML: 'X'
        });
    }

    // Create item deletion div
    const createItemDeletion = function createItemDeletionElements(parent, item) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        createCreated(deletionDiv.element, item);
        createDelete(deletionDiv.element, item);
    }

    const createCollapsibleDiv = function createCollapsibleDivElements(parent, item) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        createItemTracking(collapsibleDiv.element, item);
        createItemDescription(collapsibleDiv.element, item);
        createItemDeletion(collapsibleDiv.element, item);
    }

    // Create div with visible and collapsible elements
    const createTodoItem = function createTodoItemElement(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
        });
        createVisibleDiv(itemDiv.element, item);
        createCollapsibleDiv(itemDiv.element, item);
    }

    // Creates todo div
    const createTodos = function createTodoElement(todos) {
        const todosDiv = dom.createElement({
            parent: listElement.element,
            tag: 'div',
            idName: 'todos',
        });
        // Create todo items
        todos.forEach(item => createTodoItem(todosDiv.element, item));
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
        dom.switchContent(listsPage.element);
    }

    // Adds event listeners to page
    const createEventListeners = function addEventListenersToElements() {
        dom.createCollapse();
    }

    return {
        showList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder