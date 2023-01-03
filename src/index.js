import './main.scss'
import baseLayout from './baseLayout';
import modifyDom from "./modifyDom";

const dom = modifyDom();  // Document Object Model Module used to construct pages
baseLayout(dom);  // Create base layout for site