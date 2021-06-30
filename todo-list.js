const styles = /*css*/`
  p {
    font-family: 'Arial', sans-serif;
  }
  .element {
    width: 40%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
  }
  button {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    background-color: #4628e6;
    color: white;
    border-radius: 8px;
    width: 20%;
    height: 40px;
    border: 0;
  }
  .list {
    margin-left: 2rem;
    margin-top: 2rem;
  }
  .title {
    font-family: 'Arial', sans-serif;
  }
  input {
    height: 20%;
    border-radius: 4px;
  }
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const createElement = (name, newValue) => {
  const div = document.createElement("div");
  const paragraph = document.createElement("P"); 
  const btn = document.createElement("BUTTON");   
  btn.innerHTML = "delete";
  btn.id = `delete${name.slice(-1)}`;
  div.id = name;
  div.appendChild(paragraph);
  div.appendChild(btn);  
  div.className = "element";
  const text = document.createTextNode(newValue);
  paragraph.appendChild(text);       
  return div;
}

const template = document.createElement("template");
template.innerHTML = /*html*/`
<div class='wrapper'>
  <span class='title'>Titulo</span>
  <div class='list'>
  </div>
</div>
`

class TodoList extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [sheet]
    this.persistenElements = [];
    this.elements = [];
  }

  static get observedAttributes () {
    return ["title", "element1", "element2", "element3", "prompt"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    } else if (name.includes("element")) {
      const div = createElement(name, newValue);
      this.elements.push(name);
      this.persistenElements.push(name);
      this.shadowRoot.querySelector(".list").appendChild(div);    
    } else if (name === "prompt") {
      const div = document.createElement("div");
      const paragraph = document.createElement("P"); 
      const input = document.createElement("input");   
      const btn = document.createElement("BUTTON");   
      input.className = "input";
      btn.innerHTML = "add";
      btn.id = `add`;
      div.appendChild(paragraph);
      div.appendChild(input); 
      div.appendChild(btn);   
      div.className = "element";
      const text = document.createTextNode(newValue);
      paragraph.appendChild(text);       
      this.shadowRoot.querySelector(".wrapper").appendChild(div);    
    }
  }

  connectedCallback () {
    const deleteButtons = this.shadowRoot.querySelectorAll("[id^='delete']");
    deleteButtons.forEach(button => {
      button.addEventListener("click", e => {
        const index = this.elements.indexOf(`element${button.id.slice(-1)}`);
        this.elements.splice(index, 1);
        this.shadowRoot.querySelector(".list").removeChild(this.shadowRoot.querySelector(`#element${button.id.slice(-1)}`));
      });
    });
    const addButton = this.shadowRoot.querySelector("#add");
    addButton.addEventListener("click", e => {
      const inputValue = this.shadowRoot.querySelector(".input").value;
      const newIndex = this.persistenElements.length + 1;
      const newElementId = `element${newIndex}`;
      this.elements.push(`element${newIndex}`);
      this.persistenElements.push(`element${newIndex}`);
      const div = createElement(newElementId, inputValue);
      this.shadowRoot.querySelector(".list").appendChild(div);
      const button = this.shadowRoot.querySelector(`#delete${newIndex}`);
      button.addEventListener("click", e => {
        this.elements.splice(newIndex, 1);
        this.shadowRoot.querySelector(".list").removeChild(this.shadowRoot.querySelector(`#element${newIndex}`));
      });
    });
  }

  disconectedCallback() {
    const deleteButtons = this.shadowRoot.querySelectorAll("[id^='delete']");
    deleteButtons.forEach(button => {
      button.removeEventListener();
    });
  }
}

window.customElements.define("todo-list", TodoList);