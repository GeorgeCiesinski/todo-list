import settings from "./settings"
import about from "./about"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom) {

    const settingsBuilder = settings(dom);
    const aboutBuilder = about(dom);

    // Create lists link
    const listsItem = function createListsNav(sidebar) {
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
    const settingsItem = function createSettingsNav(sidebar) {
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
            settingsLink.element.addEventListener("click", settingsBuilder.showPage);
        }
    }

    // Create about link
    const aboutItem = function createAboutNav(sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "about", 
            className: "nav-item"
        });
        if (listItem.success) {
            const aboutLink = dom.createElement({
                parent: listItem.element,
                tag: "a",
                idName: "about-link",
                className: "nav-link",
                innerHTML: "About"
            });
            aboutLink.element.addEventListener("click", aboutBuilder.showPage);
        }
    }

    // Build page
    const build = function buildSidebarNavLinks(sidebar) {
        const navList = dom.createElement({parent: sidebar, tag: "ul", idName: "nav-list"});
        if (navList.success) {
            listsItem(navList.element);
            settingsItem(navList.element);
            aboutItem(navList.element);
        }
    }

    return {
        build
    }
}

export default navLinks;