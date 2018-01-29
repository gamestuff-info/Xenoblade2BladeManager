const $ = require('jquery');

$(document).ready(function () {
    $('#user_edit_changePassword').change(function () {
        $('#user_edit_plainPassword_newPassword').prop('disabled', !this.checked);
        $('#user_edit_plainPassword_repeatPassword').prop('disabled', !this.checked);
    })
});
