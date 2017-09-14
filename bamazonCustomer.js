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
	console.log("\nConnected as id: " + connection.threadId);
	intro();
});

var intro = function(){
	connection.query('SELECT * FROM products', function(err, res){
		for(var i = 0; i < res.length; i++){
			console.log("Item #: " + res[i].item_id + "; Product name: " + res[i].product_name + "; Department: " + res[i].department_name + "; Price (per unit): " + parseFloat(res[i].price).toFixed(2) + "; Quantity: " + res[i].stock_quantity);
		}
		console.log("");
	})
	setTimeout(start, 500);
};

var start = function(){
	inquirer.prompt([{
	name: 'item',
	type: 'input',
	message: 'Which item would you like to purchase? ',
	validate: function(value){
			if(isNaN(value) == false)
				return true;
			else
				return false;
		}
	},{
		name: 'quantity',
		type: 'input',
		message: 'How many units would you like to buy? ',
		validate: function(value){
			if(isNaN(value) == false)
				return true;
			else
				return false;
		}
	}]).then(function(answer){
		var query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
		connection.query(query, {item_id: answer.item}, function(err, res){

			if(answer.quantity > res[0].stock_quantity){
				console.log("\nStock not available.\n");
			}
			else{
				var sales = parseFloat(parseFloat(res[0].price).toFixed(2) * answer.quantity).toFixed(2);
				console.log("Grand Total is $" + sales + "; Price (per unit) * Quantity ($" + parseFloat(res[0].price).toFixed(2) + " * " + answer.quantity + ")");
				var query = 'UPDATE products SET stock_quantity = stock_quantity - ' + answer.quantity + ', product_sales = product_sales + ' + sales + ' WHERE item_id = ' + answer.item;
				connection.query(query, function(err, res){
					if(err)
						throw err;
					else
						console.log("Purchase successful.\n");
				});
			}
			intro();
		})
	})
};