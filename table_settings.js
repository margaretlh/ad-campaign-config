// contains common table settings for bootstrapTable library

const settings = {};

const commonSettings = {
    showFooter: true,
    footerStyle() {
        return {
            css: {
                'font-weight': 'bold',
            },
        };
    },
};

settings.report_table = $.extend({}, commonSettings, {
    search: false,
});

module.exports = {
    settings,
};
