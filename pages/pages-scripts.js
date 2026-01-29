
// ========= EVENLY HTML ==========

// When form is submitted, calculate and output in id="evenly_answer"
function submitForm_Evenly() {
    // KEY STEP: Prevent the default from submission (page reload)
    event.preventDefault();

    let answer = document.getElementById("evenly_answer");

    answer.style.display = "flex";  // show box border when ready

    let peopleStr = document.getElementById("people").value;
    let whoStr = document.getElementById("who").value;
    let totalStr = document.getElementById("total").value;
    let tipStr = document.getElementById("tip").value;

    // Clear the previous answer
    answer.textContent = "";

    // REGEX for money format   /^\d+(\.\d{1,2})?$/ : for money format but doesnt accept .5 or like .43
    const moneyFormat = /^(?:\d+|\d*\.\d{1,2})$/; // this format accepts .5 or like .43

    // Validate before moving forward, any errors should be red output
    let people = parseFloat(peopleStr)
    let total = parseFloat(totalStr)
    let tip = parseFloat(tipStr)
    answer.style.color = "red";

    // First, validate the number of people
    if (isNaN(people) || people <= 0) {
        answer.textContent = "Please enter a valid number of people."
        return;
    }

    // Second, validate the money format is correct
    if (!moneyFormat.test(total)) {
        answer.textContent = "Please enter a valid total (ex: 30.89, 70.1, 50, .50)"
        return;
    }

    if (!moneyFormat.test(tip)) {
        answer.textContent = "Please enter a valid tip (ex: 5.59, 21.1, 67, .89)"
        return;
    }

    // if all cases pass, turn the text color to green
    answer.style.color = "green";

    // Calculate the total + tip and divide it by amount of people
    total = total + tip;
    let result = total / people;
    answer.textContent = `Each person owes ${whoStr} $${(result + 0.01).toFixed(2)}`;
}

/* make sure the input for total is correct in EVENLY
function validate_total() {

    let total = parseFloat(document.getElementById("total").value);
    let errto = document.getElementById('errto');

    errto.style.color = 'red';

    if (isNaN(total)) {
        errto.innerHTML=" Please enter valid numbers";
    }
    else {
        errto.innerHTML=" ";
    }
}
*/


// ======== DIFFERENTLY HTML ==========

let partyCount = 0;
let sumTotal = 0;

// Count total amount
function updateTotal() {
    document.getElementById("total").textContent = `$${sumTotal.toFixed(2)}`;
}

// Count party size for every name inputed
function updatePartySize() {
    document.getElementById("partySize").textContent = partyCount;
}

// Adding names
document.getElementById("addNameBtn").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value;

    if (!name) return alert("please enter a name.");

    // We add name to the people table
    const tableBody = document.getElementById("personName");

    // const row = tableBody.insertRow(-1); // add new row to end
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td><button class="remove_Btn" onclick="removePerson('${name}', this)">-</button></td>
        `;

    tableBody.appendChild(row);
    // increase party size here
    partyCount++;
    updatePartySize();

    // then create that person's item entry table
    createItemTableFor(name);

    // clear inputs
    document.getElementById("nameInput").value = "";
});

// function to remove a person and their items
function removePerson(name, button) {
    // Remove row from the main table
    button.parentNode.parentNode.remove();

    // Remove that person’s items block
    const block = document.getElementById(`items-${name}`);
    if (block) block.remove();

    // decrease party size here
    partyCount--;
    updatePartySize();
}

// Update the form
function updateForm_Differently() {
    // Prevent the reload of the page
    event.preventDefault();

    let update = document.getElementById("update_check");

    update.style.display = "flex";  // show box border when ready

    let buttonName = document.getElementById("firstBtn");
    let subtotalStr = document.getElementById("subtotal").value;
    let taxStr = document.getElementById("tax").value;
    let tipStr = document.getElementById("tip").value;

    let total = document.getElementById("total");

    // clear the previous update
    update.textContent = "";

    // REGEX for money format   /^\d+(\.\d{1,2})?$/ : for money format but doesnt accept .5 or like .43
    const moneyFormat = /^(?:\d+|\d*\.\d{1,2})$/; // this format accepts .5 or like .43

    // Validate before moving forward, any errors should be red output
    let subtotal = parseFloat(subtotalStr)
    let tax = parseFloat(taxStr)
    let tip = parseFloat(tipStr)
    update.style.color = "red";

    if (!moneyFormat.test(subtotal)) {
        update.textContent = "Please enter a valid total (ex: 30.89, 70.1, 50, .50)"
        return;
    }

    if (!moneyFormat.test(tax)) {
        update.textContent = "Please enter a valid tax (ex: 1.30, 12.3, 15, .73)"
        return;
    }

    if (!moneyFormat.test(tip)) {
        update.textContent = "Please enter a valid tip (ex: 5.59, 21.1, 67, .89)"
        return;
    }

    sumTotal = subtotal + tax + tip;
    updateTotal(sumTotal);

    // show items section after at least one person exists
    document.getElementById("itemsSection").style.display = "block";
    buttonName.textContent = 'Update Amount';

    update.style.display = "none";  // hide box border when no errors

}

// function to create a table for each person
function createItemTableFor(name) {
    // container in the itemsSection div
    const container = document.getElementById("personItemsContainer");

    // Create a div and give it an access name wrapper
    // then add a class list to it called "person-block"
    // set its id to items-name so we know whos table is whos
    const wrapper = document.createElement("div");
    wrapper.classList.add("person-block");
    wrapper.id = `items-${name}`;

    // this is what gets outputted to the html
    wrapper.innerHTML = `
        <h3>${name}'s Items</h3>

        <input type="text" id="item-${name}" placeholder="Item name">
        <input type="number" id="price-${name}" placeholder="Price">
        <button onclick="addItem('${name}')">+</button>

        <table border="1" style="margin-top:10px;">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody id="itemBody-${name}"></tbody>
        </table>
        `;

        container.appendChild(wrapper);
}

// Function to add an item to a person's table
function addItem(name) {
    // take the item name and store it in a variable - take the price as well
    const itemName = document.getElementById(`item-${name}`).value;
    const price = document.getElementById(`price-${name}`).value;

    // If item name or price was not filled out, alert the user
    if (!itemName || !price) return alert("Please enter item and price.");

    // create a const var to get element of a persons itemBody
    const tbody = document.getElementById(`itemBody-${name}`);
    // Create a row to add the information
    const row = document.createElement("tr");

    // HTML will show it as the item name, price, and a remove button in this order
    row.innerHTML = `
        <td>${itemName}</td>
        <td>$${parseFloat(price).toFixed(2)}</td>
        <td><button class="remove_Btn" onclick="this.parentNode.parentNode.remove()">-</button></td>
    `;

    // append it to the table tbody
    tbody.appendChild(row);

    // clear inputs for new inputs
    document.getElementById(`item-${name}`).value = "";
    document.getElementById(`price-${name}`).value = "";
}

// Final function to submit and get what each person owes
function submitForm_Differently(event) {
    // prevent the reload page
    event.preventDefault();

    // check the table with tbody, and show errors with submit
    const tbody = document.getElementById("personName");
    let ty_p = document.getElementById("ty_payer");
    let submit = document.getElementById("submit_check");
    let payer = document.getElementById("who").value;

    // get tax and tip, divide into party size, and add it to each persons total
    const tax = parseFloat(document.getElementById("tax").value);
    const tip = parseFloat(document.getElementById("tip").value);
    const partyS = parseInt(document.getElementById("partySize").textContent);

    let tax_tip_split = (tax + tip) / partyS;
    // console.log(tax_tip_split.toFixed(2));


    // error message will be red
    submit.style.color = "red";

    // check if table is empty
    if (tbody.rows.length === 0) {
        submit.textContent = "Please add people to the party"
        return;
    }

    // check if table only has one person (no point in splitting)
    if (tbody.rows.length === 1) {
        submit.textContent = "What's the point of splitting the bill if there is only 1 person... o_O"
        return;
    }

    if (payer) {
        submit.style.color = "green";
        ty_p.style.color = "green";
        ty_p.textContent = `Thank you for paying ${payer}! <3`;
        submit.textContent = `Everyone else, don't forget to pay ${payer} back ASAP!`;
    }

    if (!payer) {
        submit.style.color = "green";
        submit.textContent = "This is what everyone owes to whoever that paid!";
    }

    // add name to new table then clear the table so it refreshes each time
    const tableBody = document.getElementById("submitOwed");
    tableBody.innerHTML = "";

    // Loop through all rows in the table
    for (const r of tbody.rows) {
        // personName grabs the name of the current row from personName table
        const personName = r.cells[0].textContent;

        // Find the person's item table suing the name we just grabbed
        const itemTbody = document.getElementById(`itemBody-${personName}`);
        let itemTotal = 0;  // start total at 0 to sum up the total at the end

        if (itemTbody) {    // if the person's item table if not empty
            // Loop through each row and sum the prices
            for (const itemRow of itemTbody.rows) {
                const priceCell = itemRow.cells[1]; // Price is in the 2nd column
                let price = parseFloat(priceCell.textContent.replace('$', '')); // removes '$' so we can calculate the total
                if (!isNaN(price)) itemTotal += price;  // If price is a number, we add it to total
            }
        }

        let totalOwed = itemTotal + tax_tip_split;

        const row = document.createElement("tr"); // assigning row as a table row we will be insering ubti tableBody

        row.innerHTML = `
            <td>${personName}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>$${totalOwed.toFixed(2)}</td>
        `;

        tableBody.appendChild(row);

    }

    document.getElementById("submitSection").style.display = "block"; // show the table

}
