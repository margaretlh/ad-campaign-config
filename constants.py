"""This module includes the Celery beat schedule for the Crossroads application."""

from datetime import datetime

import pytz
from celery.schedules import crontab


CAMPAIGN_CLICKS_EXPIRATION_DATE = datetime(
    year=2021, month=1, day=1, hour=0, minute=0, second=0, tzinfo=pytz.UTC,
)

# ruff: noqa: ERA001 # Allow commented-out code
CELERY_BEAT_SCHEDULE = {
    # syncs tg clicks to redshift
    "import_tg_clicks": {
        "task": "apps.dwh.tasks.import_tg_clicks",
        "schedule": crontab(minute="*/6"),
    },
    # sync dimension tables to redshift
    "sync_dimension_tables": {
        "task": "apps.dwh.tasks.sync_dimension_tables",
        "schedule": crontab(minute="*/15"),
    },
    # import fraud scores
    "annotate_fraud_scores": {
        "task": "apps.dwh.tasks.annotate_fraud_scores",
        "schedule": crontab(minute="23"),
    },
    # clean up redshift tables
    "spectrum_copy_31_days_ago": {
        "task": "apps.dwh.tasks.spectrum_copy_31_days_ago",
        "schedule": crontab(hour="10", minute="24"),
    },
    # poll statistics from API for TPAs of certain provider types
    "api_poll": {
        "task": "apps.dwh.tasks.hourly_poll",
        "schedule": crontab(minute="0", hour="*/1"),
    },
    "cost_poll": {
        "task": "apps.cost.tasks.quarter_day_poll",
        "schedule": crontab(minute="0", hour="*/6"),
    },
    "history_poll": {
        "task": "apps.dwh.tasks.history_poll",
        "schedule": crontab(minute="28", hour="5"),
    },
    "visymo_history_poll": {
        "task": "apps.dwh.tasks.visymo_history_poll",
        "schedule": crontab(minute="28", hour="6"),
    },
    "clean_fact14_tbl": {
        "task": "apps.dwh.tasks.clean_fact14_tbl",
        "schedule": crontab(minute="24", hour="2"),
    },
    "intraday_cost_poll": {
        "task": "apps.cost.tasks.intraday_cost_poll",
        "schedule": crontab(minute="13", hour="9,10,11,13,14,15"),
    },
    "history_cost_poll": {
        "task": "apps.cost.tasks.history_cost_poll",
        "schedule": crontab(minute="25", hour="7"),
    },
    "intraday_poll_1": {
        "task": "apps.dwh.tasks.intraday_poll",
        "schedule": crontab(minute="30", hour="*/1"),
    },
    # Deactivate White-label Configuration Task
    "deactivate_white_label_configuration": {
        "task": "apps.dwh.tasks.deactivate_whitelabel_configuration",
        "schedule": crontab(minute="30", hour="6, 12, 18"),
    },
    # Todo: Bring this poll back once performance is improved.
    # "intraday_poll_2": {
    #     "task": "apps.dwh.tasks.intraday_poll",
    #     "schedule": crontab(minute=41, hour="*/1"),
    # },
    # syncs trafficguard categories to crossroads
    "trafficguard_category_sync": {
        "task": "apps.main_app.tasks.sync_tg_categories",
        "schedule": crontab(minute="*/45"),
    },
    "score_keywords": {
        "task": "apps.main_app.tasks.score_keywords",
        "schedule": crontab(minute="30", hour="1"),
    },
    "link_unassigned_ads": {
        "task": "apps.main_app.tasks.link_unassigned_ads",
        "schedule": crontab(minute="0", hour="7"),
    },
    "adspeed_impression_polling": {
        "task": "apps.main_app.tasks.get_adspeed_impression_stats",
        "schedule": crontab(minute="30", hour="1"),
    },
    "adspeed_maintenance": {
        "task": "apps.main_app.tasks.adspeed_cleanup_task",
        "schedule": crontab(minute="*/35"),
    },
    "optimize_campaigns": {
        "task": "apps.main_app.tasks.optimize_campaigns",
        "schedule": crontab(minute="34", hour="10"),
    },
    "cost_email_import": {
        "task": "apps.cost.tasks.cost_mail_import",
        "schedule": crontab(minute="*/45"),
    },
    "cost_kw_import": {
        "task": "apps.cost.tasks.adwords_cost_kw_import",
        "schedule": crontab(minute="40", hour="*/6"),
    },
    # 20 minutes after every second hour
    "tg_campaign_auto_match": {
        "task": "apps.cost.tasks.tg_campaign_auto_match",
        "schedule": crontab(minute="28", hour="*/4"),
    },
    "import_fb_subaccs": {
        "task": "apps.cost.tasks.import_facebook_accounts",
        "schedule": crontab(minute="25", hour="17"),
    },
    # mark tpc accs dead if no log received for more than n days
    "mark_dead_tpc_accounts": {
        "task": "apps.cost.tasks.mark_dead_accounts",
        "schedule": crontab(minute="0", hour="10"),
    },
    # calculates kw reports, runs every 6 hrs
    "calculate_kw_reports": {
        "task": "apps.main_app.tasks.calculate_kw_reports",
        "schedule": crontab(minute="31", hour="*/6"),
    },
    "calculate_kw_reports_intraday": {
        "task": "apps.main_app.tasks.calculate_kw_reports_intraday",
        "schedule": crontab(minute="43", hour="*/2"),
    },
    # GCLID sync is currently disabled 2022-02-21 MiB
    "db_maintenance_task": {
        "task": "apps.main_app.tasks.db_maintenance_task",
        "schedule": crontab(minute="22", hour="1"),
    },
    # Operations Tasks
    "operations_sync": {
        "task": "apps.operations.tasks.operations_sync",
        "schedule": crontab(minute="40", hour="6"),
    },
    # Domain Email twice a week (monday, tuesday) at 6 am pst
    "email_seven_day_expired_domains": {
        "task": "apps.operations.tasks.email_seven_day_expired_domains",
        "schedule": crontab(minute="0", hour="6", day_of_week="1,2"),
    },
    "obmedia_get_domains": {
        "task": "apps.operations.tasks.get_obmedia_domains",
        "schedule": crontab(minute="50", hour="*/6"),
    },
    "check_ns_new_domains": {
        "task": "apps.operations.tasks.check_ns_new_domains",
        "schedule": crontab(minute="*/10"),
    },
    # Get all OB Media domains every day at 9:40
    "get_all_ob_domains_data": {
        "task": "apps.operations.tasks.get_all_ob_domains_data",
        "schedule": crontab(minute="40", hour="9"),
    },
    # OB Media Lander Templates Import
    "import_ob_media_lander_templates": {
        "task": "apps.operations.tasks.import_ob_media_lander_templates",
        "schedule": crontab(hour="*/2", minute="57"),
    },
    # Retry Failed OB Media Domains
    "retry_failed_ob_domains": {
        "task": "apps.operations.tasks.retry_failed_ob_domains",
        "schedule": crontab(minute="15"),
    },
    # Accounting Tasks
    "accounting_task": {
        "task": "apps.main_app.tasks.accounting_task",
        "schedule": crontab(minute="26", hour="*/1"),
    },
    ###
    "regular_mailing": {
        "task": "apps.main_app.tasks.regular_mailing",
        "schedule": crontab(minute="30", hour="*/1"),
    },
    "check_data_sanity": {
        "task": "apps.main_app.tasks.check_data_sanity",
        "schedule": crontab(minute="10", hour="*/15"),
    },
    "clean_logs": {
        "task": "apps.main_app.tasks.clean_logs",
        "schedule": crontab(minute="0", hour="4"),
    },
    "send_sl_master_report": {
        "task": "apps.sponsored_links_reporting.tasks.send_sl_master_report",
        "schedule": crontab(minute="35", hour="11", day_of_month="1"),
    },
    # Bulk Data Uploader Tasks
    "check_disappeared_tasks": {
        "task": "apps.data.bulk_uploader.tasks.check_disappeared_tasks",
        "schedule": crontab(minute="*/20"),
    },
    "delete_expired_tasks": {
        "task": "apps.data.bulk_uploader.tasks.delete_expired_tasks",
        "schedule": crontab(minute="0", hour="4"),
    },
    "clients_domains_report_mailing": {
        "task": "apps.main_app.tasks.email_domain_report_task",
        "schedule": crontab(minute="10", hour="4"),
    },
    "send_clickspam_score_report": {
        "task": "apps.main_app.tasks.email_clickspam_score_report_task",
        "schedule": crontab(minute="30", hour="3"),
    },
    "purge_old_notifications": {
        "task": "apps.main_app.tasks.purge_old_notifications",
        "schedule": crontab(minute="0", hour="5"),
    },
    # Status Dashboard
    "run_keyword_optimization_summary_builser": {
        "task": "apps.kw_reports.tasks.build_ab_keyword_summary",
        "schedule": crontab(minute="36", hour="*/6"),
    },
    "send_monthly_single_click_email": {
        "task": "apps.kw_reports.tasks.send_monthly_single_click_email",
        "schedule": crontab(minute="25", hour="10", day_of_month="1"),
    },
    "check_yesterdays_blacklisted_clicks": {
        "task": "apps.blacklist.tasks.check_yesterdays_blacklisted_clicks",
        "schedule": crontab(minute="18", hour="9"),
    },
    "check_todays_blacklisted_clicks": {
        "task": "apps.blacklist.tasks.check_todays_blacklisted_clicks",
        "schedule": crontab(minute="41", hour="*/6"),
    },
    "email_blacklisted_summaries": {
        "task": "apps.blacklist.tasks.email_blacklisted_summaries",
        "schedule": crontab(minute="39", hour="9"),
    },
    "import_channel_report_data": {
        "task": "apps.main_app.tasks.import_channel_run",
        "schedule": crontab(minute="15", hour="*/1"),
    },
    "clear_locked_afs_channels": {
        "task": "apps.main_app.tasks.clear_locked_afs_channels",
        "schedule": crontab(minute="0", hour="0"),
    },
    "drid_data_import": {
        "task": "apps.main_app.tasks.import_drid_data",
        "schedule": crontab(minute="28", hour="*/1"),
    },
    "drid_history_data_import": {
        "task": "apps.main_app.tasks.import_drid_history",
        "schedule": crontab(minute="47", hour="11"),
    },
    "sync_afs_channel_statuses": {
        "task": "apps.campaign_automation.afs.tasks.sync_afs_channel_statuses",
        "schedule": crontab(minute="20", hour="*/1"),
    },
    "scrape_facebook_ad_libraries": {
        "task": "apps.facebook.tasks.scrape_facebook_ad_libraries",
        "schedule": crontab(minute="0", hour="5"),
    },
    "traffic_anomaly_report": {
        "task": "apps.main_app.tasks.traffic_anomaly_report",
        "schedule": crontab(minute="25", hour="3"),
    },
    "spawn_daily_bot_campaigns": {
        "task": "apps.campaign_automation.afs.tasks.spawn_daily_bot_campaigns",
        "schedule": crontab(minute="0", hour="4"),
    },
    "spawn_weekly_bot_campaigns": {
        "task": "apps.campaign_automation.afs.tasks.spawn_weekly_bot_campaigns",
        "schedule": crontab(day_of_week="0", hour="4"),
    },
    "clear_stale_bot_campaigns": {
        "task": "apps.campaign_automation.afs.tasks.clear_stale_bot_campaigns",
        "schedule": crontab(minute="0", hour="2"),
    },
    "update_category_embeddings": {
        "task": "apps.main_app.tasks.update_category_embeddings",
        "schedule": crontab(minute="35", hour="*/1"),
    },
    "redshift_maintenance": {
        "task": "apps.dwh.tasks.redshift_maintenance",
        "schedule": crontab(hour="21,5", minute="28"),
    },
    "postback_pangle_domain_data": {
        "task": "apps.data.pangle_postback.domain_level.tasks.postback_3d",
        "schedule": crontab(minute="45", hour="4"),
    },
    # Tapstone Revenue Tasks.
    "tapstone_fetch_revenue_yesterday": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_yesterday",
        "schedule": crontab(minute="0", hour="*/1"),
    },
    "tapstone_fetch_revenue_seven_days": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_seven_days",
        "schedule": crontab(minute="0", hour="*/6"),
    },
    "tapstone_fetch_revenue_intraday": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_intraday",
        "schedule": crontab(minute="5", hour="*/1"),
    },
    # Inuvo Revenue Tasks.
    "inuvo_fetch_revenue_yesterday": {
        "task": "api_inuvo.tasks.process_inuvo_revenue_yesterday",
        "schedule": crontab(minute="10", hour="*/1"),
    },
    "inuvo_fetch_revenue_seven_days": {
        "task": "api_inuvo.tasks.process_inuvo_revenue_seven_days",
        "schedule": crontab(minute="5", hour="*/6"),
    },
    "inuvo_fetch_revenue_intraday": {
        "task": "api_inuvo.tasks.process_inuvo_revenue_intraday",
        "schedule": crontab(minute="15", hour="*/1"),
    },
    "tapstone_fetch_revenue_yesterday_rsoc": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_yesterday_rsoc",
        "schedule": crontab(minute="3", hour="*/1"),
    },
    "tapstone_fetch_revenue_seven_days_rsoc": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_seven_days_rsoc",
        "schedule": crontab(minute="4", hour="*/6"),
    },
    "tapstone_fetch_revenue_intraday_rsoc": {
        "task": "api_tapstone.tasks.process_tapstone_revenue_intraday_rsoc",
        "schedule": crontab(minute="8", hour="*/1"),
    },
    # Adsense Revenue Tasks.
    "adsense_fetch_revenue_yesterday": {
        "task": "api_adsense.tasks.process_adsense_revenue_yesterday",
        "schedule": crontab(minute="20", hour="*/1"),
    },
    "adsense_fetch_revenue_seven_days": {
        "task": "api_adsense.tasks.process_adsense_revenue_seven_days",
        "schedule": crontab(minute="10", hour="*/6"),
    },
    "adsense_fetch_revenue_intraday": {
        "task": "api_adsense.tasks.process_adsense_revenue_intraday",
        "schedule": crontab(minute="25", hour="*/1"),
    },
    # Airfind Revenue Tasks.
    "airfind_fetch_revenue_yesterday": {
        "task": "api_airfind.tasks.process_airfind_revenue_yesterday",
        "schedule": crontab(minute="30", hour="*/1"),
    },
    "airfind_fetch_revenue_seven_days": {
        "task": "api_airfind.tasks.process_airfind_revenue_seven_days",
        "schedule": crontab(minute="15", hour="*/6"),
    },
    "airfind_fetch_revenue_intraday": {
        "task": "api_airfind.tasks.process_airfind_revenue_intraday",
        "schedule": crontab(minute="35", hour="*/1"),
    },
    # Visymo Revenue Tasks.
    "visymo_fetch_revenue_yesterday": {
        "task": "api_visymo.tasks.process_visymo_revenue_yesterday",
        "schedule": crontab(minute="40", hour="*/1"),
    },
    "visymo_fetch_revenue_seven_days": {
        "task": "api_visymo.tasks.process_visymo_revenue_seven_days",
        "schedule": crontab(minute="20", hour="*/6"),
    },
    "visymo_fetch_revenue_intraday": {
        "task": "api_visymo.tasks.process_visymo_revenue_intraday",
        "schedule": crontab(minute="45", hour="*/1"),
    },
    # OBMedia RSOC Revenue Tasks.
    "obmedia_fetch_revenue_yesterday": {
        "task": "api_obmedia.tasks.process_obmedia_revenue_yesterday",
        "schedule": crontab(minute="50", hour="*/1"),
    },
    "obmedia_fetch_revenue_seven_days": {
        "task": "api_obmedia.tasks.process_obmedia_revenue_seven_days",
        "schedule": crontab(minute="25", hour="*/6"),
    },
    "obmedia_fetch_revenue_intraday": {
        "task": "api_obmedia.tasks.process_obmedia_revenue_intraday",
        "schedule": crontab(minute="55", hour="*/1"),
    }
}
