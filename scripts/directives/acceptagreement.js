app.directive("acceptAgreement",function () {


    return {



        link:function (e) {

            e.preventDefault();

            alert(1111)
        }
    }

})