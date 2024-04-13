function ButtonViolet({ onClick, className, text, key, type }) {
  return (
    <button
      key={key}
      className={
        className
          ? className
          : "bg-custom_violet rounded-[5px] text-white font-bold flex justify-center w-full py-4 hover:bg-custom_light_violet"
      }
      type={type}
      onClick={onClick}
    >
      <p>{text ? text : "Button 1"}</p>
    </button>
  );
}

export default ButtonViolet;
