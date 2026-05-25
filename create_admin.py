"""
Create or update an admin user for the MarshaK Designs admin portal.
"""

from getpass import getpass
from app import app, db, Admin
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()

    username = input("Enter admin username: ").strip()
    password = getpass("Enter admin password: ")

    if not username:
        print("Username cannot be empty.")
        exit()

    if len(password) < 8:
        print("Password must be at least 8 characters.")
        exit()

    existing_admin = Admin.query.filter_by(username=username).first()

    if existing_admin:
        existing_admin.password = generate_password_hash(password)
        db.session.commit()
        print(f'Admin "{username}" updated successfully.')
    else:
        admin = Admin(
            username=username,
            password=generate_password_hash(password)
        )
        db.session.add(admin)
        db.session.commit()
        print(f'Admin "{username}" created successfully.')