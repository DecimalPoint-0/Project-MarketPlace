from django.core.management.base import BaseCommand
# from django.contrib.auth.models import User
from core.models import Property, PropertyType, PropertyImage, User
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seeds the database with initial data for admin, users, landlords, agents, and properties'

    def handle(self, *args, **kwargs):
        # Create Admin User
        if not User.objects.exists():
            admin = User.objects.create_superuser(
                email='admin@example.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Admin user created successfully'))

        # Create Regular User
        if not User.objects.exists():
            user = User.objects.create_user(
                email='user@example.com',
                password='user123'
            )
            self.stdout.write(self.style.SUCCESS('Regular user created successfully'))

        # Create Landlord/Agent
        if not User.objects.filter(is_landlord=True).exists():
            landlord = User.objects.create_user(
                email='landlord@example.com',
                password='landlordpassword'
            )
            landlord.is_landlord = True
            landlord.save()
            self.stdout.write(self.style.SUCCESS('Landlord/Agent created successfully'))

        # Create property type
        if not PropertyType.objects.exists():
            PropertyType.objects.create(title='Apartment')
            PropertyType.objects.create(title='Villa')
            PropertyType.objects.create(title='House')
            self.stdout.write(self.style.SUCCESS('Property types created successfully'))
        
        # Create Sample Properties
        if not Property.objects.exists():  # Prevent duplicate entries
            propty1 = Property.objects.create(
                title='Modern Apartment',
                description='A beautiful 2-bedroom apartment in the city center.',
                property_type=PropertyType.objects.get(id=1),
                rental_type="Per Annum",
                price=150000,
                state='Kogi State',
                lga='Lokoja',
                toilets=1,
                bedroom=2,
                kitchen=1,
                available=True,
                address='123 Main St, Kogi State',
                author=User.objects.get(email='landlord@example.com')
            )

            propty2 = Property.objects.create(
                title='Luxury Villa',
                description='Spacious villa with a swimming pool.',
                property_type=PropertyType.objects.get(id=2),
                rental_type="Per Session",
                price=500000,
                state='Kogi State',
                lga='Lokoja',
                toilets=2,
                bedroom=3,
                kitchen=1,
                available=True,
                address='123 Main St, Kogi State',
                author=User.objects.get(email='landlord@example.com')
            )
            self.stdout.write(self.style.SUCCESS('Sample properties created successfully'))

            PropertyImage.objects.bulk_create([
                PropertyImage(
                    property=propty1,
                    image="image/upload/v1731337064/xsj1ubnq62i8qcy0qmes.jpg",
                    title="Modern Apartment"
                ),
                PropertyImage(
                    property=propty2,
                    image="image/upload/v1731337064/xsj1ubnq62i8qcy0qmes.jpg",
                    title="Luxury Villa"
                )
            ])
            self.stdout.write(self.style.SUCCESS('Sample property images created successfully'))

        self.stdout.write(self.style.SUCCESS('Database seeding completed!'))

