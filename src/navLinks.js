import settingsUtils from "./settingsUtils"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements() {

    const settings = settingsUtils();

    // Create lists link
    const listsItem = function createListsNav(dom, sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "lists", 
            className: "nav-item"
        });
        if (listItem.success) {
            dom.createElement({
                parent: listItem.element,
                tag: "a",
                idName: "list-link",
                className: "nav-link",
                innerHTML: "Lists"
            });
        }
    }

    // Create settings link
    const settingsItem = function createSettingsNav(dom, sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "settings", 
            className: "nav-item"
        });
        if (listItem.success) {
            const settingsLink = dom.createElement({
                parent: listItem.element,
                tag: "a",
                idName: "settings-link",
                className: "nav-link",
                innerHTML: "Settings"
            });
            settingsLink.element.addEventListener("click", settings.build);
        }
    }

    // Create about link
    const aboutItem = function createAboutNav(dom, sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "about", 
            className: "nav-item"
        });
        if (listItem.success) {
            dom.createElement({
                parent: listItem.element,
                tag: "a",
                idName: "about-link",
                className: "nav-link",
                innerHTML: "About"
            });
        }
    }

    const build = function buildSidebarNavLinks(dom, sidebar) {
        const navList = dom.createElement({parent: sidebar, tag: "ul", idName: "nav-list"});
        if (navList.success) {
            listsItem(dom, navList.element);
            settingsItem(dom, navList.element);
            aboutItem(dom, navList.element);
        }
    }

    return {
        build
    }
}

export default navLinks;