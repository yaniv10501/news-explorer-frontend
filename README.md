# News Exolorer FrontEnd

The frontend for the News Explorer Website.

## Website current features:

* **Sign In**
* **Sign Up**
* **Search Form**
* **Navigation**

### Sign In

Use the sign in button to toggle the form popup. regardless of the inputs, form submition will toggle the loggedIn state to true.
When you are signed in you have access to the Saved Articles page and you can activate the save button on search results.

### Sign Up

Click a save button on a search result while not logged in or use the link from the sign in form to toggle the form popup. regardless of the inputs, form submition will toggle the info popup with success registration message.

After signing up you can use the link in the info popup to open the sign in form or stay with theh loggedIn state as false.

### Search Forms

There is an array of dummy article in assets folder that get rendered with every search.

Searching for the keyword "Nothing" will toggle the nothing found component instead of the dummy results.

Every search and show more button click comes with a timeout to fake loading time.

### Navigation

After signing in you can use the navigation in the header to move to the Saved Articles page.

The dummy results also render in the Saved Articles page and you can hover the delete icon but no action is triggered on click.
