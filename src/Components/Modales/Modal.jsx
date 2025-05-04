import ButtonGeneral from "../Buttons/ButtonGeneral";

export default function Modal({
  children,
  btn_left_text = "Cancelar",
  btn_left_onClick,
  btn_left_className,
  btn_right_text = "Borrar",
  btn_right_onClick,
  btn_right_className,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-500 flex justify-center items-center">
      <div className="bg-white border border-neutral-200 rounded-xl py-5 px-5 w-auto flex flex-col gap-5 m-4 shadow-lg">
        <p className="text-center max-w-64">{children}</p>
        <div className="flex flex-row gap-5">
          <ButtonGeneral
            children={btn_left_text}
            className={`w-full bg-[color:var(--color-primary)] ${btn_left_className}`}
            onClick={btn_left_onClick}
          />
          <ButtonGeneral
            children={btn_right_text}
            className={`w-full bg-red-500 ${btn_right_className}`}
            onClick={btn_right_onClick}
          />
        </div>
      </div>
    </div>
  );
}
