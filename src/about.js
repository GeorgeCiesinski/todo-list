import aboutData from "./assets/data/about.json"

/*
 * Builds about page
 */
const aboutBuilder = function aboutBuilderFunctions(dom) {
    
    const aboutPage = dom.createElement({tag: 'div'});  // Base about dom element

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
            innerHTML: aboutData.info
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
        aboutData.credits.forEach(credit => {
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

export default aboutBuilder;