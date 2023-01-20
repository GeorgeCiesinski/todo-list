import settings from "./settings"
import about from "./about"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom, lists) {

    const settingsBuilder = settings(dom);
    const aboutBuilder = about(dom);

    const listNavigation = function navigateToListByIndex(event) {
        lists.showList(event.target.getAttribute('index'));
    }

    const listsLinks = function createListsLinks(parent, listsIndex) {
        const listUL = dom.createElement({
            parent,
            tag: 'ul',
            idName: 'list-items'
        });
        listsIndex.forEach(item => {
            const listLI = dom.createElement({
                parent: listUL,
                tag: 'li',
                className: 'list-nav-items'
            });
            const listLink = dom.createElement({
                parent: listLI,
                tag: 'a',
                className: 'list-link-items',
                innerHTML: item,
                attributes: [
                    {
                        name: 'index',
                        value: listsIndex.indexOf(item)
                    }
                ]
            });
            dom.clickEvent(listLink, listNavigation);
        });
    }

    // Create lists link
    const listsItem = function createListsNav(sidebar, listsIndex) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "lists", 
            className: "nav-items"
        });
        const listLink = dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "list-link",
            className: "nav-links",
            innerHTML: "Lists"
        });
        listsLinks(listItem, listsIndex);
        dom.clickEvent(listLink, lists.showPage);
    }

    // Create settings link
    const settingsItem = function createSettingsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "settings", 
            className: "nav-items"
        });
        const settingsLink = dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "settings-link",
            className: "nav-links",
            innerHTML: "Settings"
        });
        dom.clickEvent(settingsLink, settingsBuilder.showPage);
    }

    // Create about link
    const aboutItem = function createAboutNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "about", 
            className: "nav-items"
        });
        const aboutLink = dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "about-link",
            className: "nav-links",
            innerHTML: "About"
        });
        dom.clickEvent(aboutLink, aboutBuilder.showPage);
    }

    // Build page
    const build = function buildSidebarNavLinks(sidebar, listIndex) {
        const navList = dom.createElement({parent: sidebar, tag: "ul", idName: "nav-list"});
        listsItem(navList, listIndex);
        settingsItem(navList);
        aboutItem(navList);
    }

    return {
        build
    }
}

export default navLinks;