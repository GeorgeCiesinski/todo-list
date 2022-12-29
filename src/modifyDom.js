const modifyDom = function modifyDomElements() {

    const createElement = function createNewDomElement({
        parent, 
        tag,
        idName, 
        className,
        innerHTML,
        href = "#"
    }={}) {

        const result = {};

        // If parent and tag are provided, create element
        if (parent && tag) {
            const element = document.createElement(tag);
            parent.appendChild(element);
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
            if (tag === "a") {
                element.href = href;
            }
            // Update result object
            result.success = true;
            result.element = element;
        } else {
            console.log("Failed to create a new element because either parent or tag were not provided.");
            result.success = false;
        }

        return result;

    }

    return {
        createElement
    }
};

export default modifyDom;