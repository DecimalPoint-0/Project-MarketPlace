
from core import models

def create_payment(item, user, amount):
    # models.Payments.objects.get_or_create(
    #     user=user,
    #     item=item,
    #     amount= amount,
    #     status="Pending",
    #     payment_reference=response_data['data']['reference']
    # )
    pass
def update_payment(payment, status):
    pass

def credit_wallet(user, amount):
    pass
