#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api

# Add your model imports
from models import Customer, Transaction, Item

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Customers(Resource):
    
    def get(self):
        cust_dict_list = [customer.to_dict() for customer in Customer.query.all()]

        response = make_response(
            jsonify(cust_dict_list),
            200
        )

        return response

    def post(self):
        new_customer = Customer(
            name = request.form['name'],
            email = request.form['email'],
            number = request.form['number'],
        )

        db.session.add(new_customer)
        db.session.commit()

        customer_dict = new_customer.to_dict()

        response = make_response(
            jsonify(customer_dict),
            201
        )

        return response

api.add_resource(Customers, '/customers')

class CustomerByID(Resource):
    
    def get(self, id):
        customer_dict = Customer.query.filter(Customer.id == id).first().to_dict()

        response = make_response(
            jsonify(customer_dict),
            200
        )

        return response

    def patch(self, id):
        customer = Customer.query.filter(Customer.id == id).first()
        
        for attr in request.form:
            setattr(customer, attr, request.form.get(atr))

        db.session.add(customer)
        db.session.commit()

        customer_dict = customer.to_dict()

        response = make_response(
            jsonify(customer_dict),
            200
        )

        return response

    def delete(self, id):
        customer = Customer.query.filter(Customer.id == id).first()
        
        db.session.delete(customer)
        db.session.commit()

        response_body = {
            'delete_successful': True,
            'message': 'Customer deleted'
        }

        response = make_response(
            jsonify(response_body),
            200
        )

        return response

api.add_resource(CustomerByID, '/customers/<int:id>')

class Transactions(Resource):
    def get(self):
        transactions = [transaction.to_dict() for transaction in Transaction.query.all()]
        
        response = make_response(
            jsonify(transactions),
            200
        )

        return response

    def post(self):
        new_transaction = Transaction(
            date = request.form['date'],
            item_id = request.form['item_id'],
            customer_id = request.form['customer_id'],
        )

        db.session.add(new_transaction)
        db.session.commit()

        transaction_dict = new_transaction.to_dict()

        response = make_response(
            jsonify(transaction_dict),
            201
        )

        return response

api.add_resource(Transactions, '/transactions')

class TransactionByID(Resource):
    def get(self, id):
        transaction = Transaction.query.filter(Transaction.id == id).first()

        transaction_dict = transaction.to_dict()

        response = make_response(
            jsonify(transaction_dict),
            200
        )

        return response

api.add_resource(TransactionByID, '/transactions/<int:id>')

class Inventory(Resource):
    def get(self):
        items = [item.to_dict() for item in Item.query.all()]

        response = make_response(
            jsonify(items),
            200
        )

        return response

    def post(self):
        new_item = Item(
            name = request.form.get('name'),
            cost = request.form.get('cost'),
            quantity = request.form.get('quantity')
        )

        db.session.add(new_item)
        db.session.commit()

        item_dict = new_item.to_dict()

        reponse = make_response(
            jsonify(item_dict),
            201
        )

        return response

api.add_resource(Inventory, '/inventory')

class InventoryByID(Resource):
    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        item_dict = item.to_dict()
    
        response = make_response(
            jsonify(item_dict),
            200
        )

        return response

    def patch(self, id):
        item = Item.query.filter(Item.id == id).first()

        for attr in request.form:
            setattr(item, attr, request.form.get(atr))

            db.session.add(item)
            db.session.commit()

            customer_dict = customer.to_dict()

            response = make_response(
                jsonify(customer_dict),
                200
            )

            return response

api.add_resource(InventoryByID, '/inventory/<int:id>')

@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response

app.register_error_handler(404, handle_not_found)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

