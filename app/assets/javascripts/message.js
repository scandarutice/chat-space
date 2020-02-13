$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
            `<div class="message">
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
            `<div class="message">
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
});