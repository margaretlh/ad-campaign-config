const {
    settings: commonColumnSettings,
} = require('./column_settings');
const {
    settings: commonTableSettings,
} = require('./table_settings');


/**
 * Draw table form table data
 */
function drawTable(context) {
    const data = context.data
    const columns = [
        $.extend({}, commonColumnSettings.string_column, {
            field: 'keyword',
            title: 'Keyword',
            width: 180,
            footerFormatter() {
                return 'Total:';
            },
        }),
        commonColumnSettings.filtered_visitors,
        commonColumnSettings.visitors,
        commonColumnSettings.cost_clicks,
        commonColumnSettings.lander_searches,
        commonColumnSettings.revenue_events,
        commonColumnSettings.ctr,
        commonColumnSettings.rpc,
        commonColumnSettings.rpv,
        commonColumnSettings.cost,
        commonColumnSettings.cpc,
        commonColumnSettings.rppc,
        commonColumnSettings.roi,
        commonColumnSettings.publisher_revenue,
        $.extend({}, commonColumnSettings.total_revenue, {
            visible: context.is_admin,
        }),
        commonColumnSettings.profit,
    ];

    $('#kw-profit-tbl').bootstrapTable(
        $.extend({}, commonTableSettings.report_table, {
            data,
            columns,
            // hide footer in case of empty data
            showFooter: Boolean(data.length),
        }),
    );
}

function initMenuToggle() {
    var hide = false;
    $('.cmenu-toggle').click(function () {
        hide = !hide;
        if (hide) {
            $('#campaign-content').removeClass('col-lg-10 col-md-10 col-sm-9');
            $('#campaign-content').addClass('col-lg-12 col-md-12 col-sm-12');
            $('.sidebar-div').hide();
        } else {
            $('#campaign-content').removeClass('col-lg-12 col-md-12 col-sm-12');
            $('#campaign-content').addClass('col-lg-10 col-md-10 col-sm-9');
            $('.sidebar-div').show();
        }

        $('#kw-profit-tbl').bootstrapTable('resetWidth')
    })
}
/**
 * Init google charts
 */
function init(context) {
    drawTable(context)
    initMenuToggle()
}

module.exports = {
    init,
};
