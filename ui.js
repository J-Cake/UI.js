class UIbox {
	constructor (template, name, onconfirm, oncancel) {
		this.template = template;
		this.name = name;
		this.onconfirm = onconfirm;
		this.oncancel = oncancel;

		this.template.parent = this;
		this.template.setBtnBehavoiurs();

		this.submittionPromise;

	}

	show () {
		if(document.querySelector(".uibox.display_area") == null)
			document.body.innerHTML += `<div class="uibox display_area"></div>`;
		this.drawArea = document.querySelector(".uibox.display_area");

		this.drawArea.innerHTML += this.renderTemplate(this.template);
		this.addBtnListeners();
	}

	get () {
		this.show();
		return new Promise((res, rej) => {

			this.resolve = (function () {
				let parsedBodyContent = {}
				let body = [...this.self.querySelector('.content').children];
				body.forEach (element => {
					if (element instanceof HTMLInputElement) {
						parsedBodyContent[element.getAttribute('name')] = element.value;
					} else if (element.getAttribute('contenteditable') == 'true') {
						parsedBodyContent[element.getAttribute('name')] = element.innerHTML;
					}
				})

				if (Object.keys(parsedBodyContent).length == 1) parsedBodyContent = parsedBodyContent[Object.keys(parsedBodyContent)[0]];

				res(parsedBodyContent);
			});
			this.reject = rej;
		});
	}

	renderTemplate (template) {
		let templateHTML = `<br/><div class='uibox box wrapper' id='box${Math.floor(document.querySelector(".uibox.display_area").children.length / 2) + 1}'><span class='uibox box header'>${this.name}</span><div class='uibox box content'>`
		templateHTML += template.content + `</div><div class="uibox box buttons">`;
		template.buttons.forEach((button, index) => {
			templateHTML += `<button class='uibox button', id='btn${this.drawArea.querySelectorAll('.buttons button').length + index + 1}'>${button.text}</button>`;
		})

		return templateHTML + `</div></div>`
	}

	addBtnListeners() {
		this.self = [...this.drawArea.querySelectorAll('.uibox.box.wrapper')].pop();
		let buttons = [...this.self.querySelector('.buttons').children];
		// BUG: Only one Dialog can be open at a time, otherwise, dialogs that are not the first cannot be closed, the event listener is not being applied.
		buttons.forEach((button, i) => {
			if (button) {
				button.addEventListener('click', e => {
					this.template.buttons[i].click();
					try {
						if (this.template.buttons[i].submitsForm) this.resolve();
						else this.reject();
					} catch {null}

				}, false)
			}
		});
	}

	unrender () {
		this.self.outerHTML = ""
	}
}

class template {
	constructor (templateObj) {
		this.buttons = templateObj.buttons;
		this.content = templateObj.content;
		this.type = templateObj.type;
		this.settings = templateObj.settings;
	}

	setBtnBehavoiurs() {
		this.buttons.forEach(btn => {
			btn.parent = this.parent
			btn.setBehaviour();
		})
	}
}

class button {
	constructor (text, callback, closeDialog, submitsForm) {
		this.text = text;
		this.parent = {};
		this.callback = callback;
		this.unrender = this.parent.unrender;
		this.closeDialog = closeDialog;
		this.submitsForm = submitsForm || false;
	}
	setBehaviour () {
		if (typeof this.callback == "string") {
			switch (this.callback) {
				case 'ok':
					this.callback = (function () {
						this.submitsForm = true;
						this.closeDialog = true;
						this.parent.onconfirm();
					})
					break;
				case 'cancel':
					this.callback = (function () {
						this.submitsForm = false;
						this.closeDialog = true;
						this.parent.oncancel();
					})
					break;
			}
		}

	}
	click () {
		try {
			this.callback()
		} catch {}
		if (this.closeDialog) this.parent.unrender();
	}
}

// function alert (string) {
// 	new UIbox(new template({content:`string`, buttons:[new button("OK", 'ok')]}), "Alert").show();
// }
