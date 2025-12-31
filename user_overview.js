const moment = require('moment');
const Spinner = require('./spinner');
function init(userId, isAdmin) {
    $('#subid-export').click(function (e) {
        e.preventDefault();
        let data = $(e.target).data();
        let startDate = moment(data.startDate);
        let endDate = moment(data.endDate);
        let diff = endDate.diff(startDate, 'days') + 1;
        let maxDays = 5;
        if (userId == 566) {
            maxDays = 15;
        }
        if (diff > maxDays) {
            swal({
                title: 'Error!',
                text: `Cannot export ${diff} days worth of data. Max is ${maxDays} days`,
                type: 'error',
            })
        } else {
            window.location = `/admin/trafficguard/user/${userId}/subid_export/?start_date=${data.startDate}&end_date=${data.endDate}`
        }
    })

    $('.click-favorite').click(function () {
        var target = $('#spinner-wrapper')
        target.show()
        var spinner = new Spinner(target[0]);
        const self = $(this);
        let href = $(this).data("href");
        if ($(this).hasClass('heart-hl')) {
            href += '0';
        }
        else {
            href += '1';
        }
        $.get(href, function (data) {
            if (data.is_favorite == 1) {
                self.addClass('heart-hl');
            }
            else {
                self.removeClass('heart-hl');
            }
            spinner.stop();
            target.hide();
        });
    })
    if (isAdmin) {
        $('.click-pause').click(function () {
            let action = '';
            let href = $(this).data("href");
            if ($(this).hasClass('heart-hl')) {
                href += '0';
                action = 'unpause';
            }
            else {
                href += '1';
                action = 'pause';
            }
            swal({
                title: 'Confirm',
                text: `Are you sure you want to ${action} this campaign?`,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then(() => {
                var target = $('#spinner-wrapper');
                target.show()
                var spinner = new Spinner(target[0]);
                const self = $(this);
                $.get(href, function (data) {
                    if (data.is_paused == 1) {
                        self.addClass('heart-hl');
                    }
                    else if (data.is_paused == 0) {
                        self.removeClass('heart-hl');
                    }
                    spinner.stop();
                    target.hide();
                });
            });

        })
    }


}

module.exports = {
    init: init,
};
