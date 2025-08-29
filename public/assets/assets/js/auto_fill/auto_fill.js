(() => {
  "use strict";
  $(document).ready(function () {
    (window.changeCredentials = function (n, i) {
      $("#email").val(n), $("#password").val(i);
    }),
      $(document).on("click", ".admin-login", function () {
        changeCredentials("admin@infyprojects.com", "admin@12345");
      }),
      $(document).on("click", ".user-login", function () {
        changeCredentials("aidenbulter@gmail.com", "123456");
      }),
      $(document).on("click", ".client-login", function () {
        changeCredentials("tonyseth@gmail.com", "123456");
      });
  });
})();
