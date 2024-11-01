import { toast as toastLib, ToastOptions, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles.scss';

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Zoom,
};


export const toast = (msg: string, opt?: ToastOptions) => opt ? toastLib(msg, opt) : toastLib(msg, options);
