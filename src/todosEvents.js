import format from 'date-fns/format'

const todosEvents = function todosEventFunctions(dom, util, modal) {
    // Create warning modals
    const dueModal = modal.actionModal({
        messageHTML: 'Due date must be after the created date.',
        buttonHTML: '<label>OK</label>',
    })

    const addedFutureModal = modal.actionModal({
        messageHTML: 'Created date must not be in the future.',
        buttonHTML: '<label>OK</label>',
    })

    const addedAfterDueModal = modal.actionModal({
        messageHTML: 'Created date be before due date.',
        buttonHTML: '<label>OK</label>',
    })

    // Returns common variables used by event functions
    const returnEventVariables = function returnEventVariableObject(event) {
        // Element Data from event
        const element = event.currentTarget // Event Element
        const elementIndex = Number(element.getAttribute('index')) // Event Element Index
        const elementItem = Number(element.getAttribute('item')) // Event Element Item# if exists
        // Current List Data matching element index and item
        const current = util.getCurrent() // Current list data
        const { todos } = current.list // Current todos array
        const todosLength = todos.length // Length of todos array
        const todoItem = current.list.todos[elementIndex] // Current Todo Item
        let checklist = null
        let checklistLength = null
        let checklistItem = null
        if (todoItem) {
            checklist = todoItem.checklist
            checklistLength = checklist.length
            checklistItem = checklist[elementItem]
        }

        return {
            element,
            elementIndex,
            elementItem,
            current,
            todos,
            todosLength,
            todoItem,
            checklist,
            checklistLength,
            checklistItem,
        }
    }

    // Change todo checked event - changes checked state of todo item
    const changeChecked = function changeTodoItemCheckedState(event) {
        const { todoItem, element } = returnEventVariables(event)
        todoItem.checked = element.checked
        util.updateChange()
    }

    // Change todo name event - changes the name of the todo item
    const changeTodoName = function changeTodoItemName(event) {
        const { todoItem, element } = returnEventVariables(event)
        todoItem.name = element.value
        util.updateChange()
    }

    // Change priority event - change priority of todo item
    const changePriority = function changePriorityOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event)
        todoItem.priority = element.value
        util.updateChange()
    }

    // Change due date event - change due date of todo item
    const changeDue = function changeDueDateOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event)

        const elementDate = new Date(`${element.value}T00:00:00`)
        const todoItemAddedDate = new Date(`${todoItem.added}T00:00:00`)

        // Exit if due date is before added date
        if (elementDate < todoItemAddedDate) {
            element.value = todoItem.due // Change input back to original date
            dueModal.showModal()
            return
        }

        todoItem.due = element.value // Update due date
        util.updateChange()
    }

    // Change priority event - change priority of todo item
    const changeTodoDescription = function changeDescriptionOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event)
        todoItem.description = element.value
        util.updateChange()
    }

    // Change created date event - change created date of todo item
    const changeCreated = function changeCreatedDateOfTodoItem(event) {
        const { todoItem, element } = returnEventVariables(event)

        // Normalize dates to local time
        const elementDate = new Date(`${element.value}T00:00:00`)
        const todoItemDueDate = new Date(`${todoItem.due}T00:00:00`)

        // Exit if added date is in the future
        if (elementDate > new Date()) {
            element.value = todoItem.added // Change input back to original date
            addedFutureModal.showModal()
            return
        }

        // Exit if added date is after due date
        if (elementDate > todoItemDueDate && todoItem.due != null) {
            element.value = todoItem.added // Change input back to original date
            addedAfterDueModal.showModal()
            return
        }

        todoItem.added = element.value
        util.updateChange()
    }

    const addTodo = function createNewTodoItem(event) {
        const { todos } = returnEventVariables(event)
        const todoItem = {
            name: null,
            added: format(new Date(), 'yyyy-MM-dd'),
            description: null,
            checklist: [],
            due: null,
            priority: 2,
            checked: false,
        }
        const todoIndex = todos.push(todoItem) - 1
        util.updateChange()

        return {
            todoItem,
            todoIndex,
        }
    }

    /*
     * Updates Indices of items in arrays
     *
     * When an item is deleted from the array, the elements need to be updated to reflect the index
     * of the array item they represent
     */
    const updateIndices = function updateTodoElementIndices(i) {
        const newIndex = i - 1 // Decrement index
        const todoElements = document.querySelectorAll(`[index="${i}"]`) // Gets all todo elements with correct index attribute
        todoElements.forEach((element) => {
            element.setAttribute('index', newIndex) // Set new value
        })
    }

    // Deletes a todo item
    const deleteTodo = function deleteTodoEvent(event) {
        const { elementIndex, todos, todosLength } = returnEventVariables(event)
        // Delete element from todos array
        todos.splice(elementIndex, 1)
        // Get the todoElement matching event index and remove it from dom
        const todoElement = document.querySelector(
            `.todo-items[index='${elementIndex}']`
        )
        dom.removeElement(todoElement)
        // Update the todos element indices to match todo array indices
        if (elementIndex < todosLength - 1) {
            for (let i = elementIndex + 1; i < todosLength; i += 1) {
                updateIndices(i)
            }
        }
        // Que changes for save
        util.updateChange()
    }

    /*
     * Inner Checklist
     */

    // Pushes a new checklist item and returns item number
    const addChecklistItem = function addChecklistItemToArray(event) {
        const { checklist } = returnEventVariables(event)
        const checklistItem = {
            name: '',
            checked: false,
        }
        const checklistItemIndex = checklist.push(checklistItem) - 1
        util.updateChange()

        return {
            checklistItem,
            checklistItemIndex,
        }
    }

    // Change inner item checked event - changes checked state of todo item
    const changeInnerChecked = function changeChecklistItemCheckedState(event) {
        const { checklistItem, element } = returnEventVariables(event)
        checklistItem.checked = element.checked
        util.updateChange()
    }

    // Change inner item name event - changes the name of the todo item
    const changeInnerName = function changeInnerItemName(event) {
        const { checklistItem, element } = returnEventVariables(event)
        checklistItem.name = element.value
        util.updateChange()
    }

    /*
     * Updates Item attribute of items in arrays
     *
     * When an item is deleted from the array, the remaining elements need to be updated to reflect the index
     * of the array item they represent
     */
    const updateInnerIndices = function updateChecklistItemAttribute(
        elementIndex,
        i
    ) {
        const newItem = i - 1 // Decrement index
        const checklistElements = document.querySelectorAll(
            `.inner-checklist-elements[index="${elementIndex}"][item="${i}"]`
        ) // Gets all todo elements with correct index attribute
        checklistElements.forEach((element) => {
            element.setAttribute('item', newItem) // Set new value
        })
    }

    // Deletes item from checklist
    const deleteChecklistItem = function deleteChecklistItem(event) {
        const { elementIndex, elementItem, checklist, checklistLength } =
            returnEventVariables(event)
        // Delete item from checklist array
        checklist.splice(elementItem, 1)
        // Get the checklist item element matching index and item, and remove it from dom
        const itemElement = document.querySelector(
            `.checklist-item-divs[index='${elementIndex}'][item='${elementItem}']`
        )
        dom.removeElement(itemElement)
        if (elementItem < checklistLength - 1) {
            // updateIndices(eventVariables);
            for (let i = elementItem + 1; i < checklistLength; i += 1) {
                updateInnerIndices(elementIndex, i)
            }
        }
        // Que changes for save
        util.updateChange()
    }

    return {
        changeChecked,
        changeTodoName,
        changePriority,
        changeDue,
        changeTodoDescription,
        changeCreated,
        addTodo,
        deleteTodo,
        addChecklistItem,
        changeInnerChecked,
        changeInnerName,
        deleteChecklistItem,
    }
}

export default todosEvents
