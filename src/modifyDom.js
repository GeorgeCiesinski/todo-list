/*
 * Contains all functions that modify DOM

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
const modifyDom = function modifyDomElements() {

    // Set attribute for element
    const addAttributes = function addAttributesToElement(element, attribute) {
        const {name, value} = attribute;
        try {
            element.setAttribute(name, value);
        }
        catch(err) {
            console.error("Failed to add attribute to element.", err);
        }
    }

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

    const updateContent = function updateContentWithNewElement(element) {
        const content = document.querySelector('#content');  // Temp
        console.log(content);
        content.appendChild(element);
    }

    return {
        createElement,
        updateContent
    }
};

export default modifyDom;