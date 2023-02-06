import links from "./listsLinks";
import todosBuilder from "./todos";
import listsEvents from "./listsEvents";
import listsUtilities from "./listsUtilities";

const listsBuilder = function listsBuilderFunctions(dom) {

    // Lists Utilities - manage lists objects
    const util = listsUtilities();

    // Todos Builder - builds individual todo items
    const todos = todosBuilder(dom, util);

    /*
     * listsLinks and events instances defined later
     * - due to listsLinks requiring switchList function, and events needing listsLinks
     */
    let listsLinks = null; 
    let events = null;
    
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
        dom.keyUpEvent(title, events.changeTitle);
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
        dom.keyUpEvent(description, events.changeDescription);
    }

    const createAddTodo = function createAddTodoButton(parent, current) {
        const addTodoButton = dom.createElement({
            parent,
            tag: 'button',
            className: 'add-todo-buttons',
            innerHTML: '<span class="material-symbols-rounded">add</span><label>New Todo</label>',
            attributes: [
                {   
                    name: 'index',
                    value: current.index
                }
            ]
        });
        dom.clickEvent(addTodoButton, todos.addNewTodoItem);
    }

    const createDeleteList = function createDeleteListButton(parent, current) {
        const deleteListButton = dom.createElement({
            parent,
            tag: 'button',
            className: 'delete-list-buttons',
            innerHTML: '<label>Delete List</label><span class="material-symbols-rounded">delete_forever</span>',
            attributes: [
                {   
                    name: 'index',
                    value: current.index
                }
            ]
        });
        dom.clickEvent(deleteListButton, events.showModal);
    }

    const createAddDelete = function createAddAndDeleteElements(current) {
        const addDeleteDiv = dom.createElement(
            {
                parent: listElement,
                tag: 'div',
                className: 'add-delete-divs'
            }
        );
        createAddTodo(addDeleteDiv, current);
        createDeleteList(addDeleteDiv, current);
    }

    // Builds and rebuilds listElement from list by index
    const buildList = function buildListByIndex() {
        dom.clearList();
        const current = util.getCurrent();
        createTitle(current);
        createDescription(current);
        todos.build();
        createAddDelete(current);
        events.createEventListeners();
    }

    // Handle list nav event and show requested list
    const switchList = function switchListEvent(event) {
        const element = event.target;
        const index = Number(element.getAttribute('list'));
        util.switchCurrent(index);
        buildList();
        dom.switchListLinks(element);
    }

    // Define listsLinks instance declared previously
    listsLinks = links(dom, util, switchList);
    events = listsEvents(dom, util, listsLinks);

    // Create warning modal
    const createDeleteConfirmationModal = function createDeleteConfirmationModalElement(parent) {
        // Main modal div
        const modalDiv = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'warning-modal',
        });
        // Modal content - contains a top, middle and bottom div
        const modalContent = dom.createElement({
            parent: modalDiv, 
            tag: 'div', 
            idName: 'modal-content',
        });
        // Top div
        const modalTopDiv = dom.createElement({
            parent: modalContent, 
            tag: 'div', 
            idName: 'modal-top',
            className: 'modal-layer',
        });
        const closeButton = dom.createElement({
            parent: modalTopDiv,
            tag: 'span',
            idName: 'modal-close',
            innerHTML: '<span class="material-symbols-rounded">close</span>'
        });
        dom.clickEvent(closeButton, events.hideModal);
        // Middle div
        const modalMiddleDiv = dom.createElement({
            parent: modalContent, 
            tag: 'div', 
            idName: 'modal-middle',
            className: 'modal-layer',
        });
        dom.createElement({
            parent: modalMiddleDiv,
            tag: 'p',
            idName: 'modal-text',
            innerHTML: 'Are you sure you want to permanently delete this list?'
        });
        // Bottom div
        const modalBottomDiv = dom.createElement({
            parent: modalContent, 
            tag: 'div', 
            idName: 'modal-bottom',
            className: 'modal-layer',
        });
        const confirmDeleteButton = dom.createElement({
            parent: modalBottomDiv,
            tag: 'button',
            idName: 'confirm-delete-button',
            innerHTML: '<span class="material-symbols-rounded">delete_forever</span><label>Delete Forever</label>',
        });
        dom.clickEvent(confirmDeleteButton, events.deleteList);
    }

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
        listsLinks.build(); 
    }
    
    // Refreshes lists data with default lists when localStorage data is deleted from the settings
    const deleteDataRefresh = function refreshElementsAfterDataDelete() {
        util.deleteRefresh();
        listsLinks.build();
    }

    // Initialize Modal
    createDeleteConfirmationModal(listsPage);

    return {
        buildList,
        switchList,
        showPage,
        deleteDataRefresh
    }
}

export default listsBuilder;
