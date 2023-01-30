import listsLinks from "./listsLinks"
import todosBuilder from "./todos"
import listsUtilities from "./listsUtilities"

const listsBuilder = function listsBuilderFunctions(dom) {

    // Lists Utilities - manage lists objects
    const util = listsUtilities();

    // Todos Builder - builds individual todo items
    const todos = todosBuilder(dom, util);

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

    // Change Title Event - Changes the list.title variable
    const changeTitle = function changeListTitle(event) {
        const element = event.target;
        const current = util.getCurrent();  // Current List
        current.list.title = element.value;
        util.updateChange();
        listsNav.build(util.listNavData(), current.index);  // Build Nav Links for Lists
    }

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
        dom.keyUpEvent(title, changeTitle);
    }

    // Change Title Event - Changes the list.title variable and updates the last change time
    const changeDescription = function changeListDescription(event) {
        const element = event.target;
        const current = util.getCurrent();  // Current List
        current.list.description = element.value;
        util.updateChange();
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
        dom.keyUpEvent(description, changeDescription);
    }

    // Adds event listeners to page
    const createEventListeners = function addEventListenersToElements() {
        dom.createCollapse();
    }

    // Builds and rebuilds listElement from list by index
    const buildList = function buildListByIndex() {
        dom.clearList();
        const current = util.getCurrent();
        createTitle(current);
        createDescription(current);
        todos.build(current.list);
        createEventListeners();
    }

    // Handle list nav event and show requested list
    const switchList = function switchListEvent(event) {
        const element = event.target;
        const index = Number(element.getAttribute('index'));
        util.switchCurrent(index);
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
        listsNav.build(util.listNavData(), util.getCurrent().index); 
    }

    return {
        buildList,
        switchList,
        showPage,
        createEventListeners
    }
}

export default listsBuilder
