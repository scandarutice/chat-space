$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="message" data-message-id = ${message.id}>
            <div class="upper-info">
              <div class="upper-info__talker">
              ${message.user_name}
              </div>
              <div class="upper-info__date">
              ${message.created_at}
              </div>
            </div>
            <div class="lower-text">
              <p class="lower-message__content">
              ${message.content}
              </p>
            </div>
          <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="message" data-message-id = ${message.id}>
              <div class="upper-info">
                <div class="upper-info__talker">
                ${message.user_name}
                </div>
                <div class="upper-info__date">
                ${message.created_at}
                </div>
              </div>
              <div class="lower-text">
                <p class="lower-message__content">
                ${message.content}
                </p>
              </div>`
              return html;
      };
    }


    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.message-list').append(html);      
        $('.new_message')[0].reset();
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    })

    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.message-list').append(insertHTML);
          $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert("失敗しました");
      });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});