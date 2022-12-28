const modifyDom = function modifyDomElements() {
    
    // Create a dom element and give it an ID
    const createWithId = function createDomElementAddID({
        parent, 
        tag, 
        idName,
        innerHTML = null
    }={}) {
        if (parent && tag && idName) {
            const element = document.createElement(tag);
            element.id = idName;
            if (innerHTML !== undefined && innerHTML !== null) {
                element.innerHTML = innerHTML;
            }
            parent.appendChild(element);
            return element;
        }
        return null;
    }

    // Create a dom element and give it a class
    const createWithClass = function createDomElementAddClass({
        parent, 
        tag, 
        className,
        innerHTML = null
    }={}) {
        if (parent && tag && className) {
            const element = document.createElement(tag);
            element.classList.add(className);
            if (innerHTML !== undefined && innerHTML !== null) {
                element.innerHTML = innerHTML;
            }
            parent.appendChild(element);
            return element;
        }
        return null;
    }

    return {
        createWithId,
        createWithClass
    }
};

export default modifyDom;