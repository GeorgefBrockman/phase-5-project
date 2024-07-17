#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        customers = []

        for n in 10:
            customer = Customer(
                name = fake.name(), 
                email = fake.email(), 
                number = fake.numerify(text = "%#########")
            )

            customers.append(customer)

        db.session.add_all(customers)
        db.session.commit()

        items = []

        item_names = [
            'Shoes', 'T-Shirt', 'Jeans', 'Sweatpants', 'Sweatshirt', 'Hat',
            'Socks', 'Hoodie', 'Jacket', 'Bracelet'
        ]
        
        for item_name in item_names:
            item = Item(
                name = item_name,
                cost = round(random.uniform(5.00, 100.00), 2),
                quantity = randint(1, 20)
            )

            items.append(item)

        db.session.add_all(items)
        db.session.commit()

        # Seed code goes here!
