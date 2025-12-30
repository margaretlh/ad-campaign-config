"""
This module contains the `BaseManagementCommand` class. It contains the common
methods and attributes that are shared by the child classes.

Classes:
    BaseManagementCommand
    Methods:
        get_command_name
        logger_start
        logger_end
        handle_exception
        result_output
"""
import json
import logging
import traceback

from django.conf import settings
from django.core.management.base import BaseCommand

from core.utilities import get_date_time_now


class BaseManagementCommand(BaseCommand):
    """
    This module contains the `BaseManagementCommand` class. It contains the common
    methods and attributes that are shared by the child classes.
    """
    help = "The base management command shared with child classes."
    result = {"status": True}
    logger = logging.getLogger("management_commands")

    def get_command_name(self) -> str:
        """
        Gets the name of the current management command being executed.
        Returns the command name without the "management.commands." prefix.
        """
        # Strip off everything before the actual command name
        # e.g.: "myapp.management.commands.my_command" becomes "my_command".
        module_name = self.__module__
        return module_name.rsplit(".", maxsplit=1)[-1]

    def logger_start(self) -> None:
        """
        Log the start of command execution with a timestamp.
        Adds a log entry with START marker and current timestamp.
        """
        timestamp = get_date_time_now(formatting="%Y-%m-%d %H:%M:%S")
        self.logger.info("START: %s [%s]", settings.LOGGER_LINES, timestamp)

    def logger_end(self) -> None:
        """
        Log the end of command execution with a timestamp.
        Adds a log entry with END marker and current timestamp.
        """
        timestamp = get_date_time_now(formatting="%Y-%m-%d %H:%M:%S")
        self.logger.info("END: %s [%s]", settings.LOGGER_LINES, timestamp)

    def handle_exception(self, exception: Exception) -> None:
        """
        Handle exceptions that occur during command execution.
        Updates the result status, logs the error, and writes to stderr.

        Args:
            exception: The exception that was raised during command execution
        """
        command_name = self.get_command_name()
        self.result["status"] = False
        self.result["message"] = traceback.format_exc(limit=5)
        self.stderr.write(
            self.style.ERROR(f"Exception: {exception}")
        )
        self.logger.exception("%s", command_name)

    def result_output(self) -> None:
        """
        Output the final result of the command execution.
        Writes the result dictionary as JSON to stdout.
        """
        self.stdout.write(json.dumps(self.result))
