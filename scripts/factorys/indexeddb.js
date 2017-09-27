app.service("$indexedDB",function () {
    // veritabani oluşturuluyor

    var obj={};
    obj.db=new Dexie('balistaGis');




    obj.createTable=function (name,fields) {


        return obj.db.version(1).stores({name:fields});
    }





  /*  obj.creatTable = function (tablename,fields) {
        var fieldlist = "";
        var i=0;
        for(prop in fields){
            if(i==0){
              var name = fields[prop].name;
                fieldlist=name;
            }else{
                fieldlist=fieldlist+','+name;
            }
        }
        obj.db.version(1).stores({
            tablename : fieldlist
        });
    }*/

    return obj;

})