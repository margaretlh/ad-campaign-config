/* global swal */

/**
 * Init ajax request
 * @param sites
 * @param zones
 * @param ads
 */
function init({ username }) {
    /**
     * Init ajax request
     * @param startDate
     * @param endDate
     */
    function keywordBySite(startDate, endDate) {
        const iop = new Promise(resolve => {
            resolve(sites);
        });

        swal({
            title: 'Please select a site',
            input: 'select',
            inputOptions: iop,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm(site) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 500);
                });
            },
            allowOutsideClick: false,
        }).then(site => {
            // jquery redirect
            const suffix = `&start_date=${startDate}&end_date=${endDate}`;
            const url = `/sl_reports/?report=master_keyword_by_site&site=${site}${suffix}`;

            window.location.replace(url);
        });
    }

    $('#quick_reports_form').submit(e => {
        e.preventDefault();

        let target = '';
        const startDate = $('#id_start_date').val();
        const endDate = $('#id_end_date').val();
        const report = $('#id_quick_reports').val();
        let suffix = '';

        if (startDate) {
            suffix += `&start_date=${startDate}`;
        }

        if (endDate) {
            suffix += `&end_date=${endDate}`;
        }

        switch (report) {
            case 'master_category':
                target = `/sl_reports/?report=master_category${suffix}`;
                break;

            case 'master_keyword':
                target = `/sl_reports/?report=master_keyword${suffix}`;
                break;

            case 'master_keyword_by_site':
                keywordBySite(startDate, endDate);

                return;

            case 'master_ad':
                target = `/sl_reports/?report=master_ad${suffix}`;
                break;

            case 'sub_id':
                target = `?report=sub_id&publisher=${username}${suffix}`;
                break;

            case 'tg_sub_id':
                target = `?report=tg_sub_id&publisher=${username}${suffix}`;
                break;

            default:
                return;
        }
        window.location = target;
    });
}

module.exports = {
    init,
};
