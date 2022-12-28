import modifyDom from "./modifyDom";
import copyright from "./copyright";

/*
Builds the base layout including: 
- Header
- App Body
- Footer
*/

const baseLayout = function createBaseLayoutElements() {

    const dom = modifyDom();

    const createHeader = function createHeaderElement() {
        const header = dom.createWithId(document.body, "header", "site-header");
        const logoText = dom.createWithId(header, "h1", "logo-text");
        logoText.innerText = "What TODO";
    }
    
    const createSidebar = function createSidebarElement(parent) {
        const sidebar = dom.createWithId(parent, "div", "sidebar");
        sidebar.innerText = "sidebar";
    }

    const createContent = function createContentElement(parent) {
        const content = dom.createWithId(parent, "div", "content");
        content.innerText = "content";
    }

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const appBody = dom.createWithId(document.body, "div", "app-body");
        createSidebar(appBody);
        createContent(appBody);
    }

    const createFooter = function createFooterElement() {
        const footer = dom.createWithId(document.body, "footer", "site-footer"); 
        const h3 = dom.createWithId(footer, "h3", "copyright");
        h3.innerHTML = copyright();
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