import about from "./assets/data/about.json"

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

    // App Info
    const createInfo = function createInfoDiv() {
        const infoDiv = dom.createElement({
            parent: aboutPage.element,
            tag: 'div',
        });
        dom.createElement({
            parent: infoDiv.element,
            tag: 'p',
            innerHTML: about.info
        });
    }

   /* Credits
    * Creates a credits section by looping through credits.json
    * and adding a list item for each entry. 
    */
    const createCredits = function createCreditSection() {
        dom.createElement({
            parent: aboutPage.element,
            tag: 'h3',
            innerHTML: "Credits"
        });
        const creditsDiv = dom.createElement({
            parent: aboutPage.element,
            tag: 'div',
        });
        // Unordered List
        const list = dom.createElement({
            parent: creditsDiv.element,
            tag: 'ul'
        });
        // Loop through credits.json and add contents as list items
        about.credits.forEach(credit => {
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
        createInfo();
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