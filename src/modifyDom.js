/*
 * Contains all functions that modify DOM
 */
const modifyDom = function modifyDomElements() {
    let nav = null; // Nav element
    let content = null; // Content element
    let list = null; // List element

    /* Set attribute for a given element
     *
     * - Params -
     * element: A DOM element
     * attribute: An array containing objects with attribute name and value
     *      {
     *          name: The name of the attribute to add
     *          value: The value of the attribute
     *      }
     */
    const addAttributes = function addAttributesToElement(element, attribute) {
        const { name, value } = attribute;
        try {
            element.setAttribute(name, value);
        } catch (err) {
            console.error('Failed to add attribute to element.', err);
        }
    };

    /*
     * Creates a new element, adds attributes, and appends to parent if provided.
     *
     * - Params -
     * parent: Parent element. Appends new element to parent if provided.
     * tag(required): The new element is created using the provided tag.
     * idName: Adds id if provided.
     * className: Adds class if provided.
     * innerHTML: Adds innerHTML if provided.
     * href: Adds href if the tag is an anchor. If no href provided, 'href="#"` will be added instead.
     *
     * - Returns -
     * {
     *      success: true/false,
     *      element: (element) if success === true
     * }
     */
    const createElement = function createNewDomElement(
        { parent, tag, idName, className, innerHTML, href, attributes } = {
            attributes: {},
        }
    ) {
        const result = {};

        // If parent and tag are provided, create element
        if (tag) {
            const element = document.createElement(tag);
            // Append to parent if provided
            if (parent) {
                parent.appendChild(element);
            }
            // Add optional values
            if (idName) {
                element.id = idName;
            }
            if (className) {
                element.classList.add(className);
            }
            if (innerHTML) {
                element.innerHTML = innerHTML;
            }
            if (href) {
                element.href = href;
            }
            if (attributes) {
                attributes.forEach((attribute) =>
                    addAttributes(element, attribute)
                );
            }
            result.success = true;
            result.element = element;
        } else {
            console.error('Unable to create element without a tag.');
            result.success = false;
        }

        if (result.success) {
            return result.element;
        }

        return null; // Return null if failed
    };

    const removeElement = function removeDomElement(element) {
        element.remove();
    };

    /*
     * Element Classes
     */

    // Add class to an element
    const addClass = function addClassToElement(element, className) {
        element.classList.add(className);
    };

    // Remove class from an element
    const removeClass = function addClassToElement(element, className) {
        element.classList.remove(className);
    };

    // Remove active class from previous elements and add to new element
    const switchActiveClass = function switchActiveClassForElement(
        element,
        className
    ) {
        const activeItems = document.querySelectorAll(`.${className}`);
        activeItems.forEach((item) => removeClass(item, className));
        addClass(element, className);
    };

    /*
     * Set and Get Elements
     */

    // Sets nav element when it is first created
    const setNavElement = function setNavElementDomNode(element) {
        nav = element;
    };

    const getNavElement = function getNavElementDomNode() {
        if (nav) {
            return nav;
        }
        return null;
    };

    // Sets content element when it is first created
    const setContent = function setContentDomNode(element) {
        content = element;
    };

    // Sets list element when it is first created
    const setListElement = function setListElementDomNode(element) {
        list = element;
    };

    const getListElement = function getListElementDomNode() {
        if (list) {
            return list;
        }
        return null;
    };

    /*
     * Update Content
     */

    // Remove children from parent element
    const clearElement = function clearElementsFromParent(element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    };

    // Clears list for rebuild
    const clearNav = function clearNavElement() {
        clearElement(nav);
    };

    // Clears list for rebuild
    const clearList = function clearListElement() {
        clearElement(list);
    };

    // Switch which element is the active Nav link
    const switchNavLinks = function switchNavLinksActiveClass(element) {
        const activeClass = 'active-nav-links';
        switchActiveClass(element, activeClass);
    };

    // Switch which element is the active List link
    const switchListLinks = function switchNavLinksActiveClass(element) {
        const activeClass = 'active-list-link-items';
        switchActiveClass(element, activeClass);
    };

    // Appends element to content div
    const switchContent = function switchContentWithNewElement(element) {
        clearElement(content);
        content.appendChild(element);
    };

    /*
     * Modify CSS
     */

    // Adds color variables to CSS
    const setPalette = function setPaletteCSS(palette) {
        Object.entries(palette).forEach((entry) => {
            const [step, color] = entry;
            document.documentElement.style.setProperty(
                `--color-primary-${step}`,
                color
            );
        });
    };

    // Adds font variable to CSS
    const setFont = function setFontColorCSS(fontColor) {
        document.documentElement.style.setProperty('--font-color', fontColor);
    };

    /*
     * Create Events
     */

    // Adds a click event listener to an element
    const clickEvent = function createClickEventListener(element, action) {
        element.addEventListener('click', action);
    };

    const keyUpEvent = function createKeyUpEvent(element, action) {
        element.addEventListener('keyup', action);
    };

    const changeEvent = function createChangeEventListener(element, action) {
        element.addEventListener('change', action);
    };

    /*
     * Actions - Called by events
     */

    // Collapse todo item content
    const collapseContent = function collapseContentElement(event) {
        const { currentTarget } = event;
        if (currentTarget.classList.contains('collapsed')) {
            currentTarget.classList.remove('collapsed');
            currentTarget.classList.add('visible');
            currentTarget.innerHTML =
                '<span class="material-symbols-rounded">expand_less</span>'; // Change to minus icon
        } else if (currentTarget.classList.contains('visible')) {
            currentTarget.classList.remove('visible');
            currentTarget.classList.add('collapsed');
            currentTarget.innerHTML =
                '<span class="material-symbols-rounded">expand_more</span>'; // Change to plus icon
        }
        // Get 'collapsible-todo-elements' which is a sibling of parent 'visible-todo-elements'
        const contentElement =
            currentTarget.parentNode.parentNode.nextElementSibling;
        // Toggle collapse
        if (contentElement.style.display === 'block') {
            contentElement.style.display = 'none';
        } else {
            contentElement.style.display = 'block';
        }
    };

    // Adds event listener to each todo item - collapses content
    const createCollapse = function createCollapseEventListener() {
        // Get collapseButtons with event=false attribute
        const collapseButtons = document.querySelectorAll(
            '.collapse-buttons[event="false"]'
        );
        collapseButtons.forEach((button) => {
            button.setAttribute('event', true);
            clickEvent(button, collapseContent);
        });
    };

    const createCollapseNav = function createCollapseNavEventListener() {
        this.classList.toggle('active');
        const dropdownContent = this.nextElementSibling;
        dropdownContent.classList.toggle('visible');
    };

    // Close collapsible menu elements upon selection
    const closeMenus = function closeMenusAfterSelection() {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('#nav-list');
        const select = document.querySelector('.collapse');
        hamburger.classList.remove('active');
        navList.classList.remove('visible');
        select.classList.remove('visible');
    };

    return {
        createElement,
        removeElement,
        addClass,
        setNavElement,
        getNavElement,
        setContent,
        setListElement,
        getListElement,
        clearNav,
        clearList,
        switchNavLinks,
        switchContent,
        switchListLinks,
        setPalette,
        setFont,
        clickEvent,
        keyUpEvent,
        changeEvent,
        createCollapse,
        createCollapseNav,
        closeMenus,
    };
};

export default modifyDom;
