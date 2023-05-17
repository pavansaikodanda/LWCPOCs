import { LightningElement } from 'lwc';

const GET_LANG_RAPIDAPI_URL = "https://text-translator2.p.rapidapi.com/getLanguages";

export default class TranslateLWC extends LightningElement {

    languagesList = [];

    connectedCallback(){

        fetch()
    }
}