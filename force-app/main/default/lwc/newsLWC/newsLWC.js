import { LightningElement } from 'lwc';
import fetchNews from '@salesforce/apex/newsAPI.fetchNews';
export default class NewsLWC extends LightningElement {

    result = [];
    selectedNews = [];
    isModalOpen = false;
    get modalClass(){

        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open":""}`
    }
    get modalBackdropClass(){

        return this.isModalOpen ? "slds-backdrop slds-backdrop_open":"slds-backdrop"
    }


    connectedCallback(){
        this.news();
    }

    news(){
        fetchNews().then(response=>{
            console.log('rrrr',response);

            var res = response.articles;
            this.result = res.map((item,index)=>{
                let id = `new_${index+1}`;
                let date = new Date(item.publishedAt);
                let name = item.source.name;
                return {...item, id:id, name:name, date:date}

            })

        })
    }  
    showModal(event){
        let id = event.target.dataset.item;
        this.result.forEach(item=>{
            if(item.id === id){
                this.selectedNews = {...item}
            }
        })
        this.isModalOpen = true;
    } 
    closeModal(){
        this.isModalOpen = false;
    }
}