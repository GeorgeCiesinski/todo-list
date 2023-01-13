import { format } from 'date-fns'
import listsData from "./assets/data/default.json"

const listsUtilities = function listsUtilitiesFunctions(dom) {

    // Create Default List
    const createDefault = function createDefaultList() {
        const newList = listsData.lists;
        return newList;
    }

    // Array of Lists - Load lists or create new lists if don't exist
    let lists = JSON.parse(localStorage.getItem('lists')) || createDefault();

    const listsLength = function returnListsLength() {
        return lists.length;
    }

    const getList = function getListByIndex(index) {
        return lists[index];
    }

    // Save lists to local storage
    const saveLists = function saveListsToDLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    const loadLists = function loadListsFromLocalStorage() {
        lists = JSON.parse(localStorage.getItem('lists'));
    }

    return {
        saveLists,
        loadLists,
        listsLength,
        getList
    }
}

const listsBuilder = function listsBuilderFunctions(dom) {

    const util = listsUtilities(dom);

    const listsPage = dom.createElement(
        {
            tag: 'div',
            idName: 'lists-page'
        }
    );

    const listElement = dom.createElement(
        {
            parent: listsPage.element,
            tag: 'div',
            idName: 'list-element'
        }
    );

    const test = function test() {
        // const date = new Date(2022, 0, 5);
        // console.log(date.toString());
        // console.log(format(date, 'yyyy/MM/dd'));
        util.loadLists();
    }

    const clearCurrentList = function clearCurrentListElement() {
        dom.clearElement(listsPage.element);
    }

    const showList = function showListByIndex(index) {
        const currentList = util.getList(index);
        console.log(currentList);
        console.log(currentList.name);
    }

    // Shows lists page
    const showPage = function switchPage() {
        dom.switchContent(listsPage.element);
    }

    return {
        showList,
        showPage,
        test
    }
}

export default listsBuilder