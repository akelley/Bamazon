var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password123',
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;
	// console.log("\nConnection successful!");
	// console.log("Connected as id: " + connection.threadId);
	start();
});

var start = function(){
	inquirer.prompt({
		name: 'action',
		type: 'rawlist',
		message: 'What would you like to do? ',
		choices: [
			'View Products for Sale',
			'View Low Inventory',
			'Add to Inventory',
			'Add New Product'
		]
	}).then(function(answer){
			switch(answer.action){		
				case 'View Products for Sale':
					listItems();
					break;
				
				case 'View Low Inventory':
					viewLow();
					break;
				
				case 'Add to Inventory':
					add2Inv();
					break;
				
				case 'Add New Product':
					addItem();
					break;
			}
	})
};

var listItems = function(){
	connection.query('SELECT * FROM products', function(err, res){
		for(var i = 0; i < res.length; i++){
			console.log("Item #: " + res[i].item_id + "; Product name: " + res[i].product_name + "; Department: " + res[i].department_name + "; Price (per unit): " + parseFloat(res[i].price).toFixed(2) + "; Quantity: " + res[i].stock_quantity);
		}
		console.log("");
	})
	setTimeout(start, 500);
};

var viewLow = function(){
	connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
		for(var i = 0; i < res.length; i++){
			console.log("Item #: " + res[i].item_id + "; Product name: " + res[i].product_name + "; Department: " + res[i].department_name + "; Price (per unit): " + parseFloat(res[i].price).toFixed(2) + "; Quantity: " + res[i].stock_quantity);
		}
		console.log("");
	})
	setTimeout(start, 500);
};

var add2Inv = function(){
	inquirer.prompt([{
		name: 'item',
		type: 'input',
		message: 'Which item would you like to add to? ',
		validate: function(value){
				if(isNaN(value) == false)
					return true;
				else
					return false;
			}
		},{
		name: 'quantity',
		type: 'input',
		message: 'How much would you like to add? ',
		validate: function(value){
			if(isNaN(value) == false)
				return true;
			else
				return false;
		}
		}]).then(function(answer){
			var query = 'UPDATE products SET stock_quantity = stock_quantity + ' + answer.quantity + ' WHERE item_id = ' + answer.item;
			connection.query(query, function(err, res){
				if(err) 
					throw err;
				else
					console.log("Inventory updated.\n");
		})
		setTimeout(start, 500);
	})
};

var addItem = function(){
	inquirer.prompt([{
		name: 'product_name',
		type: 'input',
		message: 'What is the name of the new product? '
		},{
		name: 'department_name',
		type: 'input',
		message: 'Which department does it belong in? '
		},{
		name: 'price',
		type: 'input',
		message: 'What is the price per unit for this item? ',
			validate: function(value){
				if(isNaN(value) == false)
					return true;
				else
					return false;
			}
		},{
		name: 'stock_quantity',
		type: 'input',
		message: 'How many do we have in stock to start with? ',
		validate: function(value){
				if(isNaN(value) == false)
					return true;
				else
					return false;
			}
		}]).then(function(answer){
		  var query = connection.query('INSERT INTO products SET ?',
		{
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.stock_quantity,
      product_sales: 0.00
    },
    function(err, res) {
			if(err) 
				throw err;
			else
				console.log("Product added to inventory.\n");
		})
		setTimeout(start, 500);
	})
};