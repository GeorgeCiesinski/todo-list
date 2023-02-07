const listsEvents = function listEventFunctions(dom, util, listsLinks, buildAddList) {

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

    /*
     * Modal
     */

    /*
     * Deletes the list object from the array and clears the listElement
     */
    const deleteList = function deleteListObjectAndElement() {
        util.deleteCurrent();
        util.updateChange();

        buildAddList();
        
        listsLinks.build();  // Build Nav Links for Lists
    }

    return {
        changeTitle,
        changeDescription,
        createEventListeners,
        deleteList,
    }
}

export default listsEvents;