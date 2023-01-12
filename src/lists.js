const listsBuilder = function listsBuilderFunctions(dom) {

    const listsPage = dom.createElement({tag: 'div'});
    const currentList = dom.createElement({tag: 'div'});

    // Builds page page
    const build = function buildAboutPage() {
        
    }

    // Shows built page
    const showPage = function switchPage() {
        dom.switchContent(listsPage.element);
    }

    return {
        showPage
    }
}

export default listsBuilder