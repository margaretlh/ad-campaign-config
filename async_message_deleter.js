function asyncMessageDeleter(message_id) {
    console.log('Message clicked with message_id: ', message_id)
    // const Spinner = require('fc/modules/spinner');

    // var current_el = $(this)
    // var spinner = new Spinner(current_el.parent().parent()[0]);
    $.ajax({
        url: '/delete-message/',
        type: 'post',
        headers: { 'X-CSRFToken': document.head.querySelector('meta[name="csrf-token"]').content },
        data: { 'message-id': message_id },
        success: function (response) {
            var element = document.getElementById("message-id-" + message_id);
            element.parentNode.removeChild(element);
            // current_el.parent().remove()
            // spinner.stop()
        },
        error: function (jqXHR, exception) {
            console.log('Error: ', exception)
            swal(
                'Error!',
                `Can't delete the message`,
                'error',
            )
            // spinner.stop()
        },
    });
}
module.exports = asyncMessageDeleter;
