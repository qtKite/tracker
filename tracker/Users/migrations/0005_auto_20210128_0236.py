# Generated by Django 3.1.5 on 2021-01-27 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0004_auto_20210128_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]