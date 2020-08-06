$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message__items" data-message-id=${message.id}>
          <div class="Message__info">
            <div class="Message__user">
              ${message.user_name}
            </div>
            <div class="Message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message__content">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message__items" data-message-id=${message.id}>
        <div class="Message__info">
          <div class="Message__user">
            ${message.user_name}
          </div>
          <div class="Message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message__content">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Send__items').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message').append(html);
      $('.Message').animate({ scrollTop: $('.Message')[0].scrollHeight}); 
      $('form')[0].reset();
      $('.Send__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});