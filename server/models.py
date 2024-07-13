from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    number = db.Column(db.String)

    transactions = db.relationship('Transaction', back_populates='customers')

    items = association_proxy('transactions', 'item', creator=lambda item_obj: Transaction(item=item_obj))

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    cost = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    transactions = db.relationship('Transaction', back_populates='items')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)

    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    items = db.relationship('Item', back_populates="transactions")
    customers = db.relationship('Customer', back_populates="transactions")