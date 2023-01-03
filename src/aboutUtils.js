import credits from "./assets/data/credits.json"

/*
 * Builds about page
 */
const aboutUtils = function aboutUtilityFunctions(dom) {
    
    // Empty About Page
    const aboutPage = dom.createElement({tag: 'div'});  // Base settings dom element

    /*
     * Headers
     */

    // Page Title
    const createTitle = function createTitleHeader() {
        dom.createElement({
            parent: aboutPage.element,
            tag: 'h2',
            innerHTML: "About"
        });
    }

   /* Credits
    * Creates a credits section by looping through credits.json
    * and adding a list item for each entry. 
    */
    const createCredits = function createCreditSection() {
        const creditsDiv = dom.createElement({
            parent: aboutPage.element,
            tag: 'div',
        });
        dom.createElement({
            parent: creditsDiv.element,
            tag: 'h3',
            innerHTML: "Credits"
        });
        // Unordered List
        const list = dom.createElement({
            parent: creditsDiv.element,
            tag: 'ul'
        });
        // Loop through credits.json and add contents as list items
        credits.credits.forEach(credit => {
            dom.createElement({
                parent: list.element,
                tag: "li",
                innerHTML: credit.innerHTML
            });
        });
    }

    // Builds page page
    const build = function buildAboutPage() {
        createTitle();
        createCredits();
    }

    // Shows built page
    const showPage = function switchPage() {
        dom.switchContent(aboutPage.element);
    }

    build();

    return {
        showPage
    }
}

export default aboutUtils;