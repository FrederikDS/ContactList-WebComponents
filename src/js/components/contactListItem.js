/**
 *  Contact list item
 *  - has text that contains the data, in this case first/lastname
 *  - delete button
 *  - checkbox as selection
 */

const ContactListItemTemplate = document.createElement('template'); 
ContactListItemTemplate.innerHTML = `<li><span></span><button aria-label="Delete this item">×</button></li>`; 


class ContatListItem extends HTMLElement{
    constructor(){
        super(); 
    
        this.attachShadow({mode : 'open'});
        this.shadowRoot.appendChild(ContactListItemTemplate.content.cloneNode(true)); 

        //ref to the HTML elements
        this.$text = this.shadowRoot.querySelector('span'); 
        this.$removeButton = this.shadowRoot.querySelector('button');
        
        //create a new event Remove
        // containing list needs to be able to delete the item based on the index
        this.$removeButton.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onRemove', {detail: this._index}));
        });
    }

    connectedCallback(){
        console.log('A contact list item entered the DOM');

        //On DOM insertion, render the component
        this._render();
    }

    disconnectedCallback(){
        console.log('A contact list item lef the DOM'); 
    }

    static get observedAttributes(){
        return['data-text', 'data-index']; 
    }

    attributeChangedCallback(name, oldValue, newValue){

        switch(name){
            case 'data-text': 
                this._text = newValue;
                break;
            case 'data-index': 
                this._index = parseInt(newValue);
        }
    }
    _render(){

        //set the text
        this.$text.innerHTML = this._text; 
    }

    //index is generated in the list component render function
    // by running the foreach loop (second param is index)
    set index(value){
        this.setAttribute('data-index', value);
    }

    get index(){
        return this._index;
    }
}

customElements.define('contact-list-item', ContatListItem);