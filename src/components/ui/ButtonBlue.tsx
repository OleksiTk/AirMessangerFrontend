import "../../style/ui/buttonBlue.css";

export const ButtonBlue = ({
  textButton,
  onClick,
}: {
  textButton: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="button-blue">
      <p className="button-blue__text">{textButton}</p>
    </button>
  );
};
