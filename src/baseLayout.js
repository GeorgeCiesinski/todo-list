import navLinks from "./navLinks"
import copyright from "./copyright"
import lists from "./lists"

/*
 *Builds the base layout: 
 * - Header
 * - App Body
 * - Sidebar
 * - Nav
 * - Footer
 */
const baseLayout = function createBaseLayoutElements(dom) {

    const nav = navLinks(dom);  // Navbar
    const list = lists(dom);

    const createHeader = function createHeaderElement() {
        const logoText = 'What TODO';
        const header = dom.createElement({
            parent: document.body, 
            tag: 'header', 
            idName: 'site-header'
        });
        if (header.success) {
            dom.createElement({
                parent: header.element, 
                tag: 'h1', 
                idName: 'logo-text', 
                innerHTML: logoText
            });
        }
    }
    
    const createSidebar = function createSidebarElement(parent) {
        const sidebar = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'sidebar'
        });
        // Add Nav if sidebar was successfully created
        if (sidebar.success) {
            nav.build(sidebar.element, list.listIndex);
        }
        
    }

    // Empty content div
    const createContent = function createContentElement(parent) {
        const content = dom.createElement({
            parent, 
            tag: 'div', 
            idName: 'content'
        });
        dom.setContent(content.element);
        list.showPage();  // Populate content with lists page
        list.showList(0);  // Show first list in array
        list.createEventListeners();  // Event Listeners
    }

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const appBody = dom.createElement({
            parent: document.body, 
            tag: 'div', 
            idName: 'app-body'
        });
        if (appBody.success) {
            createSidebar(appBody.element);
            createContent(appBody.element);
        }
    }

    const createFooter = function createFooterElement() {
        const copyrightHTML = copyright();  // Generate current year copyright message
        const footer = dom.createElement({
            parent: document.body, 
            tag: 'footer', 
            idName: 'site-footer'
        }); 
        if (footer.success) {
            dom.createElement({
                parent: footer.element, 
                tag: 'h3', 
                idName: 'copyright', 
                innerHTML: copyrightHTML
            });
        }
    }
    
    // Build Page
    const build = function buildBaseLayout() {
        createHeader();
        createAppBody();
        createFooter();
    }

    // Build on load
    build();
};

export default baseLayout;