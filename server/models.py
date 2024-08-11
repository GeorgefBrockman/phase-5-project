from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    serialize_rules = ('-transactions.customer',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    number = db.Column(db.String)

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Failed simple email validation")
        return address

    @validates('number')
    def validate_number(self, key, phone):
        if (len(phone) != 10) and (not phone.isnumeric()):
            raise ValueError("Failed simple number validation")
        return phone

    transactions = db.relationship('Transaction', back_populates='customer')

    items = association_proxy('transactions', 'item', creator=lambda item_obj: Transaction(item=item_obj))

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    serialize_rules = ('-transactions.item',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    cost = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    @validates('cost', 'quantity')
    def validate_number(self, key, number):
        if number < 0:
            raise ValueError('Failed simple number validation')
        return number

    transactions = db.relationship('Transaction', back_populates='item')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    serialize_rules = ('-item.transactions', '-customer.transactions',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)

    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    item = db.relationship('Item', back_populates="transactions")
    customer = db.relationship('Customer', back_populates="transactions")
    employee = db.relationship('Employee', back_populates="transactions")

class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'

    serialize_rules = ('-transactions.employee',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    items_sold = db.Column(db.Integer)
    value_sold = db.Column(db.Float)

    transactions = db.relationship('Transaction', back_populates='employee')