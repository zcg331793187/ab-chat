/**
 * Created by zhoucaiguang on 2017/1/16.
 */


var tool={
    removeUserSocket:function (usersSocket,id) {
        var key = null;
        for (var i=0;usersSocket.length>i;i++){

            if(usersSocket[i].id==id){
                key = i;
            }

        }

        return key;
    },
    getUserSocketObj:function (socket,ids) {
        var obj = [];
        for (var j=0;ids.length>j;j++){
            for (var i=0;socket.length>i;i++){

                if(socket[i].id==ids[j]){
                    obj.push(socket[i]);
                }


            }
        }


        return obj;
    }
};


exports.tool = tool;