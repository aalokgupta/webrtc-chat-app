
var socket = io();
var username = null;

  socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
      if(err) {
        alert(err);
        window.location.href = "/";
      }
      username = params.username;
      console.log("params verified and user connected to server");
    });
  });

  socket.on('disconnect', function () {
    console.log('disconnected from server');
  });

  function scrolltoBottom() {

    var ol = jQuery('#ol-received-message');
    var newMessage = ol.children('li:last-child');
    var clientHeight = ol.prop('clientHeight');
    var scrollTop =  ol.prop('scrollTop');
    var scrollHeight = ol.prop('scrollHeight');

    if(newMessage !== undefined) {
      var newMessageHeight = newMessage.innerHeight();
      var lastMessageHeight = 5; //newMessageHeight.prev().innerHeight()
    }

    if(clientHeight + scrollTop + 74 >= scrollHeight) {
      ol.scrollTop(scrollHeight);
    }
  }

  socket.on('updateUserList', function(users){
    console.log("users = "+users.length);
    document.getElementById('ol-users').innerHTML = '';
    jQuery('#ol-users').empty();
    for(var user in users) {
      var li = jQuery('<li class = "li-user"></li>');
      li.text(users[user]);
      jQuery('#ol-users').append(li);
    }
  });

  socket.on('newMessage', function(message){
    var formatedTime = moment(message.createdAt).format('h::mm a');
    console.log("newMessage "+JSON.stringify(message, undefined, 2));
    var li = jQuery('<li class = "li-message received-msg-header"></li>');
    li.text(`${message.from} ${formatedTime}`);
    jQuery('#ol-received-message').append(li);
    var li1 = jQuery('<li class = "li-message message"></li></br>');
    li1.text(`${message.text}`);
    jQuery('#ol-received-message').append(li1);
    scrolltoBottom();
  });

  socket.on('locationMessage', function(location){
    var formatedTime = moment(location.createdAt).format('h::mm a');
    console.log("locationMessage "+JSON.stringify(location, undefined, 2));
    var li = `<li class = "li-message received-msg-header ">${location.from} ${formatedTime}</li>`;
    var li_attribute = jQuery(li);
    jQuery('#ol-received-message').append(li_attribute);
    var li1 = `<li class = "li-message message"> <a href = ${location.locationUrl}>My Location</a></li>`;
    var li_attribute1 = jQuery(li1);
    jQuery('#ol-received-message').append(li_attribute1);
    scrolltoBottom();
  });

  jQuery('#btn-send-message').on('click', function(e){
    console.log("send button click");
    var text = jQuery('#text-sent-message').val();
    var user = username || 'Anonymous';
    console.log(`text = ${text}`);
    socket.emit('createMessage', {
      from: user,
      text: text
    }, function(message) {
      console.log(`${message}`);
    });
  });

  jQuery('#btn-send-location').on('click', function(e){
    console.log("send location btn clicked");
     var user = username || 'Anonymous';
    if("geolocation" in navigator){
      console.log("geolocation is avavilable in navigator");
        navigator.geolocation.getCurrentPosition(function(position){
          console.log("inside getCurrentPosition");
          // var locationMsg = ;
          console.log("location = "+JSON.stringify(position, undefined, 2));
          socket.emit('geoLocation', {from: user,
                                      coords: {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude
                                              }

          }, function(message) {
            console.log(`${message}`);
          });
        });
    } else {
      alert("geolocation is not avavilable");
    }
  });
