// Nav elements within sidebar
const listsLinks = function listsLinksBuilderFunctions(dom, switchList) {

    const createListItem = function createListFunctionElements(listNavData, item) {
        const listLI = dom.createElement({
            parent: dom.getNav(),
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
        dom.clickEvent(listLink, switchList);
    }
    
    const build = function generateListLinksElements(listNavData) {
        dom.clearNav();  // Clear existing navLinks
        listNavData.forEach(item => {
            createListItem(listNavData, item);
        });
    }

    return {
        build
    }
    
}

export default listsLinks;