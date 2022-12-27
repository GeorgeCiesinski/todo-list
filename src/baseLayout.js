import modifyDom from "./modifyDom";

/*
Builds the base layout including: 
- Header
- App Body
- Footer
*/

const baseLayout = function createBaseLayoutElements() {

    const dom = modifyDom();

    const createHeader = function createHeaderElement() {
        // Element Data
        const data = {
            "parent": document.body,
            "tag": "header",
            "id": "site-header"
        }
        const element = dom.createWithId(data.parent, data.tag, data.id);
        element.innerText = data.id;  // Temp
    }
    
    const createSidebar = function createSidebarElement(parent) {
        const data = {
            "parent": parent,
            "tag": "div",
            "id": "sidebar"
        }
        const element = dom.createWithId(data.parent, data.tag, data.id);
        element.innerText = data.id;
    }

    const createContent = function createContentElement(parent) {
        const data = {
            "parent": parent,
            "tag": "div",
            "id": "content"
        }
        const element = dom.createWithId(data.parent, data.tag, data.id);
        element.innerText = data.id;
    }

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const data = {
            "parent": document.body,
            "tag": "div",
            "id": "app-body"
        }
        const element = dom.createWithId(data.parent, data.tag, data.id);
        element.innerText = data.id;
        createSidebar(element);
        createContent(element);
    }

    const createFooter = function createFooterElement() {
        const data = {
            "parent": document.body,
            "tag": "footer",
            "id": "site-footer"
        }
        const element = dom.createWithId(data.parent, data.tag, data.id);
        element.innerText = data.id;
    }
    
    // Creates all of the needed base elements
    const build = function buildBaseLayout() {
        createHeader();
        createAppBody();
        createFooter();
    }

    // Returns
    return {
        build
    }
};

export default baseLayout;