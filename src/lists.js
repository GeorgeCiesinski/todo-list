import { format } from 'date-fns'
import listsData from "./assets/data/default.json"

const listsUtilities = function listsUtilitiesFunctions(dom) {

    // Create Default List
    const createDefault = function createDefaultList() {
        const newList = listsData.lists;
        return newList;
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

    return {
        saveLists,
        loadLists,
        listsLength,
        getList
    }
}

const listsBuilder = function listsBuilderFunctions(dom) {

    const util = listsUtilities(dom);

    const listsPage = dom.createElement(
        {
            tag: 'div',
            idName: 'lists-page'
        }
    );

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

    // This div is still visible when the todo item is collapsed
    const createItemDiv = function createItemDivElements(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        // Checkbox
        const itemCheckbox = dom.createElement({
            parent: itemDiv.element,
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
            parent: itemDiv.element,
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

    const createItemTracking = function createItemTrackingElements(parent, item) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv.element, item);
        createPriority(itemTrackingDiv.element, item);
    }

    const createItemDescription = function createItemDescriptionElements(parent, item) {
        const descriptionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'description-div',
        });
        const description = dom.createElement({
            parent: descriptionDiv.element,
            tag: 'textarea',
            className: 'item-description',
            innerHTML: item.description
        });
    }

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

    const createItemDeletion = function createItemDeletionElements(parent, item) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        // Create Date Added
        createCreated(deletionDiv.element, item);
        // Create Delete
        const deleteItem = dom.createElement({
            parent: deletionDiv.element,
            tag: 'button',
            className: 'delete-item-button',
            innerHTML: 'X'
        })
    }

    const createCollapsibleDiv = function createCollapsibleDivElements(parent, item) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        // Item Tracking
        createItemTracking(collapsibleDiv.element, item);
        // Create Description
        createItemDescription(collapsibleDiv.element, item);
        // Item Deletion
        createItemDeletion(collapsibleDiv.element, item);
    }

    const createTodoItem = function createTodoItemElement(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
        });
        createItemDiv(itemDiv.element, item);
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

    return {
        showList,
        showPage
    }
}

export default listsBuilder