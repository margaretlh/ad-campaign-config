function initCSVExportHandler(exportLink) {
    $('#exportModal button#export_csv').click(function () {
        $('#exportModal').modal('hide');
        let columns_str = $('#exportModal input[name="csv_columns[]"]:checkbox:checked').map(
            function () { return $(this).val() }
        ).toArray().join(',');
        window.location.href = exportLink + '&csv_columns=' + columns_str;
    })
}

function hideLocalParams(property) {
    $(`#properties_parameters #${property}_params .local_param`).hide();
    $(`#properties_parameters #${property}_params .local_param`).prop('disabled', true)
}

function setProps(properties) {
    let propertiesSelect = $("#report_parameters select[name='properties']");
    propertiesSelect.val(properties).change();
    properties.forEach((prop) => {
        propertiesSelect.trigger({
            type: 'select2:select',
            params: {
                data: {
                    element: propertiesSelect.find(`option[value='${prop}']`)
                }
            }
        });
    });
}

function loadPieChart() {
    var data = $('#build_pie_chart').data();

    var pieChartParams = data['pieChartParams'];
    var pie_chart_qs = $('#pie_chart_panel form').serialize();
    var qs = $('form#report_parameters').serialize();
    qs = `${qs}&${pie_chart_qs}&pie-chart-params=${pieChartParams}&is-with-local=${data['isWithLocal']}`
    $('#pie_chart_wrapper').show();
    $('#close_pie_chart').show();


    var spinner = new Spinner($('#pie_chart_wrapper')[0]);

    $.get(`/admin/trafficguard/network-wide-report?${qs}`, function (response) {
        $('#pie_chart_table .local').hide()
        $('#pie_chart').empty();
        $('#pie_chart_table').show();
        $('#pie_chart_table tbody tr').remove();
        $('#pivot_label').show();
        $('#pivot_label').html(response.label);
        $('#pie_chart_table .fa-chart-pie').hide()

        var chart = new Morris.Donut({
            element: 'pie_chart',
            data: response.data,
            colors: response.colors,
            formatter: function (x, data) { return `${data.formatted.replace('&lt;', '<')}`; }
        });


        $.each(response.table_data, function (index, item) {
            var row = $('<tr></tr>');
            $.each(item, function (index, val) {
                $('<td></td>').html(val).appendTo(row);
            });
            row.appendTo($('#pie_chart_table tbody'));
        });


        if (data['isWithLocal'] == '1') {
            $('#pie_chart_table .local').show()
        }

        $($('#pie_chart_table th')[1]).text(data['currentProperty']);
        $(`#pie_chart_table #pie_chart_${data['currentValCol']}`).show()

        spinner.stop();
    });
}
const Spinner = require('./spinner');

function init(exportLink) {
    InitDatePicker.init('.input-daterange', {
        format: 'yyyy-mm-dd',
    });
    initCSVExportHandler(exportLink);
    $('select#country_code').select2();
    $('select#vertical').select2();
    $('select#traffic_source').select2();
    $('select#revenue_provider').select2();
    $('select#properties').select2();
    $('select#category').select2();

    $('select#publisher').select2();
    $('select#revshare_by').select2();
    $('select#traffic_state_by').select2();
    $('#open_export_csv_modal').click(function () {
        $('#exportModal').modal('show');

    })

    $("select#properties").on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);
        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
        var propParamsEl = $(`#properties_parameters #${$element.val()}_params`);
        propParamsEl.detach();
        $(`#properties_parameters`).append(propParamsEl);
        propParamsEl.addClass('selected')
        var selectedEls = $(`#properties_parameters .selected`)
        $('.limit-field-wrapper').show();
        selectedEls.show();
        if (selectedEls.length < 2) {
            $('#' + $("select#properties").val()[0] + '_params .limit-field-wrapper').hide();
        }
    });



    $("select#properties").on("select2:unselect", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);
        var propParamsEl = $(`#properties_parameters #${$element.val()}_params`);
        propParamsEl.hide();
        propParamsEl.removeClass('selected');
        var selectedEls = $(`#properties_parameters .selected`)
        var firstProp = $("select#properties").val()[0];

        if (selectedEls.length < 2) {
            $('#' + firstProp + '_params .limit-field-wrapper').hide()
        }

        $(`#properties_parameters .local_param`).show();
        $(`#properties_parameters .local_param`).prop('disabled', false)

        hideLocalParams(firstProp);
    });


    $('.clear-properties').click(function () {
        $("select#properties").val([]).change();
        $(`#properties_parameters .selected`).hide().removeClass('selected');
    })



    $('#properties_parameters .to-default').click(function () {
        $(this).parent().find('.order-by').val(
            $('#properties_parameters').data('defaultOrderBy')
        )
        var orderingType = $('#properties_parameters').data('defaultOrderingType');
        console.log(orderingType)
        console.log(`.ordering-type-${orderingType}`)
        console.log($(this).parent().find(`.ordering-type-${orderingType}`))
        $(this).parent().find(`.ordering-type-${orderingType}`).prop('checked', true);
        $(this).parent().find('.limit').val(
            $('#properties_parameters').data('defaultLimit')
        )
    })


    $("#report_parameters select[name='quick_configs']").change(function () {
        let reportType = $(this).find(':selected').data('type');
        let properties = $(this).find(':selected').data('properties');

        $('#properties_parameters > div').hide();
        $(`#properties_parameters .selected`).removeClass('selected');

        $("#report_parameters select[name='report_type']").val(reportType)
        setProps(properties);

    });


    $("#report_parameters select[name='report_type']").change();
    var properties = $("#report_parameters select[name='properties']").data('init-properties').split(',');
    hideLocalParams(properties[0]);
    setProps(properties);


    $('#build_pie_chart').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(".table-container td[data-pie-chart-params]").removeClass('participating-cell');
        }
        else {
            $(this).addClass('active');
            $(".table-container td[data-pie-chart-params]").addClass('participating-cell');
        }
    });



    $(".table-container td[data-pie-chart-params]").each(function () {
        var pieChartParams = $(this).attr('data-pie-chart-params');
        var cell = $(`.table-container td[data-pie-chart-params='${pieChartParams}']`);
        cell.hover(function () {
            if ($('#build_pie_chart').hasClass('active')) {
                cell.addClass('active-cell');
            }
        }, function () {
            cell.removeClass('active-cell');
        });
    });




    $('#close_pie_chart').click(function () {
        $('#pie_chart_wrapper').hide();
        $('#close_pie_chart').hide();
        $('#pie_chart').empty();
        $('#pie_chart_table').hide();
        $('#pie_chart_table tbody tr').remove();
        $('#pie_chart_table .local').hide()
        $('#pivot_label').hide();
    })




    $(".table-container td[data-pie-chart-params]").click(function () {
        if ($('#build_pie_chart').hasClass('active')) {
            $('#build_pie_chart').removeClass('active');
            $(".table-container td[data-pie-chart-params]").removeClass('participating-cell');
            $('#pivot_label').hide();
            $('#build_pie_chart').data($(this).data());

            document.getElementById("pie_chart_wrapper").scrollIntoView();
            loadPieChart();
        }

    })

    $("input[name='pie_chart_slices_limit']").change(function () {
        if ($('#pie_chart_wrapper').is(":visible")) {
            loadPieChart();
        }
    });

    $("input[name='pie_chart_ordering_type']").change(function () {
        if ($('#pie_chart_wrapper').is(":visible")) {
            loadPieChart();
        }
    });


    $('#pie_chart_panel form').submit(function (e) { e.preventDefault(); });

    $('#selectAllColumns').click(function () {
        $('#exportColumnsList input').prop('checked', true)
    })

    $('#deselectAllColumns').click(function () {
        $('#exportColumnsList input').prop('checked', false)
    })

    $("select[name='traffic_state_by']").change(function () {
        if ($(this).val() == 'disabled') {
            $('#traffic_state_filter_group').hide();
        }
        else {
            $('#traffic_state_filter_group').show();
        }
    });

    $('#traffic_state_info_label').click(function () {
        $('#traffic_state_info').modal('show');
    })

}

module.exports = {
    init,
}
