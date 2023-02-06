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

    /*
     * Modal
     */

    const showModal = function confirmDeleteModalElements() {
        const modal = document.getElementById('warning-modal');
        modal.style.display = 'block';
    }

    const hideModal = function hideModalElements() {
        const modal = document.getElementById('warning-modal');
        modal.style.display = 'none';
    }

    /*
     * Deletes the list object from the array and clears the listElement
     */
    const deleteList = function deleteListObjectAndElement() {
        util.deleteCurrent();
        dom.clearList();
        util.updateChange();
        listsLinks.build();  // Build Nav Links for Lists
        hideModal();
    }

    return {
        changeTitle,
        changeDescription,
        createEventListeners,
        deleteList,
        showModal,
        hideModal
    }
}

export default listsEvents;