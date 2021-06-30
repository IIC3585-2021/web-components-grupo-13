// referencia: https://codesandbox.io/s/litelement-medium--exercise-2-yxohb?file=/.babelrc
import {LitElement, html, css} from 'lit-element';
import { repeat } from "lit-html/directives/repeat";

import "./checkbox";

export class TodoElement extends LitElement {
    static get styles(){
        return css `
        .boton {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            cursor: pointer;
            background-color: #4628e6;
            color: white;
            border-radius: 8px;
            width: 10%;
            height: 40px;
            border: 0;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .div {
            font-family: 'Arial', sans-serif;
          }
        `;
    }
    
    static get properties(){
        return{
            _tasks: {type: Array},
            nxt_id: {type: Number}
        };
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(data){
        sessionStorage.setItem("dataToDo", JSON.stringify(data));
        this._tasks = data;
    }

    constructor() {
        super();
        this.nxt_id = 0;
        this.tasks = [
            {"text": "Task A",
            "id": "task" + this.nxt_id++,
            },
            {"text": "Task B",
            "id": "task" + this.nxt_id++,
            },
            {"text": "Task C",
            "id": "task" + this.nxt_id++,
            }]
    }


    firstUpdated(){
        this.$input = this.shadowRoot.querySelector("input");
    }

    updated(){
        const removeBtn = this.shadowRoot.querySelector("#remove");

        if (removeBtn) {
			removeBtn.disabled = true;
			const hasChecked = this.tasks.find((task) => task.checked);

			if (hasChecked) {
				removeBtn.disabled = false;
			}
		}
    }

    render () {
        return html`
            <form id="todo-input">
				<div class="container-form ">
					<input 
						type="text"
						class="form-field"
						placeholder="Nueva tarea"
						@input=${this._onInput}>
					</input>
				</div>
				
                <button 
                    class="boton"
                    @click=${this._onAddTodo}
                    ?disabled=${this.disabled}>
                    Agregar
                </button>
				
			</form>
            <div class="list">
            ${repeat(
                this.tasks,
                (task) => task.id,
                (task) => html`${this._createCheckBox(task)}`,
                (task) => console.log(task),
            )}
			</div>
            <button 
                    class="boton"
                    @click=${this._onRemoveTodo}
                    ?disabled=${this.disabled}>
                    Eliminar
                </button>
            `
    }
    _createCheckBox(task) {
        console.log(task);
        return html`<check-box
			id=${task.id}
			type="checkbox"
			?checked=${task.checked}
			@on-change="${this._onToggleTodo}"
		>
			${task.text}
		</check-box>`;
	}
    
	_onInput() {
		let value = this.$input.value.trim();
		this.disabled = !value;
	}
	_onAddTodo(e) {
		e.preventDefault();
		if (!this.disabled) {
			this.tasks = [
				...this.tasks,
				{ text: this.$input.value, checked: false, id: "task"+this.nxt_id++, },
			];
			this.$input.value = "";
		}
	}
	_onToggleTodo(e) {
		this.tasks = this.tasks.map((task) => {
			return task.id === e.detail ? { ...task, checked: !task.checked } : task;
		});
	}
	_onRemoveTodo(e) {
		this.tasks = this.tasks = this.tasks.filter((task) => !task.checked);
	}
}

customElements.define('todo-list', TodoElement);