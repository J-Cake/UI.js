# UI.js
UI.js is a simple library for creating asynchronous interactive UI elements in JS with ease!

---

It features 3 basic classes, `UIbox`, `template` and `button`.
Using these 3 classes, you can create your very own UI boxes.

__The `UIbox` Class__

This class contains the methods for interacting with your program such as showing and destroying the box.

The constructor takes 6 parameters, an instance of `template` (required), a name, an onShow callback, an onDestory callback, a confirm callback and cancel callback.

__Arguments__

1. `template`: takes an instance of the template class.
  the template class specifies what will be in the UI box, 
  it defines the outline of what the box's function is and how you will be interacting with it.
  
2. `name`: the name is given to the box as a header. it is displayed as a string in the box's head.

3. `onShow callback`: fired when the dialog is drawn to the screen.

4. `onDestroy callback`: called when the box is undrendered.

5. `confirm callback`: this will be executed when the user clicks the provided `OK` button.

6. `cancel callback`: this will be executed when the user clicks the provided `CANCEL` button.

__Methods__

The UIbox class has 3 methods that will be useful: `show`, `get` and `unrender`.

* The `show` function renders the template and displays the box onscreen.
* The `get` function renders the template and displays the box onscreen,
  as well as returning a promise that resolves when the user clicks a button that resolves the box.
* The `unrender` function removes the box from the screen.
 
__The `template` Class__

This class is used as a skeleton for outlining the content of the box.
It has no methods but takes 1 parameter: `templateObj`, an object containing the required information.
 
It takes a `button` property, a `content` property, and optionally, a `type` and a `settings` property.
> __Note:__ The `settings` parameter is unimplemented for now.
 
The `buttons` property is an array of `button` instances.
The `content` property is a HTML layout that will be displayed between the title and button bar.
The `type` property is a string that specifies the appearance and behaviour of the box. The options include

* box
* notification
* menu
* toast

__The `button` Class__

This class is used for declaring actions for the `UIbox`.

It takes 4 arguments

__Arguments__

1. `text`: the text the button displays

2. `callback`: the event to happen when the button is clicked

3. `closeDialog`: boolean, states whether the dialog closes when clicked.

4. `submitsForm`: boolean, states whether the dialog is resolved when clicked.

> __Note:__ the `callback` parameter can be a string of either `ok` or `cancel`. These are button presets that act as ok and cancel behaviours.

__Example__

_Alert_ 

    async function alert (string) {
      new UIbox(new template({content:`${string}`, buttons:[new button("OK", 'ok')]}), "Alert").show();
    }
    
Will display a dialog that closely mimics an `alert` call.

_Confirm_ 

    async function confirm (string) {
	    return await new UIbox(new template({content:`${string}`, buttons:[new button("OK", 'ok'), new button("Cancel", "cancel")]}), "Select one").get()
    }
    
Will display a dialog that closely mimics an `confirm` call.

_Prompt_

    async function prompt (string) {
    	return await new UIbox(new template({content:`${string}<input name="text">`, buttons:[new button("OK", 'ok'), new button("Cancel", "cancel")]}), "Enter some text").get()
    }

Will display a dialog that closely mimics an `prompt` call.

as noted before, using `get` will return a promise. So to practically use these examples, use promise syntax.

    let promptResult = prompt('enter some text').then(res => promptResult = res).catch(err => promptResult = null);
    let confirmResult = confirm('select \'ok\' or \'cancel\'').then(res => promptResult = true).catch(err => promptResult = false);
    
__Issues__

If you find any issues (which you will) and you want to contribute, feel free to leave an issue or contribute!

__Disclaimer__

This project is not meant to be used in a professional context as it is not equipped with propper error handling capabilities, if you wish to use it in a professional project, you might need to make some security patches or some error fixing.

Good Luck!
