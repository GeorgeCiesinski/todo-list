import settings from "./settings"
import about from "./about"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom) {

    const settingsBuilder = settings(dom);
    const aboutBuilder = about(dom);

    const listsLinks = function createListsLinks(parent) {

    }

    // Create lists link
    const listsItem = function createListsNav(sidebar, listsIndex) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "lists", 
            className: "nav-item"
        });
        dom.createElement({
            parent: listItem,
            tag: "a",
            idName: "list-link",
            className: "nav-link",
            innerHTML: "Lists"
        });
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