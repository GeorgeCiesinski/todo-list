// Nav elements within sidebar
const listsLinks = function listsLinksBuilderFunctions(dom, switchList) {

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
                    name: 'index',
                    value: itemIndex
                }
            ]
        });
        if (itemIndex === currentListIndex) {
            dom.addClass(listLink, 'active-list-link-items');
        }
        dom.clickEvent(listLink, switchList);
    }
    
    const build = function generateListLinksElements(listNavData, currentListIndex) {
        dom.clearNav();  // Clear existing navLinks
        listNavData.forEach(item => {
            createListItem(item, listNavData.indexOf(item), currentListIndex);
        });
    }

    return {
        build
    }
    
}

export default listsLinks;