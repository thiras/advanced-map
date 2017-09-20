app.service("$database", function ($http) {


    var db = new Dexie('MyDatabase');

    // Define a schema
    db.version(1).stores({
        friends: 'name, age'
    });

    db.friends.add({name:1,age:32});

    // Open the database
    db.open().catch(function(error) {
        alert('Uh oh : ' + error);
    });

});