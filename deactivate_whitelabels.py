from datetime import date

from myapp.models import WhiteLabelConfiguration, WLPublisher, WLShareRule

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Deactivates White Label Configurations scheduled for today."

    def handle(self, *args, **kwargs):
        today = date.today()
        configs = WhiteLabelConfiguration.objects.filter(deactivation_date=today, active=True)

        for config in configs:
            # Get all publishers associated with this White Label Configuration
            publishers = WLPublisher.objects.filter(configuration=config).values_list("publisher", flat=True)

            # Reset revenue share
            WLShareRule.objects.filter(owner_id__in=publishers).update(percentage=1.0)

            # Deactivate configuration
            config.active = False
            config.deactivation_date = None  # Clear the scheduled date
            config.save()

            self.stdout.write(self.style.SUCCESS(f"Deactivated White Label Config: {config.id}"))
