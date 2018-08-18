class UIbox {
	constructor (template, name, onconfirm, oncancel) {
		this.template = template;
		this.name = name;
		this.onconfirm = confirm;
		this.oncancel = oncancel;
	}

	show () {
		document.body.innerHTML += `<div class="uibox display_area"></div>`;
		this.drawArea = document.querySelector(".uibox.display_area");

		this.drawArea.innerHTML = this.renderTemplate(this.template);

	}

	renderTemplate (template) {
		let templateHTML = `<div class='uibox box wrapper' id='${document.querySelector(".uibox.display_area").children.length + 1}'><span class='uibox box header'>${this.name}</span><div class='uibox box content'>`
		templateHTML += template.content + `</div>`;
		template.buttons.forEach(button => {
			templateHTML += `<button class='uibox button', id='${document.querySelectorAll('54button.uibox.button').length}'>${button.text}</button>`;
		})
		return templateHTML + `</div>`
	}
}
