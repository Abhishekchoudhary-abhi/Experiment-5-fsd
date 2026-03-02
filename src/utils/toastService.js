import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#28a745',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  error: (message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#dc3545',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  loading: (message) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#007bff',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
  info: (message) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#17a2b8',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
};
