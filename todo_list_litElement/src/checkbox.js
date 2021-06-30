import { LitElement, html } from "lit-element";

const tagName = "check-box";
class MyCheckbox extends LitElement {
	
	static get properties() {
		return {
			checked: {
				type: Boolean,
				reflect: true,
			},
			id: { type: String, reflect: true },
		};
	}

	constructor() {
		super();
		this.text = "";
		this.checked = false;
	}
	render() {
		return html`
			<div class="inputGroup">
				<input
					id=${this.id}
					type="checkbox"
					?checked=${this.checked}
					@change=${() => this._fire("on-change")}
				/>
				<label for=${this.id}><slot></slot></label>
			</div>
		`;
	}
	_fire(eventType) {
		this.dispatchEvent(new CustomEvent(eventType, { detail: this.id }));
	}
}

window.customElements.define(tagName, MyCheckbox);
