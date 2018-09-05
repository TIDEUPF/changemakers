import * as Polyglot from "node-polyglot";
import * as en from "./langs/en";
import * as es from "./langs/es";
import * as fr from "./langs/fr";
import * as pt from "./langs/pt";
import * as el from "./langs/el";
import * as no from "./langs/no";

const text_data = {
    "en" : en.data,
    "es" : es.data,
    "fr" : fr.data,
    "pt" : pt.data,
    "el" : el.data,
    "no" : no.data,
}

let polyglot = new Polyglot();

export const i18n = {
    /**
     * This method allow you to switch language during runtime, language argument should be the same as your data file name 
     * such as when language is 'zh', it will load your 'zh.js' data source.
     * @method init 
     * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
     */
    init : function(language) {
        let data = text_data[language];
        polyglot.replace(data);
    },
    /**
     * this method takes a text key as input, and return the localized string
     * Please read https://github.com/airbnb/polyglot.js for details
     * @method t
     * @return {String} localized string
     * @example
     * 
     * var myText = i18n.t('MY_TEXT_KEY');
     * 
     * // if your data source is defined as 
     * // {"hello_name": "Hello, %{name}"}
     * // you can use the following to interpolate the text 
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */    
    t : function (key, opt?) {
        return polyglot.t(key, opt);
    }
};