app.service("$storage", function () {


    if (typeof(Storage)) {


        this.addArray = function (key, val) {


            if (!localStorage[key]) {

                this.arrayValues = this.arrayValues || [];
                this.arrayValues.push({key: val});

                localStorage[key] = this.arrayValues;


            }
            else {

                this.arrayValues.push(key);

                localStorage[key] = this.arrayValues;


            }


        };

        this.add = function (key, val) {


            return localStorage[key] = val;
        };

        this.setItem = function (key, val) {


            return localStorage.setItem(key, val);
        };


        this.getItem = function (key) {


            return localStorage.getItem(key);

        };

        this.clear = function () {


            return localStorage.clear();
        }
    }


    this.getAll = function () {

        return localStorage;
    };

    return this;

});



