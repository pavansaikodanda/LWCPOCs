import { LightningElement, track } from 'lwc';

const RAIPIDAPI_TRANSLATE_LANG_URL = 'https://text-translator2.p.rapidapi.com/';
const RAPIDAPI_SPEECH_URL = 'https://text-to-speech27.p.rapidapi.com/speech';

export default class TranslateLWC extends LightningElement {
  @track languagesList = {};
  sourceLanguageCode;
  targetLanguageCode;
  translatedText;
  speechLanguagesCodeList = [];
  translateLanguagesCodeList = [];
  targetLanguageAvailable = false;
  sourceLanguageAvailable = false;

  connectedCallback () {
    fetch(RAIPIDAPI_TRANSLATE_LANG_URL + 'getLanguages', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        const languages = data.data.languages;
        this.languagesList = languages.map(language => ({
          label: language.name,
          value: language.code
        }));
        this.translateLanguagesCodeList = Object.keys(this.languagesList);
      })
      .catch(error => {
        console.log(error);
      });

    // fetch (RAPIDAPI_SPEECH_URL+'/lang',{
    //   method: "GET",
    //   headers: {
    //     'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
    //     'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com'
    //   }
    // }).then(response => response.json())
    // .then(data =>{
    //   console.log('Data',data);
    //   this.speechLanguagesList = Object.keys(data);
    //   console.log('Speech Data',this.speechLanguagesList);
    // })
    // .catch(error =>{
    //   console.log('ErrorSpeech',error);
    // });
  }

  handleSourceLanguageChange (event) {
    this.sourceLanguageCode = event.target.value;
  }
  
  handleTargetLanguageChange (event) {
    this.targetLanguageCode = event.target.value;
  }

  handleTranslateLanguage () {
    const textToBeConverted =
      this.template.querySelector('.textToBeConverted').value;
    fetch(RAIPIDAPI_TRANSLATE_LANG_URL + 'translate', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
        source_language: this.sourceLanguageCode,
        target_language: this.targetLanguageCode,
        text: textToBeConverted
      })
    })
      .then(response => response.json())
      .then(data => {
        this.translatedText = data.data.translatedText;
      });
  }

  handleSourceLanguageSpeech () {
    const textToSpeak = this.template.querySelector('.textToBeConverted').value;
    const requestURL = RAPIDAPI_SPEECH_URL + `?text=${encodeURIComponent(textToSpeak)}&lang=${this.sourceLanguageCode}`;
    fetch(requestURL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
        'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com'
      }
    })
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        const audio = new Audio();
        audio.src = url;
        audio.play();
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  handleTargetLanguageSpeech () {
    const textToSpeak = this.template.querySelector('.ConvertedText').value;
    const requestURL = RAPIDAPI_SPEECH_URL + `?text=${encodeURIComponent(textToSpeak)}&lang=${this.targetLanguageCode}`;
    fetch(requestURL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
        'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com'
      }
    })
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        const audio = new Audio();
        audio.src = url;
        audio.play();
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}