import settings from "./settings"
import about from "./about"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom, lists) {

    const settingsBuilder = settings(dom);
    const aboutBuilder = about(dom);

    const navList = function navigateToListByIndex(event) {
        console.log(event.target);
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
                className: 'list-item-nav'
            });
            const listLink = dom.createElement({
                parent: listLI,
                tag: 'a',
                className: 'list-item-link',
                innerHTML: item,
                attributes: [
                    {
                        name: 'index',
                        value: listsIndex.indexOf(item)
                    }
                ]
            });
            dom.clickEvent(listLink, navList);  // 
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
        dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "list-link",
            className: "nav-link",
            innerHTML: "Lists"
        });
        listsLinks(listItem, listsIndex);
    }

    // Create settings link
    const settingsItem = function createSettingsNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "settings", 
            className: "nav-item"
        });
        const settingsLink = dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "settings-link",
            className: "nav-link",
            innerHTML: "Settings"
        });
        settingsLink.addEventListener("click", settingsBuilder.showPage);
    }

    // Create about link
    const aboutItem = function createAboutNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "about", 
            className: "nav-item"
        });
        const aboutLink = dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "about-link",
            className: "nav-link",
            innerHTML: "About"
        });
        aboutLink.addEventListener("click", aboutBuilder.showPage);
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