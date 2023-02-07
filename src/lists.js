import links from "./listsLinks";
import todosBuilder from "./todos";
import listsEvents from "./listsEvents";
import listsUtilities from "./listsUtilities";

const listsBuilder = function listsBuilderFunctions(dom, modal) {

    // Lists Utilities - manage lists objects
    const util = listsUtilities();

    // Todos Builder - builds individual todo items
    const todos = todosBuilder(dom, util, modal);

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

    const warningModal = modal.actionModal({
        messageHTML: 'Are you sure you want to permanently delete this list?',
        buttonHTML: '<span class="material-symbols-rounded">delete_forever</span><label>Delete Forever</label>',
    });

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
        dom.clickEvent(deleteListButton, warningModal.showModal);
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

    // Add action to warningModal
    warningModal.addAction(events.deleteList);

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

    return {
        buildList,
        switchList,
        showPage,
        deleteDataRefresh
    }
}

export default listsBuilder;
