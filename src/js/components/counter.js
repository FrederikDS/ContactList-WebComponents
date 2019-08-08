import store from '../store/index.js'


const CounterTemplate =  document.createElement('template'); 
CounterTemplate.innerHTML=`
            <div class="js-count">
                <small>Counter</small>
                <span></span>
            </div>
`;

class Counter extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode : 'open'}); 
        this.shadowRoot.appendChild(CounterTemplate.content.cloneNode(true)); 

        store.events.subscribe('stateChange', () => this._render()); 
    }


    connectedCallback(){
        console.log('Counter entered the DOM');
        this._render();
    }

    disconnectedCallback(){
        console.log('Counter has left the DOM'); 
    }

    _render(){

        const $count = this.shadowRoot.querySelector('span'); 
        $count.innerHTML = store.state.contacts.length; 
    }
}

customElements.define('my-counter', Counter); 