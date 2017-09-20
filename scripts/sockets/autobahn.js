/*
 require.config({
    baseUrl: ".",
     paths: {
        "autobahn":
             "bower_components/autobahn/autobahn",
        "when": "https://cdnjs.cloudflare.com/ajax/libs/when/2.7.1/when"
     },
         "autobahn": {
            deps: ["when"]
         }
 });
 require(["autobahn"], function(autobahn) {
    try {
    } catch (e) {

    }
    var connection = new autobahn.Connection({url: 'ws://127.0.0.1:8080/ws', realm: 'realm1'});

    connection.onopen = function (session) {






         // 1) subscribe to a topic
        function onevent(args) {

            alert(args[0]);
             console.log("Event:", args[0]);
        }
        session.subscribe('com.myapp.hello', onevent);

        // 2) publish an event
        session.publish('com.myapp.hello', ['bir üye sisteme girdi!']);

         // 3) register a procedure for remoting
         function add2(args) {
             return args[0] + args[1];
         }
         session.register('com.myapp.add2', add2);

        // 4) call a remote procedure
         /!*session.call('com.myapp.add2', [2, 3]).then(
             function (res) {
                 console.log("Result:", res);
             }
         );*!/
     };

    connection.open();
})
*/
