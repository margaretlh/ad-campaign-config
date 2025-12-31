// contains common columns definitions for report tables

const numeral = require('numeral');

// maps field to appropriate column settings object
const settings = {};

const commonColumn = {
    sortable: true,
    align: 'right',
};

/**
 * @description Definition of base integer column to use in report tables
 * Uses specific format to render its values
 * Sums its values to render its footer
 */
const reportIntegerColumn = $.extend({}, commonColumn, {
    formatter(value) {
        return numeral(Number(value)).format('0,0');
    },
    footerFormatter(data) {
        const column = data.map(obj => obj[this.field]);
        const sum = column.reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(sum).format('0,0');
    },
});

const reportRevenueColumn = $.extend({}, commonColumn, {
    formatter(value) {
        return numeral(Number(value)).format('$0,0.00');
    },
    footerFormatter(data) {
        const column = data.map(obj => obj[this.field]);
        const sum = column.reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(sum).format('$0,0.00');
    },
});

const reportFloatingPointColumn = $.extend({}, commonColumn, {
    formatter(value) {
        return numeral(Number(value)).format('0,0.00');
    },
    footerFormatter(data) {
        const column = data.map(obj => obj[this.field]);
        const sum = column.reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(sum).format('0,0.00');
    },
});

settings.common_column = $.extend({}, commonColumn);

settings.string_column = $.extend({}, commonColumn, {});

settings.ctr = $.extend({}, commonColumn, {
    field: 'ctr',
    title: 'CTR (%)',
    formatter(value) {
        return `${numeral(Number(value)).format('0,0.00')}%`;
    },
    footerFormatter(data) {
        const revenueEventsColumn = data.map(obj => obj.revenue_events);
        const validVisitorsColumn = data.map(obj => obj.filtered_visitors);

        const revenueEvents = revenueEventsColumn.reduce(
            (a, b) => Number(a) + Number(b),
            0,
        );
        const validVisitors = validVisitorsColumn.reduce(
            (a, b) => Number(a) + Number(b),
            0,
        );

        const footerValue = revenueEvents / validVisitors * 100;

        return numeral(footerValue).format('0.00') + '%';
    },
});

settings.rpc = $.extend({}, reportFloatingPointColumn, {
    field: 'rpc',
    title: 'RPC',
    footerFormatter(data) {
        const revenueEvents = data
            .map(obj => obj.revenue_events)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const publisherRevenue = data
            .map(obj => obj.publisher_revenue)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(publisherRevenue / revenueEvents).format('0,0.00');
    },
});

settings.sl_rpm = $.extend({}, reportFloatingPointColumn, {
    field: 'rpm',
    title: 'RPM',
    footerFormatter(data) {
        const rpm = data
            .map(obj => obj.rpm)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(rpm).format('0,0.00');
    },
});

settings.rpm = $.extend({}, reportFloatingPointColumn, {
    field: 'rpm',
    title: 'RPM',
    footerFormatter(data) {
        const validVisitors = data
            .map(obj => obj.filtered_visitors)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const publisherRevenue = data
            .map(obj => obj.publisher_revenue)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(publisherRevenue / (validVisitors / 1000)).format('0,0.00');
    },
});

settings.rpv = $.extend({}, reportFloatingPointColumn, {
    field: 'rpv',
    title: 'RPV',
    footerFormatter(data) {
        const validVisitors = data
            .map(obj => obj.filtered_visitors)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const publisherRevenue = data
            .map(obj => obj.publisher_revenue)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(publisherRevenue / validVisitors).format('0,0.00');
    },
});

settings.revenue_events = $.extend({}, reportIntegerColumn, {
    field: 'revenue_events',
    title: 'Revenue Events',
});

settings.lander_searches = $.extend({}, reportIntegerColumn, {
    field: 'lander_searches',
    title: 'Lander Searches',
});

settings.total_revenue = $.extend({}, reportRevenueColumn, {
    field: 'total_revenue',
    title: '100% Revenue',
});

settings.publisher_revenue = $.extend({}, reportRevenueColumn, {
    field: 'publisher_revenue',
    title: 'Pub Revenue',
});

settings.visitors = $.extend({}, reportIntegerColumn, {
    field: 'visitors',
    title: 'Lander Visits',
});

settings.page_views = $.extend({}, reportIntegerColumn, {
    field: 'page_views',
    title: 'Page Views',
});

settings.filtered_visitors = $.extend({}, reportIntegerColumn, {
    field: 'filtered_visitors',
    title: 'Visitors',
});

settings.cost = $.extend({}, reportFloatingPointColumn, {
    field: 'cost',
    title: 'Cost',
});

settings.impressions = $.extend({}, reportIntegerColumn, {
    field: 'impressions',
    title: 'Impressions',
});

settings.cost_clicks = $.extend({}, reportIntegerColumn, {
    field: 'cost_clicks',
    title: 'Purchased Clicks',
});

settings.conversions = $.extend({}, reportIntegerColumn, {
    field: 'conversions',
    title: 'Conversions',
});


settings.cpc = $.extend({}, reportFloatingPointColumn, {
    field: 'cpc',
    title: 'CPC',
    footerFormatter(data) {
        const cost = data
            .map(obj => obj.cost)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const cost_clicks = data
            .map(obj => obj.cost_clicks)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(cost / cost_clicks).format('0,0.00');
    },
});

settings.cpa = $.extend({}, reportFloatingPointColumn, {
    field: 'cpa',
    title: 'CPA',
    footerFormatter(data) {
        const cost = data
            .map(obj => obj.cost)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const revenue_events = data
            .map(obj => obj.revenue_events)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(cost / revenue_events).format('0,0.00');
    },
});

settings.rppc = $.extend({}, reportFloatingPointColumn, {
    field: 'rppc',
    title: 'RPPC',
    footerFormatter(data) {
        const bought_clicks = data
            .map(obj => obj.cost_clicks)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const publisherRevenue = data
            .map(obj => obj.publisher_revenue)
            .reduce((a, b) => Number(a) + Number(b), 0);

        return numeral(publisherRevenue / bought_clicks).format('0,0.00');
    },
});

settings.roi = $.extend({}, reportFloatingPointColumn, {
    field: 'roi',
    title: 'ROI (%)',
    formatter(value) {
        return `${numeral(Number(value)).format('0,0.00')}%`;
    },
});

settings.profit = $.extend({}, reportFloatingPointColumn, {
    field: 'profit',
    title: 'Profit',
});

module.exports = {
    settings,
};
