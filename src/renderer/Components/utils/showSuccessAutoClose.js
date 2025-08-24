import Swal from 'sweetalert2';

export const showSuccessToastRedirect = (navigator, whereTo, message) => {
  if (Swal.isVisible()) Swal.close();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    background: '#0f1014',
    color: '#e5e7eb',
    iconColor: '#22c55e',
    timer: 2000, // duración
    timerProgressBar: true,
    didOpen: (toast) => {
      // evita que se pause el timer
      toast.onmouseenter = null;
      toast.onmouseleave = null;
      Swal.resumeTimer();
    },
    willClose: () => {
      // redirige al cerrar
      navigator(whereTo);
    }
  });

  Toast.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message
  });
};
