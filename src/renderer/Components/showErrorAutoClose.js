import Swal from 'sweetalert2';

export const showErrorToast = (message) => {
  if (Swal.isVisible()) Swal.close();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    background: '#0f1014',
    color: '#e5e7eb',
    iconColor: '#ef4444',
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      // evita pausa por hover
      toast.onmouseenter = null;
      toast.onmouseleave = null;
      Swal.resumeTimer();
    }
  });

  Toast.fire({ icon: 'error', title: '¡Ups!', text: message });
};
