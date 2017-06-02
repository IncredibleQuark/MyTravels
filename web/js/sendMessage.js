/**
 * Created by kruku on 12.05.17.
 */
$(function () {
    var cardblock = $('.card');
    var sendBtn = $('#sendMessage');

    var receiverId = cardblock.find('#friend_id').data('id');

    var senderId = $('#sender_id').text();
    var senderUsername = $('#sender_username').text();

    var status = 0;

    var textarea = "<br><div id='msgDiv' class='card-block'><textarea id='content'   rows='5' style='width: 500px' class='cardlink' required></textarea>" +
        "<button id='sendConfBtn' class='btn btn-primary' type='submit'>Send</button></div>";




    sendBtn.on('click', function () {

        sendBtn.off('click');
        sendBtn.prop( "disabled", true );

        $(this).parent().parent().append(textarea);
    });

    cardblock.on('click', '#sendConfBtn', function () {

        var content = cardblock.find('#content').val();


        //Date is set in the MessageController
        var data = {'senderId': senderId,  'senderUsername': senderUsername, 'receiverId': receiverId, 'content': content, 'status': status};


        $.ajax({
            url: "/Message/new/send",
            data: JSON.stringify(data),
            method: "POST",
            type: 'json'
        }).done(function (response) {

            sendBtn.prop( "disabled", false );
            cardblock.find('#msgDiv').remove();

            var sent = "<p class='bg-success'>Message sent!</p>";

            cardblock.append(sent);

        }).fail(function () {

            alert('Write something first!');

        })
    })
});
