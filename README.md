# Bamazon

## Description

This CLI application simulates a storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together via the npm [mysql](https://www.npmjs.com/package/mysql) package. The application has three interfaces: **customer**, **manager** and **supervisor**.

### MySQL Database Setup

To run this application, you should have the MySQL database already set up on your machine. If you don't, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the latest version for your operating system. Once you have MySQL installed, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in [Bamazon.sql](Bamazon.sql). Run this code inside your MySQL client to populate the database, then you will be ready to proceed with running the Bamazon interfaces.

### Customer Interface

The customer interface allows the user to view the current inventory of items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is notified.

To run the customer interface, please follow the steps below:

	git clone https://github.com/akelley/Bamazon.git
	cd Bamazon
	npm install
	node bamazonCustomer.js

### Manager Interace

The manager interface presents a list of four options, as below. 

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  
The **View Products for Sale** option allows the user to view the current inventory of store items.

The **View Low Inventory** option shows the user which items have fewer than 50 units available.

The **Add to Inventory** option allows the user to select a given item ID and add additional inventory.

The **Add New Product** option allows the user to enter details about a new product which will be entered into the database.

To run the manager interface, please follow the steps below:

	git clone https://github.com/akelley/Bamazon.git
	cd Bamazon
	npm install
	node bamazonManager.js
  
  ### Supervisor Interace

The supervisor interface presents a list of four options, as below. 

	? Please select an option: (Use arrow keys)
	❯ View Products Sales by Department
	  Create New Department
	  
The **View Products Sales by Department** option allows the user to view total profit per department (total sales minus overhead costs).

The **Create New Department** option allows the user to create a new department to place items into, along with the department's overhead costs.

To run the supervisor interface, please follow the steps below:

	git clone https://github.com/akelley/Bamazon.git
	cd Bamazon
	npm install
	node bamazonSupervisor.js

