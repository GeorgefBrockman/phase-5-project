#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
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

@app.route('/customers', methods=['GET', 'POST'])
def customers():
    
    if request.method == 'GET':
        customers = []
        for customer in Customer.query.all():
            customer_dict = customer.to_dict()
            customers.append(customer_dict)

        response = make_response(
            customers,
            200
        )

        return response

    elif request.method == 'POST':
        new_customer = Customer(
            name = request.form.get('name'),
            email = request.form.get('email'),
            number = request.form.get('number'),
        )

        db.session.add(new_customer)
        db.session.commit()

        customer_dict = new_customer.to_dict()

        response = make_response(
            customer_dict,
            201
        )

        return response

@app.route('/customers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def customer_by_id(id):
    customer = Customer.query.filter(Customer.id == id).first()

    if customer == None:
        response_body = {
            'message': 'This customer does not exist in our database. Please try again'
        }

        response = make_response(
            response_body,
            404
        )

        return response

    else:
        if request.method == 'GET':
            customer_dict = customer.to_dict()

            response = make_response(
                customer_dict,
                200
            )

            return response

        elif request.method == 'PATCH':
            for attr in request.form:
                setattr(customer, attr, request.form.get(atr))

            db.session.add(customer)
            db.session.commit()

            customer_dict = customer.to_dict()

            response = make_response(
                customer_dict,
                200
            )

            return response

        elif request.method == 'DELETE':
            db.session.delete(customer)
            db.session.commit()

            response_body = {
                'delete_successful': True,
                'message': 'Customer deleted'
            }

            response = make_response(
                response_body,
                200
            )

            return response

@app.route('/transactions', methods=['GET', 'POST'])
def transactions():
    if request.method == 'GET':
        transactions = []
        
        for transaction in Transaction.query.all():
            transaction_dict = transaction.to_dict()
            transactions.append(transaction_dict)

        response = make_response(
            transactions,
            200
        )

        return response

    elif request.method == 'POST':
        new_transaction = Transaction(
            date = request.form.get('date'),
            item_id = request.form.get('item_id'),
            customer_id = request.form.get('customer_id')
        )

        db.session.add(new_transaction)
        db.session.commit()

        transaction_dict = new_transaction.to_dict()
        
        response = make_response(
            transaction_dict,
            201
        )

@app.route('transactions/<int:id>', methods=['GET'])
def transaction_by_id(id):
    transaction = Transaction.query.filter(Transaction.id == id).first()

    if transaction = None:
        response_body = {
            'message': 'This transaction does not exist in this database. Please try again.'
        }

        response = make_response(
            response_body,
            404
        )

        return response

    else:
        transaction_dict = transaction.to_dict()

        response = make_response(
            transaction_dict,
            200
        )

        return response

@app.route('/inventory', methods=['GET', 'POST'])
def inventory():
    if request.method == 'GET':
        items = []
        
        for item in Item.query.all():
            item_dict = item.to_dict()
            items.append(item_dict)

        response = make_response(
            items,
            200
        )

        return response

    elif request.method == 'POST':
        new_item = Item(
            name = request.form.get('name'),
            cost = request.form.get('cost'),
            quantity = request.form.get('quantity')
        )

        db.session.add(new_item)
        db.session.commit()

        item_dict = new_item.to_dict()

        reponse = make_response(
            item_dict,
            201
        )

        return response

@app.route('/inventory/<int:id>', methods=['GET', 'PATCH'])
def inventory_by_id(id):
    item = Item.query.filter(Item.id == id).first()

    if item = None:
        response_body = {
            'message': 'This item does not exist in this database. Please try again.'
        }

        response = make_response(
            response_body,
            404
        )

        return response

    else:
        if request.method == 'GET'
            item_dict = item.to_dict()
    
            response = make_response(
                item_dict,
                200
            )
    
            return response
        
        elif request.method == 'PATCH':
            for attr in request.form:
                setattr(item, attr, request.form.get(atr))

            db.session.add(item)
            db.session.commit()

            customer_dict = customer.to_dict()

            response = make_response(
                customer_dict,
                200
            )

            return response

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

