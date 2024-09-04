$(document).ready(function() {
    $('#emailText').on('input', function() {
        if ($(this).val().length > 0) {
            $('button').addClass('active');
        } else {
            $('button').removeClass('active');
        }
    });
});

function checkEmail() {
    var emailText = $('#emailText').val();
    if (emailText.length === 0) {
        alert("Please enter an email text to check.");
        return;
    }
    
    $('.loading').show();
    $('button').prop('disabled', true);
    $('#result').css('opacity', 0);

    $.ajax({
        url: '/predict',
        type: 'POST',
        data: {email_text: emailText},
        success: function(response) {
            $('.loading').hide();
            $('button').prop('disabled', false);
            
            var resultElement = $('#result');
            resultElement.text('This email is: ' + response.result);
            resultElement.removeClass('safe phishing');
            
            if (response.result === 'Safe') {
                resultElement.addClass('safe');
            } else {
                resultElement.addClass('phishing');
            }
            
            resultElement.css('opacity', 1);
        },
        error: function() {
            $('.loading').hide();
            $('button').prop('disabled', false);
            alert("An error occurred. Please try again.");
        }
    });
}