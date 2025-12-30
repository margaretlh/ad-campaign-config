"""
A management command used to process revenue data based on a ThirdPartyAccount,
Type and date range.

It extends the `BaseManagementCommand`.
"""
import importlib
import zoneinfo
from datetime import datetime, timedelta

from django.core.management import CommandError
from django.core.management.base import CommandParser

from apps.data.models import ThirdPartyAccount
from core.management.commands.base import BaseManagementCommand


class Command(BaseManagementCommand):
    """
    This updates the `BaseDate` table in the database.
    """
    help = (
        "Process revenue data for a specific date range and ThirdPartyAccount "
        "or ThirdPartyAccount email"
    )

    def add_arguments(self, parser: CommandParser) -> None:
        """Add command line arguments to the parser.

        Args:
            parser: The command argument parser
        """
        parser.add_argument(
            "-sd", "--start-date",
            type=str,
            required=True,
            help="Start date in YYYY-MM-DD format",
        )
        parser.add_argument(
            "-ed", "--end-date",
            type=str,
            required=True,
            help="End date in YYYY-MM-DD format",
        )
        parser.add_argument(
            "-t", "--tpa_id",
            type=str,
            required=True,
            help="ThirdPartyAccount ID",
        )

    def handle(self, **options: str) -> None:
        """Handle the command execution.

        Args:
            **options: Command line arguments
        """
        self.logger_start()

        try:
            # Convert string dates to datetime objects with timezone.
            tz = zoneinfo.ZoneInfo("UTC")

            start_date = datetime.strptime(
                options["start_date"],
                "%Y-%m-%d"
            ).replace(tzinfo=tz)

            end_date = datetime.strptime(
                options["end_date"],
                "%Y-%m-%d"
            ).replace(tzinfo=tz)

            tpa_id = options["tpa_id"]

            try:
                third_party_account = ThirdPartyAccount.objects.get(id=tpa_id)
            except ThirdPartyAccount.DoesNotExist as err:
                error_msg = f"ThirdPartyAccount with ID {tpa_id} does not exist."
                raise CommandError(error_msg) from err

            # Get the ThirdPartyAccount Type.
            third_party_account_type = ThirdPartyAccount.Type(third_party_account.type)
            # Get the Provider Name.
            provider_name = third_party_account_type.name.lower()

            # Dynamically import the task module for the provider.
            try:
                # Special case for OBMedia RSOC.
                if provider_name == "obmedia_rsoc":
                    provider_name = "obmedia"
                # This will convert the provider name to the task module name.
                # I.E - api_visymo.tasks.
                module_name = f"api_{provider_name}.tasks"
                task_module = importlib.import_module(module_name)

                # This will get the task e.g. process_visymo_revenue_date.
                task_name = f"process_{provider_name}_revenue_date"
                task_function = getattr(task_module, task_name)

                # Iterate through dates and call the task function.
                date_counter = start_date
                while date_counter <= end_date:
                    # Convert datetime to string format for the task.
                    reporting_date = date_counter.strftime("%Y-%m-%d")
                    self.logger.info(
                        "Processing %s for %s on %s",
                        task_name,
                        third_party_account_type.name,
                        reporting_date,
                    )
                    # Run the task with string date.
                    task_function(reporting_date)
                    date_counter += timedelta(days=1)

            except (ImportError, AttributeError) as ex:
                error_msg = "Could not find revenue processing task for %s: %s"
                raise CommandError(
                    error_msg,
                    third_party_account_type.name,
                    ex,
                ) from ex

        except (CommandError, ImportError, AttributeError):
            raise
        except Exception as ex:  # noqa: BLE001
            self.handle_exception(ex)

        self.logger_end()
        self.result_output()
