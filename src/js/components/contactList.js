import './contactListItem.js';
import store from '../store/index.js';  


const ContactListTemplate = document.createElement('template'); 
ContactListTemplate.innerHTML = `
<ul>
</ul>`; 


class ContactList extends HTMLElement{
    constructor(){
        super(); 

        this.attachShadow({mode : 'open'});
        this.shadowRoot.appendChild(ContactListTemplate.content.cloneNode(true)); 

        store.events.subscribe('stateChange', () => this._render()); 
    }

    connectedCallback(){

        console.log('ContactList entered the DOM');

        this._render();
    }

    disconnectedCallback(){

        console.log('ContactList left DOM'); 
    }

    _removeListItem(e){

        const index = e.detail;
        //e.detail holds the index of the item to be cleared
        store.dispatch('clearItem', { index });
    }

    _render(){

        let self = this;

        if(store.state.contacts.length === 0){

            const $list = this.shadowRoot.querySelector('ul');
            if($list != null){
                $list.innerHTML = '';
            }

            const p = document.createElement('p'); 
            p.innerHTML = 'No Contacts';
            this.shadowRoot.appendChild(p); 
        } else {
            //alternative that returns a bool
            //const pb = !!this.shadowRoot.querySelector('p'); 
            const $p = this.shadowRoot.querySelector('p'); 
            if($p != null){
                this.shadowRoot.removeChild($p);
            }

            const $list = this.shadowRoot.querySelector('ul');
            $list.innerHTML= '';
            //create a new list item element
            
            //fill the element and append to the DOM
            store.state.contacts.forEach((item, index) => {
                const $listItem = document.createElement('contact-list-item'); 
                $listItem.addEventListener('onRemove', this._removeListItem.bind(this));
                $listItem.setAttribute('data-text', `${item.firstName} ${item.lastName}`); 
                $listItem.setAttribute('data-index', index);
                $list.appendChild($listItem);
            });
            // let list = this.shadowRoot.querySelector('ul'); 
            // list.innerHTML='';
            // store.state.contacts.forEach((item) => {
            //     let listItem = document.createElement('li'); 
            //     listItem.innerHTML = `${item.firstName} ${item.lastName}`; 
            //     list.appendChild(listItem); 
            //     console.log(`adding ${item.firstName}`);
            // }); 
        }
        
    }
}

customElements.define('contact-list', ContactList);