window.addEventListener("offline", function () {


    document.querySelector("#ethernetAlert").classList.remove("mdCustomToastHide");

});
window.addEventListener("online", function () {


    document.querySelector("#ethernetAlert").classList.add("mdCustomToastHide");

});

function closeMdCustomToast() {


    document.querySelector("#ethernetAlert").classList.add("mdCustomToastHide");
}





