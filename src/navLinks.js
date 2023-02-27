/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom, lists, settingsBuilder, aboutBuilder) {

    // Creates add lists link
    const addLists = function createAddListsElements(parent) {
        const addListLink = dom.createElement({
            parent,
            tag: 'a',
            className: 'add-list-link',
            innerHTML: '<span class="material-symbols-rounded">add</span><label>New List</label>'
        });
        dom.clickEvent(addListLink, lists.switchAndCreate);
    }

    // Creates an unordered list and sets it as the Nav element in dom
    const listsList = function createListsUnorderedList(parent) {
        const listUL = dom.createElement({
            parent,
            tag: 'ul',
            idName: 'list-items'
        });
        dom.setNavElement(listUL);
    }

    // Create lists link
    const listsItem = function createListsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: 'li', 
            idName: 'lists', 
            className: 'nav-items'
        });
        const listLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'list-link',
            className: 'nav-links',
            innerHTML: 'Lists'
        });
        dom.addClass(listLink, 'active-nav-links');  // Set Lists as the active page
        dom.clickEvent(listLink, lists.showPage);
        const collapseDiv = dom.createElement({
            parent: listItem, 
            tag: 'div', 
            className: 'collapse'
        });
        // Add List Link
        addLists(collapseDiv);
        // Links to existing lists
        listsList(collapseDiv);
    }

    // Create settings link
    const settingsItem = function createSettingsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: 'li', 
            idName: 'settings', 
            className: 'nav-items'
        });
        const settingsLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'settings-link',
            className: 'nav-links',
            innerHTML: 'Settings'
        });
        dom.clickEvent(settingsLink, settingsBuilder.showPage);
    }

    // Create about link
    const aboutItem = function createAboutNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: 'li', 
            idName: 'about', 
            className: 'nav-items'
        });
        const aboutLink = dom.createElement({
            parent: listItem,
            tag: 'a',
            idName: 'about-link',
            className: 'nav-links',
            innerHTML: 'About'
        });
        dom.clickEvent(aboutLink, aboutBuilder.showPage);
    }

    // Build page
    const build = function buildSidebarNavLinks(sidebar) {
        const navList = dom.createElement({parent: sidebar, tag: 'ul', idName: 'nav-list'});
        listsItem(navList);
        settingsItem(navList);
        aboutItem(navList);
    }

    return {
        build
    }
}

export default navLinks;