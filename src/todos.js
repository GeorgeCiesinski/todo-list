import todosEvents from "./todosEvents";

const todosBuilder = function todosBuilderFunctions(dom, util, modal) {

    const events = todosEvents(dom, util, modal);
    
    // Creates left side of visible div
    const createLeftVisibleDiv = function createLeftVisibleDivElements(parent, todo, todoIndex) {
        const leftDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'left-visible-elements',
        });
        // Checkbox
        const checkBox = dom.createElement({
            parent: leftDiv,
            tag: 'input',
            className: 'item-checkboxes',
            attributes: [
                {
                    name: 'type',
                    value: 'checkbox'
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        if (todo.checked) {
            checkBox.checked = true;
        };
        // checkBox event
        dom.changeEvent(checkBox, events.changeChecked);
        // Item Name
        const todoName = dom.createElement({
            parent: leftDiv,
            tag: 'input',
            className: 'item-names',
            attributes: [
                {
                    name: 'value',
                    value: todo.name || ''  // Adds todo name or empty if null
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.keyUpEvent(todoName, events.changeTodoName);
    }

    // Create priority div
    const createPriority = function createPriorityElements(parent, todo, todoIndex) {
        // Label
        dom.createElement({
            parent,
            tag: 'label',
            className: 'tracking-label',
            innerHTML: 'Priority: '
        });
        // Priority
        const priorityInput = dom.createElement({
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
                    value: todo.priority
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.changeEvent(priorityInput, events.changePriority);
    }

    // Creates right side of visible div
    const createRightVisibleDiv = function createRightVisibleDivElements(parent, todo, todoIndex) {
        const rightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'right-visible-elements',
        });
        // Priority
        createPriority(rightDiv, todo, todoIndex);
        // Collapse Button
        const collapseButton = dom.createElement({
            parent: rightDiv,
            tag: 'button',
            className: 'collapse-buttons',
            innerHTML: '<span class="material-symbols-rounded">expand_more</span>',
            attributes: [
                {
                    name: 'event',
                    value: false
                }
            ]
        });
        dom.addClass(collapseButton, 'collapsed');
    }

    // Create non collapsible div - always visible
    const createVisibleDiv = function createVisibleDivElements(parent, todo, todoIndex) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        createLeftVisibleDiv(itemDiv, todo, todoIndex);
        createRightVisibleDiv(itemDiv, todo, todoIndex);
    }

    // Create due date div
    const createDueDate = function createDueDateElements(parent, todo, todoIndex) {
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
        const dueDate = dom.createElement({
            parent: dueDiv,
            tag: 'input',
            className: 'date-input',
            attributes: [
                {
                    name: 'type',
                    value: 'date'
                },
                {
                    name: 'value',
                    value: todo.due
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.changeEvent(dueDate, events.changeDue);
    }

    // Create item tracking div
    const createItemTracking = function createItemTrackingElements(parent, todo, todoIndex) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv, todo, todoIndex);
    }

    // Create Left side of checklist item
    const createInnerChecklistLeft = function createLeftChecklistItemElements(parent, todoIndex, checklistItem, checklistItemIndex) {
        const innerItemLeftDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'checklist-item-left-divs',
        });
        // Checkbox
        const checkBox = dom.createElement({
            parent: innerItemLeftDiv,
            tag: 'input',
            className: 'inner-item-checkboxes',
            attributes: [
                {
                    name: 'type',
                    value: 'checkbox'
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'item',
                    value: checklistItemIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.addClass(checkBox, 'inner-checklist-elements');
        dom.clickEvent(checkBox, events.changeInnerChecked);
        if (checklistItem.checked) {
            checkBox.checked = true;
        };
        // Item Name
        const innerItemLabel = dom.createElement({
            parent: innerItemLeftDiv,
            tag: 'input',
            className: 'inner-item-names',
            attributes: [
                {
                    name: 'value',
                    value: checklistItem.name
                },
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'item',
                    value: checklistItemIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.addClass(innerItemLabel, 'inner-checklist-elements');
        dom.keyUpEvent(innerItemLabel, events.changeInnerName);
    }

    // Create Right side of checklist item
    const createInnerChecklistRight = function createRightChecklistItemElements(parent, todoIndex, checklistItem, checklistItemIndex) {
        const innerItemRightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'checklist-item-right-divs',
        });
        const innerDeleteButton = dom.createElement({
            parent: innerItemRightDiv,
            tag: 'button',
            className: 'delete-inner-item-buttons',
            innerHTML: '<span class="material-symbols-rounded">backspace</span>',
            attributes: [
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'item',
                    value: checklistItemIndex
                }
            ]
        });
        dom.addClass(innerDeleteButton, 'inner-checklist-elements');
        dom.clickEvent(innerDeleteButton, events.deleteChecklistItem);
    }

    const createChecklistItem = function createChecklistItemElements(parent, todoIndex, checklistItem, checklistItemIndex) {
        const innerItemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'checklist-item-divs',
            attributes: [
                {   
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'item',
                    value: checklistItemIndex
                }
            ]
        });
        dom.addClass(innerItemDiv, 'inner-checklist-elements');
        createInnerChecklistLeft(innerItemDiv, todoIndex, checklistItem, checklistItemIndex);
        createInnerChecklistRight(innerItemDiv, todoIndex, checklistItem, checklistItemIndex);
    }

    const createInnerChecklistItems = function createInnerCheckListItemElements(parent, todo, todoIndex) {
        // Create inner check list items
        todo.checklist.forEach(checklistItem => {
            const checklistItemIndex = todo.checklist.indexOf(checklistItem);
            createChecklistItem(parent, todoIndex, checklistItem, checklistItemIndex);
        });
    }

    const addChecklistElement = function addNewChecklistElement(event) {
        const addButton = event.currentTarget;
        const todoIndex = addButton.getAttribute('index');
        const innerCheckListElement = addButton.parentNode.previousSibling;
        const { checklistItem, checklistItemIndex } = events.addChecklistItem(event);
        // Create Element
        createChecklistItem(innerCheckListElement, todoIndex, checklistItem, checklistItemIndex);
        // Focus
        const newNameElement = document.querySelector(`.inner-item-names[index='${todoIndex}'][item='${checklistItemIndex}']`);
        newNameElement.focus();
    }

    const createAddChecklistItemButton = function createAddChecklistItemButtonElement(parent, todoIndex) {
        const addItemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'checklist-item-divs',
        });
        const innerAddButton = dom.createElement({
            parent: addItemDiv,
            tag: 'button',
            className: 'add-inner-item-buttons',
            innerHTML: '<span class="material-symbols-rounded">add</span><label>Add Step</label>',
            attributes: [
                {   
                    name: 'index',
                    value: todoIndex
                }
            ]
        });
        dom.clickEvent(innerAddButton, addChecklistElement);
    }

    // Create inner check list div - contains todo item checklist
    const createInnerCheckListDiv = function createInnerCheckListDivElements(parent, todo, todoIndex) {
        const innerCheckListDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'inner-checklist-div',
        });
        dom.createElement({
            parent: innerCheckListDiv,
            tag: 'label',
            className: 'inner-labels',
            innerHTML: 'Checklist:'
        });
        const innerCheckListItemsDiv = dom.createElement({
            parent: innerCheckListDiv,
            tag: 'div',
            className: 'inner-checklist-items-div',
        });
        if (todo.checklist.length > 0) {
            createInnerChecklistItems(innerCheckListItemsDiv, todo, todoIndex);
        };
        createAddChecklistItemButton(innerCheckListDiv, todoIndex);
    }

    // Create item description div
    const createItemDescription = function createItemDescriptionElements(parent, todo, todoIndex) {
        const descriptionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'description-div',
        });
        dom.createElement({
            parent: descriptionDiv,
            tag: 'label',
            className: 'label',
            innerHTML: 'Notes:'
        });
        const descriptionInput = dom.createElement({
            parent: descriptionDiv,
            tag: 'textarea',
            className: 'item-description',
            attributes: [
                {   
                    name: 'index',
                    value: todoIndex
                }
            ]
        });
        descriptionInput.value = todo.description;  // Text area value must be changed with value parameter
        dom.keyUpEvent(descriptionInput, events.changeTodoDescription);
    }

    // Create created date div
    const createCreated = function createCreatedElements(parent, todo, todoIndex) {
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
        const createdDate = dom.createElement({
            parent: createdDiv,
            tag: 'input',
            className: 'date-input',
            attributes: [
                {
                    name: 'type',
                    value: 'date'
                },
                {
                    name: 'value',
                    value: todo.added
                },
                {
                    name: 'index',
                    value: todoIndex
                },
                {
                    name: 'data-form-type',
                    value: 'other'
                }
            ]
        });
        dom.changeEvent(createdDate, events.changeCreated);
    }

    // Create button to delete todo item
    const createDelete = function createDeleteElement(parent, todoIndex) {
        const deleteDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'delete-item-divs',
        });
        const deleteButton = dom.createElement({
            parent: deleteDiv,
            tag: 'button',
            className: 'delete-item-buttons',
            innerHTML: '<span class="material-symbols-rounded">delete</span>',
            attributes: [
                {
                    name: 'index',
                    value: todoIndex
                }
            ]
        });
        dom.clickEvent(deleteButton, events.deleteTodo);
    }

    // Create item deletion div
    const createItemDeletion = function createItemDeletionElements(parent, todo, todoIndex) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        createCreated(deletionDiv, todo, todoIndex);
        createDelete(deletionDiv, todo, todoIndex);
    }


    // Create collapsible div - collapsed by default
    const createCollapsibleDiv = function createCollapsibleDivElements(parent, todo, todoIndex) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        createItemTracking(collapsibleDiv, todo, todoIndex);
        createInnerCheckListDiv(collapsibleDiv, todo, todoIndex);
        createItemDescription(collapsibleDiv, todo, todoIndex);
        createItemDeletion(collapsibleDiv, todo, todoIndex);
    }

    // Create todo parent div
    const createTodoItem = function createTodoItemElement(parent, todo, todoIndex) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
            attributes: [
                {
                    'name': 'index',
                    'value': todoIndex
                }
            ]
        });
        createVisibleDiv(itemDiv, todo, todoIndex);
        createCollapsibleDiv(itemDiv, todo, todoIndex);
    }

    const addNewTodoItem = function addNewTodoItemElement(event) {
        const { todoItem, todoIndex } = events.addTodo(event);
        const parent = document.getElementById('todos');
        createTodoItem(parent, todoItem, todoIndex);
        dom.createCollapse();
        const newNameElement = document.querySelector(`.item-names[index='${todoIndex}']`);
        newNameElement.focus();
    }

    // Creates todo div
    const build = function createTodoElement() {
        const current = util.getCurrent();
        const todosDiv = dom.createElement({
            parent: dom.getListElement(),
            tag: 'div',
            idName: 'todos',
        });
        const { todos } = current.list;
        // Create todo items
        todos.forEach(todo => {
            const todoIndex = todos.indexOf(todo);
            createTodoItem(todosDiv, todo, todoIndex);
        });
    }

    return {
        addNewTodoItem,
        build
    }
}

export default todosBuilder;