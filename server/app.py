#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Customer

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/customers', methods=['GET', 'POST'])
def customers():
    pass

@app.route('/customers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def customer_by_id():
    pass

@app.route('/transactions', methods=['GET', 'POST'])
def transactions():
    pass

@app.route('transactions/<int:id>', methods=['GET'])
def transaction_by_id():
    pass

@app.route('/inventory', methods=['GET', 'POST'])
def inventory():
    pass

@app.route('/inventory/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def inventory_by_id():
    pass

if __name__ == '__main__':
    app.run(port=5555, debug=True)

