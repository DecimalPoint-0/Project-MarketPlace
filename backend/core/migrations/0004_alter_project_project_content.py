# Generated by Django 4.2 on 2024-11-23 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_category_options_softwares_project_payments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='project_content',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='project-content/'),
        ),
    ]