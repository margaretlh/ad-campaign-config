# ruff: noqa: ANN001, ANN003, ARG002, D102
"""
Django database router classes to control all database operations for the various
databases or applications.
"""


class SnowflakeDatabaseRouter:
    """
    The Snowflake database router to control all database operations within the
    Snowflake ecosystem.

    Notes:
    When making changes to any models that are managed by Snowflake, the migrations
    will reside in Snowflake and not in the default database - they are completely separate.

    Typically, migrations will be applied as follows:
    - pipenv run python manage.py migrate api_snowflake --database=snowflake

    References:
    - https://docs.djangoproject.com/en/dev/topics/db/multi-db/
    """
    app_label = "api_snowflake"
    database = "snowflake_platforms_crossroads"

    def db_for_read(self, model, **hints) -> str | None:
        """
        Make sure that read operations for `api_snowflake` models only occur in
        the "snowflake_platforms" database.
        """
        # noinspection PyProtectedMember
        if model._meta.app_label == self.app_label: # noqa: SLF001
            return self.database
        return None

    def db_for_write(self, model, **hints) -> str | None:
        """
        Make sure that write operations for `api_snowflake` models only occur in
        the "snowflake_platforms" database.
        """
        # noinspection PyProtectedMember
        if model._meta.app_label == self.app_label: # noqa: SLF001
            return self.database
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints) -> bool | None:
        """
        Make sure the `api_snowflake` models only appear in the "snowflake_platforms"
        database.
        """
        # noinspection PyProtectedMember
        if app_label == self.app_label:
            return db == self.database
        return None


class DefaultDatabaseRouter:
    """
    A database router to control all database operations for the various databases
    or applications.

    References:
    - https://docs.djangoproject.com/en/dev/topics/db/multi-db/
    """
    database = "default"

    def db_for_read(self, model, **hints) -> str:
        str_model = str(model).split("\'")[1]
        if "apps.data.trafficguard.models" in str_model:
            return "traffic_guard_reader"
        if "apps.dwh.models" in str_model:
            return "redshift"
        return self.database

    def db_for_write(self, model, **hints) -> str:
        str_model = str(model).split("\'")[1]
        if "apps.data.trafficguard.models" in str_model:
            return "traffic_guard_reader"
        if "apps.dwh.models" in str_model:
            return "redshift"
        return self.database

    def allow_relation(self, obj1, obj2, **hints) -> bool:
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints) -> bool:
        return db == self.database
