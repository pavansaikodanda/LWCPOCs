import { LightningElement } from 'lwc';
import { generateUrl } from "lightning/fileDownload";
export default class DownloadLWC extends LightningElement {

  recordId;


  handleClick() {
    const url = generateUrl(recordId);
    console.log('url',url);
    window.open(url);   
  }
}
