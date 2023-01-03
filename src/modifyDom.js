/*
 * Contains all functions that modify DOM
 */
const modifyDom = function modifyDomElements() {

    // Content element
    let content = null;

    /* Set attribute for a given element
     * 
     * - Params - 
     * element: A DOM element
     * attribute: An array containing objects with attribute name and value
     *      {
     *          name: The name of the attribute to add
     *          value: The value of the attribute
     *      }
     */
    const addAttributes = function addAttributesToElement(element, attribute) {
        const {name, value} = attribute;
        try {
            element.setAttribute(name, value);
        }
        catch(err) {
            console.error("Failed to add attribute to element.", err);
        }
    }

    /*
    * Creates a new element, adds attributes, and appends to parent if provided. 
    *
    * - Params -
    * parent: Parent element. Appends new element to parent if provided.
    * tag(required): The new element is created using the provided tag.
    * idName: Adds id if provided.
    * className: Adds class if provided.
    * innerHTML: Adds innerHTML if provided.
    * href: Adds href if the tag is an anchor. If no href provided, 'href="#"` will be added instead.
    * 
    * - Returns -
    * {
    *      success: true/false,
    *      element: (element) if success === true
    * }
    */
    const createElement = function createNewDomElement({
        parent, 
        tag,
        idName, 
        className,
        innerHTML,
        href,
        attributes
    }={
        attributes: {} 
    }) {

        const result = {};

        // If parent and tag are provided, create element
        if (tag) {
            const element = document.createElement(tag);
            // Append to parent if provided
            if (parent) {
                parent.appendChild(element);
            }
            // Add optional values
            if (idName) {
                element.id = idName;
            }
            if (className) {
                element.classList.add(className);
            }
            if (innerHTML) {
                element.innerHTML = innerHTML;
            }
            if (href) {
                element.href = href;
            }
            if (attributes) {
                attributes.forEach(attribute => addAttributes(element, attribute));
            }
            // Result
            result.success = true;
            result.element = element;
        } else {
            console.error('Unable to create element without a tag.');
            result.success = false;
        }

        return result;

    }

    // Sets content div once it is first created
    const setContent = function setContentDomNode(element) {
        content = element;
    }

    // Remove elements from content div
    const clearContent = function clearElementsFromContent() {
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
    }

    // Appends element to content div
    const switchContent = function switchContentWithNewElement(element) {
        clearContent();  
        content.appendChild(element);
    }

    return {
        createElement,
        setContent,
        switchContent
    }
};

export default modifyDom;