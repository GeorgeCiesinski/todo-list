/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(
    dom,
    lists,
    settingsBuilder,
    aboutBuilder
) {
    const createSelectButton = function createSelectButtonElement(parent) {
        const collapseButton = dom.createElement({
            parent,
            tag: 'button',
            className: 'list-collapse',
            innerHTML:
                'Select <span class="material-symbols-rounded">expand_more</span>',
        });
        dom.clickEvent(collapseButton, dom.createCollapseNav);
    };

    const createAddLists = function createAddListsElements(parent) {
        const addListLink = dom.createElement({
            parent,
            tag: 'a',
            className: 'add-list-link',
            innerHTML:
                '<span class="material-symbols-rounded">add</span>New List',
        });
        dom.clickEvent(addListLink, lists.switchAndCreate);
    };

    // Creates an unordered list and sets it as the Nav element in dom
    const createListsList = function createListsUnorderedList(parent) {
        const listUL = dom.createElement({
            parent,
            tag: 'ul',
            idName: 'list-items',
        });
        dom.setNavElement(listUL);
    };

    const createCollapseDiv = function createCollapseDivElement(parent) {
        const collapseDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'collapse',
        });
        createAddLists(collapseDiv);
        createListsList(collapseDiv);
    };

    const createListsItem = function createListsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar,
            tag: 'li',
            idName: 'lists',
            className: 'nav-items',
        });
        const listLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'list-link',
            className: 'nav-links',
            innerHTML: 'Lists',
        });
        const listMenu = dom.createElement({
            parent: listItem,
            tag: 'div',
            className: 'list-menu',
        });
        dom.addClass(listLink, 'active-nav-links');
        dom.clickEvent(listLink, lists.showPage);
        createSelectButton(listMenu);
        createCollapseDiv(listMenu);
    };

    const createSettingsItem = function createSettingsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar,
            tag: 'li',
            idName: 'settings',
            className: 'nav-items',
        });
        const settingsLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'settings-link',
            className: 'nav-links',
            innerHTML: 'Settings',
        });
        dom.clickEvent(settingsLink, settingsBuilder.showPage);
    };

    const createAboutItem = function createAboutNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar,
            tag: 'li',
            idName: 'about',
            className: 'nav-items',
        });
        const aboutLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'about-link',
            className: 'nav-links',
            innerHTML: 'About',
        });
        dom.clickEvent(aboutLink, aboutBuilder.showPage);
    };

    const createBar = function createBarElement(parent) {
        dom.createElement({
            parent,
            tag: 'span',
            className: 'bar',
        });
    };

    const createHamburger = function createHamburgerElement(parent) {
        const hamburgerDiv = dom.createElement({
            parent,
            tag: 'div',
            className: 'hamburger',
        });
        for (let i = 0; i < 3; i += 1) {
            createBar(hamburgerDiv);
        }
        dom.clickEvent(hamburgerDiv, dom.createCollapseNav);
    };

    const build = function buildSidebarNavLinks(sidebar) {
        createHamburger(sidebar);
        const navList = dom.createElement({
            parent: sidebar,
            tag: 'ul',
            idName: 'nav-list',
        });
        createListsItem(navList);
        createSettingsItem(navList);
        createAboutItem(navList);
    };

    return {
        build,
    };
};

export default navLinks;
