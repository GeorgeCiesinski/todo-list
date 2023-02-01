const todosEvents = function todosEventFunctions(dom, util) {

    // Returns common variables used by event functions
    const returnEventVariables = function returnEventVariableObject(event) {
        const element = event.currentTarget;  // Event Element
        const elementIndex = element.getAttribute('index');  // Event Element Index
        const current = util.getCurrent();  // Current list data
        const { todos } = current.list;  // Current todos array
        const todosLength = todos.length;  // Length of todos array
        const todoItem = current.list.todos[elementIndex];  // Current Todo Item
        return {
            element,
            elementIndex,
            current,
            todos,
            todosLength,
            todoItem
        }
    }

    // Change todo checked event - changes checked state of todo item 
    const changeChecked = function changeTodoItemCheckedState(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.checked = element.checked;
        util.updateChange();
    }

    // Change todo name event - changes the name of the todo item
    const changeTodoName = function changeTodoItemName(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.name = element.value;
        util.updateChange();
    }

    // Change priority event - change priority of todo item
    const changePriority = function changePriorityOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.priority = element.value;
        util.updateChange();
    }

    // Change priority event - change priority of todo item
    const changeDue = function changeDueDateOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.due = element.value;
        util.updateChange();
    }

    // Change priority event - change priority of todo item
    const changeTodoDescription = function changeDescriptionOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.description = element.value;
        util.updateChange();
    }

    const changeCreated = function changeCreatedDateOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event);
        todoItem.added = element.value;
        util.updateChange();
    }

    const updateIndices = function updateTodoElementIndices(eventVariables) {
        const { elementIndex } = eventVariables;
        console.log(`elementIndex: ${elementIndex}`);
        const todoItems = document.querySelectorAll('.todo-items');
        for (let i = 0; i < todoItems.length; i+=1) {
            const itemIndex = todoItems[i].index;
            if (itemIndex < elementIndex) {
                todoItems[i].setAttribute = ('index', i);
            }
        }
    }

    const deleteItemElement = function deleteItemAndElement(eventVariables) {
        const { elementIndex, todos, todosLength } = eventVariables;
        // Delete element from todos array
        todos.splice(elementIndex, 1);  
        // Get the todoElement matching event index and remove it from dom
        const todoElement = document.querySelector(`.todo-items[index='${elementIndex}']`);
        dom.removeElement(todoElement);
        // Update the todos element indices to match todo array indices
        if (elementIndex < todosLength - 1) {
            updateIndices(eventVariables);
        }
        console.log(todos);
    }

    const deleteTodo = function deleteTodoEvent(event) {
        const eventVariables = returnEventVariables(event);
        deleteItemElement(eventVariables);
        // util.updateChange();
    }

    return {
        changeChecked,
        changeTodoName,
        changePriority,
        changeDue,
        changeTodoDescription,
        changeCreated,
        deleteTodo
    }

}

const todosBuilder = function todosBuilderFunctions(dom, util) {

    const events = todosEvents(dom, util);
    
    // Creates left side of visible div
    const createLeftVisibleDiv = function createLeftVisibleDivElements(parent, item, itemIndex) {
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
                    value: itemIndex
                }
            ]
        });
        if (item.checked) {
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
                    value: item.name
                },
                {   
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        dom.keyUpEvent(todoName, events.changeTodoName);
    }

    // Create priority div
    const createPriority = function createPriorityElements(parent, item, itemIndex) {
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
                    value: item.priority
                },
                {   
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        dom.changeEvent(priorityInput, events.changePriority);
    }

    // Creates right side of visible div
    const createRightVisibleDiv = function createRightVisibleDivElements(parent, item, itemIndex) {
        const rightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'right-visible-elements',
        });
        // Priority
        createPriority(rightDiv, item, itemIndex);
        // Collapse Button
        const collapseButton = dom.createElement({
            parent: rightDiv,
            tag: 'button',
            className: 'collapse-buttons',
            innerHTML: '<i class="fa-solid fa-plus"></i>'  // Font awesome plus icon
        });
        dom.addClass(collapseButton, 'collapsed');
    }

    // Create non collapsible div - always visible
    const createVisibleDiv = function createVisibleDivElements(parent, item, itemIndex) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'visible-todo-elements',
        });
        createLeftVisibleDiv(itemDiv, item, itemIndex);
        createRightVisibleDiv(itemDiv, item, itemIndex);
    }

    // Create due date div
    const createDueDate = function createDueDateElements(parent, item, itemIndex) {
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
                    value: item.due
                },
                {   
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        dom.changeEvent(dueDate, events.changeDue);
    }

    // Create item tracking div
    const createItemTracking = function createItemTrackingElements(parent, item, itemIndex) {
        const itemTrackingDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'item-tracking-div',
        });
        createDueDate(itemTrackingDiv, item, itemIndex);
    }

    const createInnerChecklistLeft = function createLeftChecklistItemElements(parent, itemIndex, innerItem, innerItemIndex) {
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
                    value: itemIndex
                },
                {
                    name: 'item',
                    value: innerItemIndex
                }
            ]
        });
        if (innerItem.checked) {
            checkBox.checked = true;
        };
        // Item Name
        dom.createElement({
            parent: innerItemLeftDiv,
            tag: 'input',
            className: 'inner-item-names',
            attributes: [
                {
                    name: 'value',
                    value: innerItem.name
                },
                {   
                    name: 'index',
                    value: itemIndex
                },
                {
                    name: 'item',
                    value: innerItemIndex
                }
            ]
        });
    }

    const createInnerChecklistRight = function createRightChecklistItemElements(parent, itemIndex, innerItem, innerItemIndex) {
        const innerItemRightDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'checklist-item-right-divs',
        });
        const innerDeleteButton = dom.createElement({
            parent: innerItemRightDiv,
            tag: 'button',
            className: 'delete-inner-item-buttons',
            innerHTML: '<i class="fa-regular fa-circle-xmark"></i>',
            attributes: [
                {
                    name: 'index',
                    value: innerItemIndex
                },
                {   
                    name: 'index',
                    value: itemIndex
                },
                {
                    name: 'item',
                    value: innerItemIndex
                }
            ]
        });
    }

    // Create inner check list div - contains todo item checklist
    const createInnerCheckListDiv = function createInnerCheckListDivElements(parent, item, itemIndex) {
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
        // Create inner check list items
        item.checklist.forEach(innerItem => {
            const innerItemIndex = item.checklist.indexOf(innerItem);
            const innerItemDiv = dom.createElement({
                parent: innerCheckListDiv,
                tag: 'div',
                className: 'checklist-item-divs',
            });
            createInnerChecklistLeft(innerItemDiv, itemIndex, innerItem, innerItemIndex);
            createInnerChecklistRight(innerItemDiv, itemIndex, innerItem, innerItemIndex);
        });
    }

    // Create item description div
    const createItemDescription = function createItemDescriptionElements(parent, item, itemIndex) {
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
                    value: itemIndex
                }
            ]
        });
        descriptionInput.value = item.description;  // Text area value must be changed with value parameter
        dom.keyUpEvent(descriptionInput, events.changeTodoDescription);
    }

    // Create created date div
    const createCreated = function createCreatedElements(parent, item, itemIndex) {
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
                    value: item.added
                },
                {
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        dom.changeEvent(createdDate, events.changeCreated);
    }

    // Create button to delete todo item
    const createDelete = function createDeleteElement(parent, item, itemIndex) {
        const deleteButton = dom.createElement({
            parent,
            tag: 'button',
            className: 'delete-item-buttons',
            innerHTML: '<i class="fa-solid fa-trash"></i>',
            attributes: [
                {
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        dom.clickEvent(deleteButton, events.deleteTodo);
    }

    // Create item deletion div
    const createItemDeletion = function createItemDeletionElements(parent, item, itemIndex) {
        const deletionDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'deletion-div',
        });
        createCreated(deletionDiv, item, itemIndex);
        createDelete(deletionDiv, item, itemIndex);
    }


    // Create collapsible div - collapsed by default
    const createCollapsibleDiv = function createCollapsibleDivElements(parent, item, itemIndex) {
        const collapsibleDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapsible-todo-elements',
        });
        createItemTracking(collapsibleDiv, item, itemIndex);
        // If item contains checklist, create inner checklist
        if (item.checklist.length > 0) {
            createInnerCheckListDiv(collapsibleDiv, item, itemIndex)
        };
        createItemDescription(collapsibleDiv, item, itemIndex);
        createItemDeletion(collapsibleDiv, item, itemIndex);
    }

    // Create todo parent div
    const createTodoItem = function createTodoItemElement(parent, item, itemIndex) {
        const itemDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'todo-items',
            attributes: [
                {
                    'name': 'index',
                    'value': itemIndex
                }
            ]
        });
        createVisibleDiv(itemDiv, item, itemIndex);
        createCollapsibleDiv(itemDiv, item, itemIndex);
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
        todos.forEach(item => {
            const itemIndex = todos.indexOf(item);
            createTodoItem(todosDiv, item, itemIndex);
        });
    }

    return {
        build
    }
}

export default todosBuilder;