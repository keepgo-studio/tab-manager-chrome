import { LitElement } from "lit";
import { state } from "lit/decorators.js";

export class DialogComponent extends LitElement {
	@state()
  isConfirmed?: boolean;

	wait() {
		return new Promise((res, _) => {
			const loop = () => {
				setTimeout(() => {
					if (this.isConfirmed !== undefined) {
						return res(this.isConfirmed);
					}
					loop();
				}, 100);
			};
			loop();
		});
	}

	appaer() {
    const prev = document.body.querySelector(this.tagName);
    if (prev) {
      prev.remove();
    }
    document.body.appendChild(this);
  }

	disappear() {
    this.remove();
  }

	async show() {
    this.appaer();

    await this.wait();

    this.disappear();

    return this.isConfirmed;
  }

}