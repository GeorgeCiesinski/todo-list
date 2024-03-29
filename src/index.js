import './scss/main.scss';
import modifyDom from './modifyDom';
import modalBuilder from './modal';
import navLinks from './navLinks';
import copyright from './copyright';
import lists from './lists';
import settings from './settings';
import about from './about';

/*
 * Builds the base layout:
 * - Header
 * - App Body
 * - Sidebar
 * - Nav
 * - Footer
 */
const baseLayout = function createBaseLayoutElements() {
    // Common Page Utilities
    const dom = modifyDom(); // Document Object Model Module used to construct pages
    const modal = modalBuilder(dom);

    // Pages
    const list = lists(dom, modal);
    const settingsBuilder = settings(dom, list);
    const aboutBuilder = about(dom);

    // Navbar
    const nav = navLinks(dom, list, settingsBuilder, aboutBuilder);

    const createHeader = function createHeaderElement() {
        const logoText = 'What To-do';
        const header = dom.createElement({
            parent: document.body,
            tag: 'header',
            idName: 'site-header',
        });
        dom.createElement({
            parent: header,
            tag: 'h1',
            idName: 'logo-text',
            innerHTML: logoText,
        });
    };

    const createSidebar = function createSidebarElement(parent) {
        const sidebar = dom.createElement({
            parent,
            tag: 'div',
            idName: 'sidebar',
        });
        // Add Nav if sidebar was successfully created
        nav.build(sidebar);
    };

    // Empty content div
    const createContent = function createContentElement(parent) {
        const content = dom.createElement({
            parent,
            tag: 'div',
            idName: 'content',
        });
        dom.setContent(content);
    };

    const createRight = function createRightSideElement(parent) {
        dom.createElement({
            parent,
            tag: 'div',
            idName: 'right',
        });
    };

    // Create App Body and append sidebar and content
    const createAppBody = function createAppBodyElement() {
        const appBody = dom.createElement({
            parent: document.body,
            tag: 'div',
            idName: 'app-body',
        });
        createSidebar(appBody);
        createContent(appBody);
        createRight(appBody);
    };

    const createFooter = function createFooterElement() {
        const copyrightHTML = copyright(); // Generate current year copyright message
        const footer = dom.createElement({
            parent: document.body,
            tag: 'footer',
            idName: 'site-footer',
        });
        dom.createElement({
            parent: footer,
            tag: 'h3',
            idName: 'copyright',
            innerHTML: copyrightHTML,
        });
    };

    // Build Page
    const build = function buildBaseLayout() {
        createHeader();
        createAppBody();
        createFooter();
        list.showPage(); // Populate content with lists pages
    };

    return {
        build,
    };
};

const layout = baseLayout();
layout.build(); // Create base layout for site
