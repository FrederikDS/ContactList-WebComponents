import store from "../store/index.js";

const ContactFormTemplate = document.createElement('template'); 
ContactFormTemplate.innerHTML=`
    <form>
        <label for="input-first-name">First Name</label>
        <input type="text" id="input-first-name" autocomplete="off"/>
        <br>
        <label for="input-last-name">Last Name</label>
        <input type="text" id="input-last-name" autocomplete="off">
        <br>
        <button>Save</button>
    </form>
`;

class ContactForm extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open'}); 
        this.shadowRoot.appendChild(ContactFormTemplate.content.cloneNode(true)); 

        this.$saveButton = this.shadowRoot.querySelector('button'); 
        console.log(this.$saveButton.innerHTML); 
        this.$saveButton.addEventListener('click', (e) => this._saveContact(e));

    }

    connectedCallback(){
        console.log('ContactForm entered the DOM'); 
    }

    disconnectedCallback(){
        console.log('ContactForm left the DOM'); 
    }

    _render(){
        //do we need a render as the form is a provider?
    }

    _saveContact(e){
        //prevent default event behavior, reloading the page
        e.preventDefault(); 

        //get the inputs
        const inputFisrtName = this.shadowRoot.querySelector('#input-first-name'); 
        const inputLastName = this.shadowRoot.querySelector('#input-last-name');
        
        let contactDetails = {
            firstName: inputFisrtName.value.trim(), 
            lastName: inputLastName.value.trim()   
        }

        //basic input length check
        if( contactDetails.firstName.length > 0 && contactDetails.lastName.length > 0 ){
            
            //clear all inputs of the form
            this.shadowRoot.querySelectorAll('input').forEach( item => item.value = ''); 
            inputFisrtName.focus(); 
            
            store.dispatch('addItem', contactDetails);
        }
    }
}
customElements.define('contact-form', ContactForm); 
