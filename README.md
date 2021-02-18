In order to use the code from this repo you have to get a forge app token and deploy the app:

* use `forge create` in an empty directory
* cope the app token from your `mainifest.yml` which looks like this:
```
app:
  id: ari:cloud:ecosystem::app/<random Id>
  name: <name>
```
* paste this into the `manifest.yml` here
* use `forge deploy` and `forge install` to install this app to your site
* use `forge tunnel` to see the logs

You can now go to your confluence main page and see "{your app name} (Development)" in your home feed. <br>
There you'll have to authorize the app (if it doesn't show up immediately click "get tasks"). <br>
After authorization you can create a task on a random confluence page. <br>
Now you can use "get tasks" to verify that the oAuth scope `read:confluence-content.all` is present. <br>
If you click on "convert something" you'll see the logs of how often the exact same storage format failed to convert and how many times it succeeded.