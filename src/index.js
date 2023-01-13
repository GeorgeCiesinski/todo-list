import './main.scss'
import baseLayout from './baseLayout';
import modifyDom from "./modifyDom";
// import listsBuilder from "./lists"

const dom = modifyDom();  // Document Object Model Module used to construct pages
baseLayout(dom);  // Create base layout for site


// const lists = listsBuilder(dom);
// lists.test();