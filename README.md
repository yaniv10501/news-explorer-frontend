# News Exolorer FrontEnd

The frontend for the News Explorer Website, [Link to the deployed website](https://www.yaniv-news-app.students.nomoreparties.sbs)

## Website current features:

* **Sign In**
* **Sign Up**
* **Search Form**
* **Navigation**

### Sign In

Use the sign in button to toggle the form popup. Inputs are being validated on change with a costum hook.
When you are signed in you have access to the Saved Articles page and you can activate the save button on search results.

### Sign Up

Click a save button on a search result while not logged in or use the link from the sign in form to toggle the form popup. Inputs are being validated on change with a costum hook. If the email is already used the form wont be submitted and an error message will be displayed.

After signing up you can use the link in the info popup to open the sign in form or stay with theh loggedIn state as false.

### Search Forms

The search form can be used to search for articles that matches a keyword from the past week. If no input is provided the place holder will change to - "Please enter a keyword".

If the user is signed in the results are scanned to check if any of the articles is already saved, if so the article save button will be active.

If there are search results rendered on the screen and a user toggles the logged in state, the save button on saved articles will be activated accordingly.

### Navigation

After signing in you can use the navigation in the header to move to the Saved Articles page.

If you try to visit the Saved Articles page when you are not signed in you will be redirected to the home page and a popup will appear promoting you to sign in so you can access the page.

If the user have saved articles they will be rendered in the Saved Articles page.

Articles can be deleted from the Saved Articles page either by clicking the saved button on a search result or by clicking the delete button on the Saved Articles page.
