/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    function add(num1, num2) {
        $.ajax({
            method: 'POST',
            url: _config.api.additionUrl + '/add',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                AddArgs: {
                    Arg1: num1,
                    Arg2: num2
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when adding:\n' + jqXHR.responseText);
            }
        });
    }


    // Register click handler for #request button
    $(function onDocReady() {
        $('#additionForm').submit(handleAddition);
    });


    function handleAddition(event) {
        var num1 = $('#additionNumber1').val();
        var num2 = $('#additionNumber2').val();
        event.preventDefault();
        add(num1, num2, function addSuccess() {
                console.log('Success!');
            },
            function addError(err) {
                alert(err);
            });
    }

    function completeRequest(result) {
        console.log('Addition Result: ', result.Result);
    }
}(jQuery));