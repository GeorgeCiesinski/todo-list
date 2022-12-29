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

    const createElement = function createNewDomElement({
        parent, 
        tag,
        idName, 
        className,
        innerHTML,
        href
    }={}) {

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
            // Update result object
            result.success = true;
            result.element = element;
        } else {
            console.log('Unable to create element without a tag.');
            result.success = false;
        }

        return result;

    }

    return {
        createElement
    }
};

export default modifyDom;