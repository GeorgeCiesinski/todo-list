const modifyDom = function modifyDomElements() {
    
    // Create a dom element and give it an ID
    const createWithId = function createDomElementAddID(parent, tag, id) {
        const element = document.createElement(tag);
        element.id = id;
        parent.appendChild(element);
        return element;
    }

    // Create a dom element and give it a class
    const createWithClass = function createDomElementAddClass(parent, tag, className) {
        const element = document.createElement(tag);
        element.classList.add(className);
        parent.appendChild(element);
        return element;
    }

    return {
        createWithId,
        createWithClass
    }
};

export default modifyDom;