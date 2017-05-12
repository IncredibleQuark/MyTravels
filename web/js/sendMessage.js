/**
 * Created by kruku on 12.05.17.
 */
$(function () {

   var sendBtn = $('#sendMessage');
    var textarea = "<textarea class='textarea' required></textarea><button class='btn btn-primary' type='submit'>Send</button>";
   sendBtn.on('click', function () {

   $(this).parent().parent().append(textarea);

   });
});