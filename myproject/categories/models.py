from django.db import models

class Product(models.Model):
    category = models.CharField(max_length=255)
    url = models.URLField()
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    MRP = models.DecimalField(max_digits=10, decimal_places=2)
    last_7_day_sale = models.TextField(blank=True, null=True)
    available_skus = models.JSONField(default=list)  # Use JSONField for lists
    fit = models.CharField(max_length=255)
    fabric = models.CharField(max_length=255)
    neck = models.CharField(max_length=255)
    sleeve = models.CharField(max_length=255)
    pattern = models.CharField(max_length=255)
    length = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
