import Swal from "sweetalert2";

/*
We can use sweetalert2
https://sweetalert2.github.io/
*/
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});