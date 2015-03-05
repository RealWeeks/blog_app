/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  url: 'http://localhost:3000'
};

App.getPosts = function(){
  $.ajax({
    url: App.url + '/posts',
    type: 'GET'
  }).done(function(data){
    App.indexPosts(data);
  }).fail(function(jqXHR, textString, errorThrown){
    trace(jqXHR, textString, errorThrown);
  });
};

App.indexPosts = function(posts){

  posts.forEach(App.renderPost);
};

App.renderPost = function(currentVal, index, array){
// trace(currentVal, index);
// debugger;
if (currentVal.comments[0].body) {
  $('section.main-content').append('<article class="post">' + '<h1 class="post-title">' + currentVal.title + '</h1>' + '<p class="post-body">' + currentVal.comments[0].body + '</p>' + '<small class="post-author">' + currentVal.comments[0].author + '</small>' + '</article>');
} else {
  $('section.main-content').append('<article class="post">' + '<h1 class="post-title">' + 'NO FUCKING COMMENTS' + '</h1>');
}
};

App.submitPost = function(event){
  if (event.preventDefault) event.preventDefault();
  $.ajax({
    url: App.url + '/posts',
    type: 'POST',
    data: { post: {
      title: $('input#post-title').val(),
      body: $('input#post-body').val(),
      author: $('input#post-author').val()
    },
  }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textString, errorThrown){
    trace(jqXHR, textString, errorThrown);
  });
};

$(document).ready(function(){
  App.getPosts();


  $('form.new-post-form').on('submit', function(event){
    App.submitPost(event);
  });
    trace('hello world');
});
