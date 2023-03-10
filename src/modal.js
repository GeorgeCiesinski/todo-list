const modalBuilder = function modalBuilderFunctions(dom) {
    /* 
     * Create modal

     * - Params -
     * messageHTML (required): HTML for the contents of the modal message.
     * buttonHTML (required): HTML for the contents of the action button
     * action: callback function to add to the action button
     * 
     * - Returns -
     * {
     *      actionModal     - actionModal object
     *          .showModal  - Shows actionModal object
     *          .addAction  - Adds an action after creation
     * }
     */
    const actionModal = function createActionModalElement({
        messageHTML,
        buttonHTML,
        action,
    } = {}) {
        // Main modal div
        const modalDiv = dom.createElement({
            parent: document.body,
            tag: 'div',
            className: 'warning-modal',
        })

        // Shows the modal when called
        const showModal = function showModalElement() {
            modalDiv.style.display = 'block'
        }

        const hideModal = function hideModalElement() {
            modalDiv.style.display = 'none'
        }

        // Modal content - contains a top, middle and bottom div
        const modalContent = dom.createElement({
            parent: modalDiv,
            tag: 'div',
            className: 'modal-content',
        })
        // Top div
        const modalTopDiv = dom.createElement({
            parent: modalContent,
            tag: 'div',
            className: 'modal-top',
        })
        const closeButton = dom.createElement({
            parent: modalTopDiv,
            tag: 'span',
            className: 'modal-close',
            innerHTML: '<span class="material-symbols-rounded">close</span>',
        })
        dom.clickEvent(closeButton, hideModal)
        // Middle div
        const modalMiddleDiv = dom.createElement({
            parent: modalContent,
            tag: 'div',
            className: 'modal-middle',
        })
        dom.createElement({
            parent: modalMiddleDiv,
            tag: 'p',
            className: 'modal-text',
            innerHTML: messageHTML,
        })
        // Bottom div
        const modalBottomDiv = dom.createElement({
            parent: modalContent,
            tag: 'div',
            className: 'modal-bottom',
        })
        const actionButton = dom.createElement({
            parent: modalBottomDiv,
            tag: 'button',
            className: 'modal-button',
            innerHTML: buttonHTML,
        })

        dom.clickEvent(actionButton, hideModal)

        // Add an action if provided
        if (action) {
            dom.clickEvent(actionButton, action)
        }

        // Adds an action manually if no action was provided when modal was created
        const addAction = function addActionToButton(newAction) {
            dom.clickEvent(actionButton, newAction)
        }

        return {
            showModal,
            addAction,
        }
    }

    return {
        actionModal,
    }
}

export default modalBuilder
