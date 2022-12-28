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
        const logoText = "What TODO";
        const header = dom.createWithId({parent: document.body, tag: "header", idName: "site-header"});
        dom.createWithId({parent: header, tag: "h1", idName: "logo-text", innerHTML: logoText});
    }
    
    const createSidebar = function createSidebarElement(parent) {
        const sidebar = dom.createWithId({parent, tag: "div", idName: "sidebar"});
        // Add Nav
    }

    const createContent = function createContentElement(parent) {
        const tempContent = "content";
        dom.createWithId({parent, tag: "div", idName: "content", innerHTML: tempContent});
    }

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const appBody = dom.createWithId({parent: document.body, tag: "div", idName: "app-body"});
        createSidebar(appBody);
        createContent(appBody);
    }

    const createFooter = function createFooterElement() {
        const copyrightHTML = copyright();
        const footer = dom.createWithId({parent: document.body, tag: "footer", idName: "site-footer"}); 
        dom.createWithId({parent: footer, tag: "h3", idName: "copyright", innerHTML: copyrightHTML});
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