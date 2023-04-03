import style from "./icon.module.scss";

export default function Icon(props) {
  var classNames = [style.svg_icon];
  if (props.className) {
    classNames.push(props.className);
  }
  return (
    <svg
      className={classNames.join(" ")}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={props.style}
    >
      {Array.isArray(props.icon) ? (
        props.icon.map((path, index) => <path key={index} d={path} />)
      ) : (
        <path d={props.icon}></path>
      )}
    </svg>
  );
}
