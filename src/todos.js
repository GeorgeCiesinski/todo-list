const todosBuilder = function todosBuilderFunctions(dom) {
    
    // Creates left side of visible div
    const createLeftVisibleDiv = function createLeftVisibleDivElements(parent, item) {
        const leftDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'left-visible-elements',
        });
        // Checkbox
        dom.createElement({
            parent: leftDiv,
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
        dom.createElement({
            parent: leftDiv,
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

    // Create priority div
    const createPriority = function createPriorityElements(parent, item) {
        // Label
        dom.createElement({
            parent,
            tag: 'label',
            className: 'tracking-label',
            innerHTML: 'Priority: '
        });
        // Priority
        dom.createElement({
            parent,
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

    // Creates right side of visible div
    const createRightVisibleDiv = function createRightVisibleDivElements(parent, item) {
        const rightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'right-visible-elements',
        });
        // Priority
        createPriority(rightDiv, item);
        // Collapse Button
        const collapseButton = dom.createElement({
            parent: rightDiv,
            tag: 'button',
            className: 'collapse-buttons',
            innerHTML: '<i class="fa-solid fa-plus"></i>'  // Font awesome plus icon
        });
        dom.addClass(collapseButton, 'collapsed');
    }

    // Div is still visible when the todo item is collapsed
    const createVisibleDiv = function createVisibleDivElements(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        createLeftVisibleDiv(itemDiv, item);
        createRightVisibleDiv(itemDiv, item);
    }

    // Create due date div
    const createDueDate = function createDueDateElements(parent, item) {
        const dueDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'due-div',
        });
        // Label
        dom.createElement({
            parent: dueDiv,
            tag: 'label',
            className: 'date-labels',
            innerHTML: 'Due: '
        });
        // Date
        dom.createElement({
            parent: dueDiv,
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

    // Create item tracking div
    const createItemTracking = function createItemTrackingElements(parent, item) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv, item);
    }

    // Create item description div
    const createItemDescription = function createItemDescriptionElements(parent, item) {
        const descriptionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'description-div',
        });
        dom.createElement({
            parent: descriptionDiv,
            tag: 'label',
            className: 'label',
            innerHTML: 'Notes'
        });
        dom.createElement({
            parent: descriptionDiv,
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
        dom.createElement({
            parent: createdDiv,
            tag: 'label',
            className: 'date-labels',
            innerHTML: 'Created: '
        });
        // Date
        dom.createElement({
            parent: createdDiv,
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
        dom.createElement({
            parent,
            tag: 'button',
            className: 'delete-item-button',
            innerHTML: 'X',
            // attributes: [
            //     {
            //         name: 'index',
            //         value: 
            //     }
            // ]
        });
        // console.log(item);
    }

    // Create item deletion div
    const createItemDeletion = function createItemDeletionElements(parent, item) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        createCreated(deletionDiv, item);
        createDelete(deletionDiv, item);
    }

    const createCollapsibleDiv = function createCollapsibleDivElements(parent, item) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        createItemTracking(collapsibleDiv, item);
        createItemDescription(collapsibleDiv, item);
        createItemDeletion(collapsibleDiv, item);
    }

    // Create div with visible and collapsible elements
    const createTodoItem = function createTodoItemElement(parent, item) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
        });
        createVisibleDiv(itemDiv, item);
        createCollapsibleDiv(itemDiv, item);
    }

    // Creates todo div
    const build = function createTodoElement(currentList) {
        const todosDiv = dom.createElement({
            parent: dom.getListElement(),
            tag: 'div',
            idName: 'todos',
        });
        const { todos } = currentList;
        // Create todo items
        todos.forEach(item => {
            const todoItem = item;
            todoItem.index = todos.indexOf(item);
            createTodoItem(todosDiv, todoItem);
        });
    }

    return {
        build
    }
}

export default todosBuilder;