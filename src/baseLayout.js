import modifyDom from "./modifyDom";
import navLinks from "./navLinks";
import copyright from "./copyright";

/*
Builds the base layout including: 
- Header
- App Body
- Footer
*/

const baseLayout = function createBaseLayoutElements() {

    const dom = modifyDom();
    const nav = navLinks();

    const createHeader = function createHeaderElement() {
        const logoText = "What TODO";
        const header = dom.createElement({
            parent: document.body, 
            tag: "header", 
            idName: "site-header"
        });
        if (header.success) {
            dom.createElement({
                parent: header.element, 
                tag: "h1", 
                idName: "logo-text", 
                innerHTML: logoText
            });
        }
        
    }
    
    const createSidebar = function createSidebarElement(parent) {
        const sidebar = dom.createElement({
            parent, 
            tag: "div", 
            idName: "sidebar"
        });
        // Add Nav if sidebar was successfully created
        if (sidebar.success) {
            nav.build(dom, sidebar.element);
        }
        
    }

    const createContent = function createContentElement(parent) {
        const tempContent = "content";
        dom.createElement({
            parent, 
            tag: "div", 
            idName: "content", 
            innerHTML: tempContent
        });
    }

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const appBody = dom.createElement({
            parent: document.body, 
            tag: "div", 
            idName: "app-body"
        });
        if (appBody.success) {
            createSidebar(appBody.element);
            createContent(appBody.element);
        }
    }

    const createFooter = function createFooterElement() {
        const copyrightHTML = copyright();
        const footer = dom.createElement({
            parent: document.body, 
            tag: "footer", 
            idName: "site-footer"
        }); 
        if (footer.success) {
            dom.createElement({
                parent: footer.element, 
                tag: "h3", 
                idName: "copyright", 
                innerHTML: copyrightHTML
            });
        }
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