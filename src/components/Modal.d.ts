/// <reference types="react" />
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
interface IModalProps {
    onHideModal?: () => void;
    url: string;
    modalShow: boolean;
    modalClose: any;
}
declare const Modal: ({ modalShow, url, modalClose }: IModalProps) => JSX.Element;
export default Modal;
