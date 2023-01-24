import settings from "./settings"
import about from "./about"

/*
 *Builds the nav elements in the sidebar
 */
const navLinks = function createNavElements(dom, lists) {

    const settingsBuilder = settings(dom);
    const aboutBuilder = about(dom);
    let listUL = null;

    const listsLinks = function createListsLinks(listNavData) {
        dom.clearNav();
        listNavData.forEach(item => {
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
                        value: listNavData.indexOf(item)
                    }
                ]
            });
            if (listNavData.indexOf(item) === 0) {
                dom.addClass(listLink, 'active-list-link-items');
            }
            dom.clickEvent(listLink, lists.switchList);
        });
    }

    // Create lists link
    const listsItem = function createListsNav(sidebar, listNavData) {
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
        listUL = dom.createElement({
            parent: listItem,
            tag: 'ul',
            idName: 'list-items'
        });
        dom.addClass(listLink, 'active-nav-links');  // Set Lists as the active page
        dom.clickEvent(listLink, lists.showPage);
        dom.setNav(listUL);
        listsLinks(listNavData);  // Add list navigation under listLink
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
    const build = function buildSidebarNavLinks(sidebar, listNavData) {
        const navList = dom.createElement({parent: sidebar, tag: 'ul', idName: 'nav-list'});
        listsItem(navList, listNavData);
        settingsItem(navList);
        aboutItem(navList);
    }

    return {
        build
    }
}

export default navLinks;