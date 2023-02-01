/*
 * Builds Links to Available Lists
 * 
 */
const listsLinks = function listsLinksBuilderFunctions(dom, util, switchList) {

    const createListItem = function createListFunctionElements(item, itemIndex, currentListIndex) {
        const listLI = dom.createElement({
            parent: dom.getNavElement(),
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
                    name: 'list',
                    value: itemIndex
                }
            ]
        });
        if (itemIndex === currentListIndex) {
            dom.addClass(listLink, 'active-list-link-items');
        }
        dom.clickEvent(listLink, switchList);
    }
    
    const build = function generateListLinksElements() {
        dom.clearNav();  // Clear existing navLinks
        const listNavData = util.listNavData();
        const current = util.getCurrent();
        listNavData.forEach(item => {
            createListItem(item, listNavData.indexOf(item), current.index);
        });
    }

    return {
        build
    }
    
}

export default listsLinks;