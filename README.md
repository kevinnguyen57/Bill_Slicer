
# Bill Slicer

## Description:

Bill Splicer is a Web Application that anyone can find extremely useful - especially when eating out with a group of people.
Every time one person pays for any of our meals, and we need to pay them back, someone has to do the math which could sometimes
be overwhelming or tedious in certain situations such as, people ordering different things. Bill Splicer will help with that,
giving two options on how the bill should be split. One, split evenly - or two, split differently per what each person ordered.
This Web App will successful tell you what each person owes without having to do the math yourself!

### index.html

The main page of my website. Shows the title of the project and two links that sends you to evenly.html page and differently.html page.
I also used a Google font which is in the header to make the website look neat

### style.css

Styles index.html. The body background is skyblue, and everything in the body is wrapped in a div to make it a container. This container
is locked into the middle with a white background, holding the title and the two links. We also style the title and links to look like
buttons which can be interacted with. Since we added the google font embed link to header (in index.html) we can use it in css to specify
which tag, id, or class gets the font

### evenly.html

When users click on "Evenly" on the main page, they get sent to this page. This page let users enter their receipt information like a form.
Users can input their name, number of people (required), total (required), and tip (required). This html file has a back button at the top
left for users to go back to the main page if needed. The title is at the top middle of the white box container, and there is a submit
button at the bottom of the page. When users submit, there will be another container that will display only once submited. This container
will show the results of how much each person should pay if it were to be split EVENLY

### differently.html

When users click on "Differently" on the main page, they get sent to this page. This page is simialr to evenly where users enter their receipt
information like a form. However, since we are splitting the bill depending on what each person ordered, we have to do more than what we had
in evenly.html. We instead ask users for their subtotal (required), tax (required), and gratuity (required). We don't ask for party size because
we will determine it later! Once the user submits the form, it will show a table that outputs the total cost of the receipt, and the party size
(which equals to 0 for now). The submit button then changes to "Update" so users can go back and update whenever they want. Users can now enter names
of each person in their party, and whenever they add a name, it increments the party size in the table. Everytime a name is entered, that persons item
table is created, which is where users can input what that person ordered specifically and how much it cost. Incase users made a mistake or mispelled
any names, they can remove names they've inputted. After filling out all information, there's another submit button at the bottom where it will
output the results of what everyone owes.

### pages-script.js

I connected evenly.html and differently.html to one js file (this one) which I could've had separate files for them but I just chose to keep them
in one file for easier accessiblility. The JS file allows evenly.html to calculate the results given from the user. We calculate the total and
divide it by the party size. We aLso check for any errors for example, if users enters nothing for any of the required inputs (number of party,
total, tip) an error message would appear and they would have to input the correct format. If asked for total or tip and users input strings, this
would also give users an error to enter the correct input. After all cases pass, the calculation is done and outputted to the user in green.

As for differently.html, it is simialr to evenly.htlm where it checks for input errors from the user. The users must enter something in the required
fields and it must be of correct format. If all cases pass, the user goes to the next form within the page (appears after everything is correct).
This is where users can enter each person's name in the party. The JS file takes the name, and increments party size, and creates a item table for that
specific person. Again, the new item table for each person needs to be of correct format (specifically for the cost). Once finished, users click submit
and the JS file will take all the information and calculate each person's table item in a loop to add up the total and add tax and tip divided by the
amound of people to splite evenly. The JS file will create another table that shows each name and how much they owe correctly

### pages-styles.css

This css file designs evenly and differently html files. Since they are similar (with the first part), it works for both files. The first part of the code
is for evenly.html and the second part is for differently.html (similar to the JS file). It has the back link for each file, and its animation to make the
website more interactive (hovering shadow and transforming). It has the center-wrapping and block to make everything go to the middle within a white container.
It styles the forms and how the questions should look like (font size, weight, etc) and their buttons (size and animations). As for differently.html, it
inherents evenly.html styles but if I need to change things specifically, I just specify the ID in differently to target it. For example, in differently,
once users hit submit, the white container box width is increase to show the tables better. I also have to design the tables making it look nice and aligned
to the center. I had to change the size of the + buttons making it small, and changing the - buttons to red to symbolize deletions. That was only done by
specifying the id of that button to override the child styling. I had to do the same for the other table (items table) to show a difference in each table.
I made the first table that shows party size and total to be light blue (th) and the items table dark gray (th). And finally for the last table, I made the
header orange to match the title background color.

