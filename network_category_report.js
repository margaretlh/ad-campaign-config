function init(fullPath) {
    InitDatePicker.init('.input-daterange', {
        format: 'yyyy-mm-dd',
    });

    $('select#country_code').select2();
    $('select#vertical').select2();
    $('select#revshare_by').select2();
    $('select#bucket').on('change', function () {
        if (this.value == '3PH') {
            $('select#revshare_by').prop("disabled", false);
        }
        else {
            $('select#revshare_by').prop("disabled", true);
        }
    });
    $('#open_export_csv_modal').click(function () {
        $('#exportModal').modal('show');

    })

    let exportLink = fullPath;
    if (exportLink.includes('?')) {
        exportLink += '&';
    }
    else {
        exportLink += '?';
    }
    exportLink += 'csv=true';
    $('#exportModal button#export_csv').click(function () {
        $('#exportModal').modal('hide');
        let columns_str = $('#exportModal input[name="csv_columns[]"]:checkbox:checked').map(
            function () { return $(this).val() }
        ).toArray().join(',');
        window.location.href = exportLink + '&csv_columns=' + columns_str;
    })
}

module.exports = {
    init,
}
