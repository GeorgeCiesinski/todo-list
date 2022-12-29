/*
Builds the nav elements in the sidebar
*/
const navLinks = function createNavElements() {

    const lists = function createListsNav(dom, sidebar) {
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

    const settings = function createSettingsNav(dom, sidebar) {
        const listItem = dom.createElement({
            parent: sidebar, 
            tag: "li", 
            idName: "settings", 
            className: "nav-item"
        });
        if (listItem.success) {
            dom.createElement({
                parent: listItem.element,
                tag: "a",
                idName: "settings-link",
                className: "nav-link",
                innerHTML: "Settings"
            });
        }
    }

    const about = function createAboutNav(dom, sidebar) {
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
            lists(dom, navList.element);
            settings(dom, navList.element);
            about(dom, navList.element);
        }
    }

    return {
        build
    }
}

export default navLinks;