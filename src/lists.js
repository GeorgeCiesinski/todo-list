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
            idName: 'list-element'
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
    const createCollapsed = function createCollapsedItemElements(parent, item) {
        const collapsedDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsed-todo-elements',
        });
        // Checkbox
        const itemCheckbox = dom.createElement({
            parent: collapsedDiv.element,
            tag: 'input',
            className: 'item-checked',
            attributes: [
                {
                    name: 'type',
                    value: 'checkbox'
                }
            ]
        });
        // Item Name
        const itemName = dom.createElement({
            parent: collapsedDiv.element,
            tag: 'input',
            className: 'item-name',
            attributes: [
                {
                    name: 'value',
                    value: item.name
                }
            ]
        });
    }

    const createTodoItem = function createTodoItemElement(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            idName: 'todos',
            className: 'list-elements',
        });
        createCollapsed(itemDiv.element, item);
        
    }

    // Creates todo div
    const createTodos = function createTodoElement(todos) {
        const todosDiv = dom.createElement({
            parent: listElement.element,
            tag: 'div',
            idName: 'todos',
            className: 'list-elements',
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