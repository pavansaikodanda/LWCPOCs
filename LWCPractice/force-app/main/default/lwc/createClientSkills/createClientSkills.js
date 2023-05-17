import { LightningElement, wire, api } from 'lwc';
import getSkills from '@salesforce/apex/lwcClientSkillsController.getSkills';
import createClientSkills from '@salesforce/apex/lwcClientSkillsController.createClientSkills';
import getClientSkills from '@salesforce/apex/lwcClientSkillsController.getClientSkills';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class CreateClientSkills extends LightningElement {
 @api recordId;
  skillsData = [];
  rawSkillsData = [];
  clientSkills = [];

  connectedCallback() {
    Promise.all([
      getSkills(),
      getClientSkills({ contactId: this.recordId })
    ])
    .then(([skillsData, clientSkills]) => {
      this.rawSkillsData = skillsData;
      this.clientSkills = clientSkills;
      this.refreshSkillsData();
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });
  }

  refreshSkillsData() {
    if (!this.rawSkillsData || !this.clientSkills) {
      return;
    }

    this.skillsData = [];
    for(let key in this.rawSkillsData) {
      let selectedValues = this.rawSkillsData[key].filter(skill => this.clientSkills.includes(skill.Id)).map(skill => skill.Id);
      this.skillsData.push({
        label: key,
        skills: this.rawSkillsData[key].map(skill => ({ label: skill.Name, value: skill.Id })),
        selectedValues: selectedValues
      });
    }
  }


handleChange(event) {
    const category = event.target.dataset.category;
    const categoryData = this.skillsData.find(cat => cat.label === category);
    if (categoryData) {
        categoryData.selectedValues = event.detail.value;
    }
    console.log(`Selected values are: ${categoryData}`);
}



save() {
    console.log('save method called');
    let skillIds = [];
    this.skillsData.forEach(category => {
        skillIds = [...skillIds, ...category.selectedValues];
    });

    createClientSkills({ contactId: this.recordId, skillIds: skillIds })
        .then(result => {
            console.log('INSIDE');
            const event = new ShowToastEvent({
                title: "Success",
                message: "Client Skills created successfully",
                variant: "success"
            });
            // Dispatch the event
            this.dispatchEvent(event);
        })
        .catch(error => {
            console.log('error')
            console.log('error',error);
            const event = new ShowToastEvent({
                title: "Error",
                message: error.body.message,
                variant: "error"
            });
            // Dispatch the event
            this.dispatchEvent(event);
        });
}

    
}