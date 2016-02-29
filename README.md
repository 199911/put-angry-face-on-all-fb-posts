# Put angry face on all feeds in your current facebook page

## Usage

1. Manually trigger the emotion bar.
2. Copy the code and paste it into the console.
3. Call `scroll_to_bottom_feed()`
4. Wait until all feeds are shown
5. Call `show_emotion_bar()`
6. Call put_angry_face_on_all_post()
7. Angry reaction will be add to the post one by one in every seconds, from top to bottom

## Note
If you want to cancell the reaction, you can call `cancel_all_emotion_on_post()`
The reaction will be cancel one by one in every second.

## Contribute 

We have following task, feel free to create a pull request
1. Update the README.md to have instruction on the chrome extension
2. Improve the UI of the extension pop up
3. Trigger the emotion bar automatically, manual trigger on reaction bar is required in current version
4. Add stop scrolling function
5. Prevent too much event is fired, otherwise facebook will warn the user and ban the action
