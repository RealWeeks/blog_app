var App = App || {
  url: 'http://localhost:3000'
};

App.getComments = function(){
  $.ajax({
    url: App.url + '/posts',
    type: 'GET'
  }).done(function(data){
    App.indexComments(data);
  }).fail(function(jqXHR, textString, errorThrown){
    trace(jqXHR, textString, errorThrown);
  });
};

App.indexComments = function(post){

for (var i = 0; i < post.length; i++) {
  // console.log(post[i].comments)
App.commentShow(post[i].comments)
  };
};

App.commentShow = function(comment){
  if (comment.length > 0){
    for (var i = 0; i < comment.length; i++) {
      var one_comment = comment[i].body;
          $('section.main-content').append('<article class="post">' + '<h1 class="post-title">' + one_comment + '</h1>')
    }
  }
};

$(document).ready(function(){
App.getComments();
});
