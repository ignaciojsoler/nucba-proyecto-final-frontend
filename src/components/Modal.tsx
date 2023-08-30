import ReactDOM from "react-dom";
import { Button } from "./Button";

interface ModalProps {
  display: boolean;
  title: string;
  text: string;
  confirmText: string;
  cancelText?: string;
  displayCancelButton?: boolean;
  handleConfirm: () => void;
  handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  text,
  confirmText,
  cancelText = "Cancel",
  displayCancelButton = true,
  handleConfirm,
  handleCloseModal,
  display,
}) => {
  if (!display) return null;

  return ReactDOM.createPortal(
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-slate-950 bg-opacity-90 animate-fadeIn ">
      <div className="bg-slate-900 backdrop-blur-2xl bg-opacity-60 shadow-2xl mx-8 p-8 text-slate-100  rounded-lg animate-sladeInFromBottomMedium space-y-2 md:p-14">
        <div className="flex justify-between items-center border-gray-300" style={{maxWidth: "32rem"}}>
          <h2 className="text-2xl font-semibold text-center m-auto">{title}</h2>
        </div>
        <div className="py-4 text-center m-auto">
          <p>{text}</p>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-4">
        <Button
            onClick={() => handleConfirm()}
            title={confirmText}
            widthFull
          />
          {displayCancelButton && (
            <Button
              onClick={() => handleCloseModal()}
              title={cancelText}
              widthFull
              color="outline"
            />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
};

export default Modal;
