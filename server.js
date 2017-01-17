var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = {},
    usersSocket = [],
 tool = require('./tool').tool;


server.listen(process.env.PORT || 3000);//publish to heroku

// console.log(tool);
console.log('聊天服务器启动端口：localhost:3000');
io.sockets.on('connection', function(socket) {
    console.log('客户端链接成功',socket.id);


    socket.on('login', function(userId,data) {
        //连接
        socket.userId = userId;
        if(users[userId]){

            // console.log(users[userId].indexOf(socket.id));
            if(users[userId].indexOf(socket.id)==-1){
                users[userId].push(socket.id);
                usersSocket.push(socket);
            }

        }else{
            users[userId] = [];
            users[userId].push(socket.id);
            usersSocket.push(socket);

        }

        console.log(users);
        // console.log(usersSocket);
        console.log(usersSocket.length);

    });






    //user leaves
    socket.on('disconnect', function() {
        console.log('断开链接');
        if (socket.userId != null) {
            //users.splice(socket.userIndex, 1);
           //删除socketId
            //如果删除后 没有socketId 就删除这个用户表示离线
            // console.log(users);
            users[socket.userId].splice(users[socket.userId].indexOf(socket.id), 1);
            usersSocket.splice(tool.removeUserSocket(usersSocket,socket.id),1);

            if(users[socket.userId].length==0){
                delete users[socket.userId];
                // delete usersSocket[socket.userId];
            }
            console.log(usersSocket.length);
            console.log(users);
            // socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }

    });
    //new message get
    socket.on('postMsg', function(userId,otherUserId,msg) {
        var postUser;
        console.log('发送信息用户socketId:'+users[userId]);
        console.log('接受信息用户socketId:'+users[otherUserId]);
        if(users[otherUserId]){


        for (var j = 0;users[otherUserId].length>j;j++){

        for( var i in  usersSocket){


            if(users[otherUserId][j]==usersSocket[i].id){


                // console.log(usersSocket[i]);
                // console.log('向socketId:',usersSocket[i].id,'发送信息');


                // usersSocket[i].broadcast.emit('newMsg',msg);
                // socket.broadcast.emit('newMsg',msg);
                // io.sockets.socket(usersSocket[i].id).emit('newMsg', data);
                socket.broadcast.to(usersSocket[i].id).emit('newMsg', msg);
                console.log('接收人：',otherUserId,'发送人：',userId,'发送内容:',msg);
            }
            // console.log(users[otherUserId][j]);
            // console.log(usersSocket[i].id);


        }
        }
        }else{
            console.log('用户离线');
        }



  });



    socket.on('sendMessage', function (userId,otherUserId,data) {
        console.log(userId,otherUserId,data);
        // this.socket.emit('sendMessage',userId,otherUserId,data);
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});


