function ButtonLightGrey({ onClick, className, text, key }) {
  return (
    <button
      key={key}
      className={
        className
          ? className
          : "bg-custom_light_grey rounded-[5px] text-custom_violet font-bold flex  justify-center w-full py-4 hover:bg-[#5964e059] dark:bg-[#121721c9] dark:text-white dark:hover:bg-custom_dark_grey"
        // dark:bg-[#121721c9] dark:text-white dark:hover:bg-custom_dark_grey
      }
      type="button"
      onClick={onClick}
    >
      <p>{text ? text : "Button 2"}</p>
    </button>
  );
}

export default ButtonLightGrey;
