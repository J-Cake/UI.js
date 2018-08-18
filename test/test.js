function alert (string) {
	new UIbox(new template({content:`${string}`, buttons:[new button("OK", 'ok')]}), "Alert").show();
}
async function confirm (string) {
	return await new UIbox(new template({content:`${string}`, buttons:[new button("OK", 'ok'), new button("Cancel", "cancel")]}), "Select one").get()
}
async function prompt (string) {
	return await new UIbox(new template({content:`${string}<input name="text">`, buttons:[new button("OK", 'ok'), new button("Cancel", "cancel")]}), "Enter some text").get()
}
