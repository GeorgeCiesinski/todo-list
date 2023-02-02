import links from "./listsLinks"
import todosBuilder from "./todos"
import listsUtilities from "./listsUtilities"

const listsEvents = function listEventFunctions(dom, util, listsLinks) {

    // Change Title Event - Changes the list.title variable
    const changeTitle = function changeListTitle(event) {
        const element = event.currentTarget;
        const current = util.getCurrent();  // Current List
        current.list.title = element.value;
        util.updateChange();
        listsLinks.build();  // Build Nav Links for Lists
    }

    // Change Title Event - Changes the list.title variable and updates the last change time
    const changeDescription = function changeListDescription(event) {
        const element = event.currentTarget;
        const current = util.getCurrent();  // Current List
        current.list.description = element.value;
        util.updateChange();
    }

    // Adds event listeners to page
    const createEventListeners = function addEventListenersToElements() {
        dom.createCollapse();
    }

    return {
        changeTitle,
        changeDescription,
        createEventListeners
    }
}

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

    // Builds and rebuilds listElement from list by index
    const buildList = function buildListByIndex() {
        dom.clearList();
        const current = util.getCurrent();
        createTitle(current);
        createDescription(current);
        todos.build();
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

    return {
        buildList,
        switchList,
        showPage
    }
}

export default listsBuilder
