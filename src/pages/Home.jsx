import { useEffect, useState } from "react";
import ButtonViolet from "../assets/components/Buttons/ButtonViolet";
import bg_mobile from "../assets/mobile/bg-pattern-header.svg";
import bg_table from "../assets/tablet/bg-pattern-header.svg";
import bg_desktop from "../assets/desktop/bg-pattern-header.svg";

import { useNavigate } from "react-router-dom";
function Home({ data, darkMode, toggleDarkMode, detail, setDetail }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [defaultItemsLoaded, setDefaultItemsLoaded] = useState(() => {
    return data.filter((item, index) => {
      return index < 10;
    });
  });
  const [searchJob, setSearchJob] = useState("");

  const [filterResult, setFilterResult] = useState([]);
  const [breakPoints, setBreakPoints] = useState({
    mobile: false,
    table: false,
    desktop: false,
  });

  const navigate = useNavigate();

  function redirect(nombre, index) {
    const name = nombre.replace(/\s+/g, "").toLowerCase();

    setDetail({ ...detail, idCompany: index, isActived: true });
    navigate(`/${name}/detail`);
  }

  function filter() {
    if (openFilter) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  }
  function filterCheck() {
    if (fullTimeOnly) {
      setFullTimeOnly(false);
    } else {
      setFullTimeOnly(true);
    }
  }
  function handleSearchJob(e) {
    const { name, value } = e.target;
    setSearchJob(value);
  }

  useEffect(() => {
    // get queries
    const byLocation = new URLSearchParams(window.location.search).get("location");
    const byFullTimeOnly = new URLSearchParams(window.location.search).get("fulltimeonly");
    const byTitle_byCompanies_byExpertise = new URLSearchParams(window.location.search).get(
      "title"
    );
    if (
      byTitle_byCompanies_byExpertise !== null ||
      byLocation !== null ||
      byFullTimeOnly !== null
    ) {
      setFilterResult(() => {
        const keyByTitle_byCompanies_byExpertise =
          byTitle_byCompanies_byExpertise == null ? "" : byTitle_byCompanies_byExpertise.trim();
        const keyByLocation = byLocation == null ? "" : byLocation.trim();
        const keyByFullTimeOnly = byFullTimeOnly == null ? "" : "Full Time";

        const arrayKeys = [keyByTitle_byCompanies_byExpertise, keyByLocation, keyByFullTimeOnly];
        const arrayFilterEmpty = arrayKeys.filter((item) => {
          return item !== "";
        });

        setFilterResult(() => {
          return data.filter((item) => {
            return arrayFilterEmpty.some(
              (keyword) =>
                item.position.toLowerCase().includes(keyword.toLowerCase()) ||
                item.contract.toLowerCase().includes(keyword.toLowerCase()) ||
                item.location.toLowerCase().includes(keyword.toLowerCase()) ||
                item.company.toLowerCase().includes(keyword.toLowerCase())
            );
          });
        });
      });
    }

    if (filterResult !== undefined && filterResult.length > 0) {
      setDefaultItemsLoaded(filterResult);
    }
  }, []);

  useEffect(() => {
    setDefaultItemsLoaded(filterResult);
    if ((filterResult !== undefined && filterResult.length) == 0) {
      setDefaultItemsLoaded(() => {
        return data.filter((item, index) => {
          return index < 10;
        });
      });
    }
  }, [filterResult]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 425) {
        setBreakPoints({ ...breakPoints, mobile: true, table: false, desktop: false });
      }
      if (windowWidth > 425) {
        setBreakPoints({ ...breakPoints, mobile: false, table: true, desktop: false });
      }
      if (windowWidth > 768) {
        setBreakPoints({ ...breakPoints, mobile: false, table: false, desktop: true });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col bg-custom_light_grey min-h-screen dark:bg-custom_midnight">
        {/* mobile header */}

        <header
          style={{
            backgroundImage: `url(${
              (breakPoints.mobile && bg_mobile) ||
              (breakPoints.table && bg_table) ||
              (breakPoints.desktop && bg_desktop)
            })`,
            width: "100%",
            height: "136px",
          }}
          className={`w-full h-[136px] sm:relative  bg-no-repeat bg-cover`}
        >
          <div className="flex items-center z-10 justify-between max-w-[1100px] py-8 w-10/12 mx-auto">
            {/* brand logo*/}
            <a href="/" title="brand-logo">
              <figure>
                <svg width="115" height="32" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.612 24.08c1.022 0 1.967-.178 2.838-.531a6.998 6.998 0 002.29-1.498l.109 1.711h4.252V0h-4.502v9.49a7.369 7.369 0 00-2.251-1.387 7.394 7.394 0 00-2.736-.499c-1.458 0-2.764.356-3.915 1.07-1.152.712-2.056 1.689-2.712 2.93C.328 12.844 0 14.257 0 15.842c0 1.584.328 2.996.985 4.237.656 1.241 1.56 2.218 2.712 2.93 1.151.714 2.457 1.07 3.915 1.07zm1.017-3.961c-1.147 0-2.095-.407-2.845-1.22s-1.126-1.832-1.126-3.057c0-1.225.375-2.245 1.126-3.058.75-.813 1.698-1.22 2.845-1.22 1.146 0 2.094.407 2.844 1.22s1.126 1.833 1.126 3.058c0 1.225-.375 2.244-1.126 3.057-.75.813-1.698 1.22-2.844 1.22zm20.258 3.96c1.084 0 2.217-.18 3.4-.538 1.182-.36 2.378-1.02 3.587-1.98l-2.72-3.296a7.804 7.804 0 01-1.946 1.37c-.714.354-1.613.531-2.696.531-1.011 0-1.894-.274-2.65-.823a4.154 4.154 0 01-1.555-2.139h12.192v-1.378c0-1.595-.354-3.01-1.063-4.246a7.772 7.772 0 00-2.9-2.915c-1.224-.707-2.623-1.061-4.196-1.061-1.584 0-2.999.356-4.244 1.07a7.897 7.897 0 00-2.947 2.914c-.719 1.23-1.078 2.632-1.078 4.206 0 1.595.375 3.018 1.125 4.27.75 1.25 1.787 2.233 3.11 2.946 1.324.713 2.85 1.07 4.58 1.07zm2.985-9.41h-7.659a4.047 4.047 0 011.383-2.233c.704-.581 1.535-.872 2.494-.872.948 0 1.76.286 2.438.856.677.57 1.126 1.32 1.344 2.25zm16.273 9.093l6.174-15.841h-4.736l-2.61 7.715a23.244 23.244 0 00-.509 1.774c-.193.76-.351 1.452-.477 2.075h-.062a32.377 32.377 0 00-.43-2.09c-.182-.772-.346-1.358-.492-1.76l-2.83-7.714h-4.892l6.487 15.841h4.377zM58.399 5.07c.75 0 1.355-.232 1.813-.697.459-.464.688-1.077.688-1.837s-.23-1.373-.688-1.838C59.754.232 59.149 0 58.399 0s-1.355.232-1.813.697c-.459.465-.688 1.077-.688 1.838 0 .76.229 1.373.688 1.837.458.465 1.062.697 1.813.697zM54.882 32c1.865 0 3.293-.504 4.283-1.513.99-1.008 1.485-2.453 1.485-4.333V7.921h-4.502v17.71c0 .75-.237 1.34-.711 1.767-.474.428-1.076.642-1.806.642-.542 0-1.1-.122-1.672-.365v3.739c.99.39 1.964.586 2.923.586zm16.835-7.92c1.605 0 3.032-.357 4.283-1.07a7.903 7.903 0 002.962-2.93c.724-1.242 1.086-2.654 1.086-4.238 0-1.585-.362-2.997-1.086-4.238A7.903 7.903 0 0076 8.674c-1.25-.714-2.678-1.07-4.283-1.07-1.605 0-3.035.356-4.291 1.07a7.887 7.887 0 00-2.97 2.93c-.724 1.24-1.086 2.653-1.086 4.238 0 1.584.362 2.996 1.086 4.237a7.887 7.887 0 002.97 2.93c1.256.714 2.686 1.07 4.29 1.07zm0-3.961c-1.147 0-2.095-.407-2.845-1.22s-1.126-1.832-1.126-3.057c0-1.225.376-2.245 1.126-3.058.75-.813 1.698-1.22 2.845-1.22 1.146 0 2.094.407 2.845 1.22.75.813 1.125 1.833 1.125 3.058 0 1.225-.375 2.244-1.125 3.057-.75.813-1.699 1.22-2.845 1.22zm20.79 3.96c1.469 0 2.777-.356 3.923-1.07 1.146-.712 2.048-1.689 2.704-2.93.657-1.24.985-2.653.985-4.237 0-1.585-.328-2.997-.985-4.238-.656-1.241-1.558-2.218-2.704-2.93-1.146-.714-2.454-1.07-3.924-1.07-.98 0-1.89.166-2.735.499a7.369 7.369 0 00-2.251 1.386V0h-4.502v23.762h4.252l.11-1.71a6.978 6.978 0 002.297 1.497c.876.353 1.819.53 2.83.53zm-1.017-3.96c-1.146 0-2.094-.407-2.844-1.22s-1.126-1.832-1.126-3.057c0-1.225.375-2.245 1.126-3.058.75-.813 1.698-1.22 2.844-1.22 1.147 0 2.095.407 2.845 1.22s1.126 1.833 1.126 3.058c0 1.225-.375 2.244-1.126 3.057-.75.813-1.698 1.22-2.845 1.22zm17.304 3.96c1.136 0 2.173-.198 3.111-.594.938-.396 1.688-.969 2.25-1.719.564-.75.845-1.642.845-2.677 0-1.035-.263-1.872-.79-2.51a5.958 5.958 0 00-1.93-1.537c-.76-.386-1.5-.721-2.22-1.006a18.284 18.284 0 01-1.727-.777c-.484-.253-.727-.575-.727-.966 0-.348.175-.583.524-.705.35-.121.67-.182.961-.182.511 0 1.134.119 1.868.356.735.238 1.332.51 1.79.816l1.985-3.47a9.31 9.31 0 00-2.837-1.148 13.27 13.27 0 00-2.962-.356c-1.917 0-3.4.433-4.447 1.299-1.047.866-1.571 1.97-1.571 3.31 0 .972.247 1.765.742 2.377a5.807 5.807 0 001.845 1.497 28.35 28.35 0 002.196 1.038c.688.285 1.295.575 1.821.871.526.296.79.681.79 1.156 0 .328-.141.597-.422.808-.282.212-.652.317-1.11.317-.594 0-1.269-.177-2.025-.53-.755-.354-1.58-.832-2.477-1.434l-2.126 3.437c1.053.793 2.155 1.379 3.306 1.759 1.152.38 2.264.57 3.337.57z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              </figure>
            </a>

            {/* dark mode */}
            <div className="flex items-center gap-2">
              {/* icon sun */}
              <figure>
                <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 15.635c.33 0 .612.295.612.639v1.89c0 .344-.282.638-.612.638s-.612-.294-.612-.638v-1.89c0-.344.282-.639.612-.639zm-4.488-1.783c.27.262.27.68 0 .941L4.03 16.231a.698.698 0 01-.97 0 .649.649 0 010-.941l1.482-1.438c.27-.261.7-.261.97 0zm9.946 0l1.483 1.438c.27.261.27.68 0 .941a.698.698 0 01-.97 0l-1.483-1.438a.649.649 0 010-.94c.242-.262.674-.262.97 0zM10 4.552c1.396 0 2.685.525 3.598 1.4.913.85 1.504 2.05 1.504 3.35 0 1.3-.59 2.5-1.504 3.35a5.314 5.314 0 01-3.598 1.4c-1.396 0-2.685-.525-3.598-1.4-.913-.85-1.504-2.05-1.504-3.35 0-1.3.564-2.5 1.504-3.35A5.314 5.314 0 0110 4.552zM2.607 8.906c.355 0 .658.274.658.594 0 .32-.303.594-.658.594H.658C.304 10.094 0 9.82 0 9.5c0-.32.304-.594.658-.594h1.95zm16.735 0c.354 0 .658.274.658.594 0 .32-.304.594-.658.594h-1.95c-.354 0-.657-.274-.657-.594 0-.32.303-.594.658-.594h1.949zM4.03 2.77l1.482 1.438c.27.261.27.68 0 .94-.242.262-.674.262-.97 0L3.059 3.71a.649.649 0 010-.941c.27-.261.701-.261.97 0zm12.91 0c.27.261.27.68 0 .941l-1.482 1.438a.698.698 0 01-.97 0 .649.649 0 010-.941l1.482-1.438c.27-.261.701-.261.97 0zM10 .198c.33 0 .612.294.612.638v1.89c0 .344-.282.639-.612.639s-.612-.295-.612-.639V.836c0-.344.282-.638.612-.638z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              </figure>
              {/* toggle */}
              <button
                className="bg-white h-[24px] px-1 flex items-center gap-2 rounded-xl"
                type="button"
                title="darkMode"
                onClick={() => toggleDarkMode()}
              >
                <div
                  className={`${
                    darkMode ? "bg-white" : "bg-custom_violet"
                  }  h-[14px] w-[14px] rounded-full`}
                ></div>
                <div
                  className={`${
                    darkMode ? "bg-custom_violet" : "bg-white"
                  }  h-[14px] w-[14px] rounded-full`}
                ></div>
              </button>
              {/* icon moon */}
              <figure>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 0c1.516 0 2.925.566 3.978 1.523A3.979 3.979 0 008 1a4.014 4.014 0 00-2.821 1.179A3.927 3.927 0 004 5c0 1.095.463 2.105 1.179 2.821A3.927 3.927 0 008 9a4.034 4.034 0 003.974-3.548c.017.18.026.364.026.548a6.02 6.02 0 01-1.768 4.232A6.02 6.02 0 016 12a5.89 5.89 0 01-4.232-1.768A6.02 6.02 0 010 6a5.89 5.89 0 011.768-4.232A6.02 6.02 0 016 0z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              </figure>
            </div>
          </div>

          {/* search mobile form */}
          <form className="bg-white z-10 p-4 w-10/12 max-w-[1100px] mx-auto rounded-md flex justify-between gap-2 dark:bg-custom_very_dark_blue sm:hidden">
            <input
              className="w-full py-2 outline-none border-b border-b-transparent focus:border-b focus:border-b-custom_violet dark:bg-custom_very_dark_blue dark:text-white"
              type="text"
              name="title"
              value={searchJob}
              onChange={(e) => handleSearchJob(e)}
              id="searchInput"
              placeholder="Filter by title, companies, expertise…"
            />
            <div className="flex items-center gap-4">
              {/* icon filter */}
              <button
                className="text-[#6E8098] dark:text-white"
                type="button"
                title="filter"
                onClick={(e) => filter()}
              >
                <figure>
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z"
                      fill="currentColor"
                      fillRule="nonzero"
                    />
                  </svg>
                </figure>
              </button>
              {/* icon search */}
              <button
                type="submit"
                title="search"
                className="bg-custom_violet flex justify-center items-center text-white h-[48px] w-[48px] rounded-[5px]"
              >
                <figure className="scale-90">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z"
                      fill="currentColor"
                      fillRule="nonzero"
                    />
                  </svg>
                </figure>
              </button>
            </div>
            {/* Modals fixed */}
            {/* Filter by location */}
            {openFilter && (
              <section
                className="fixed flex items-center z-20 inset-0 bg-black/20"
                onClick={(e) => {
                  //
                  if (e.target.closest(".filterModal")) {
                    setOpenFilter(true);
                  } else {
                    setOpenFilter(false);
                  }
                }}
              >
                <div className="w-10/12 mx-auto  flex flex-col gap-4 bg-white rounded-md filterModal dark:bg-custom_very_dark_blue">
                  {/* search */}
                  <div className="flex items-center mt-4 p-4  gap-4 border-b border-b-custom_light_grey dark:border-b-custom_dark_grey">
                    <figure>
                      <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
                          fill="#5964E0"
                          fillRule="nonzero"
                        />
                      </svg>
                    </figure>
                    <input
                      name="location"
                      className="w-full outline-none border-b-transparent border-b focus:border-b focus:border-b-custom_violet py-2  dark:bg-custom_very_dark_blue dark:text-white"
                      placeholder="Filter by location..."
                      type="text"
                    />
                  </div>
                  {/* checkbox */}
                  <div className="flex items-center gap-4 px-4">
                    <input
                      className="hidden"
                      id="fulltimecheckbox"
                      name="fulltimeonly"
                      type="checkbox"
                    />
                    <label
                      htmlFor="fulltimecheckbox"
                      onClick={() => filterCheck()}
                      className={`h-[24px] w-[24px] cursor-pointer flex bg-custom_light_grey hover:bg-[#5964e041] dark:bg-custom_dark_grey rounded-[3px] ${
                        fullTimeOnly &&
                        "bg-custom_violet dark:bg-custom_violet justify-center items-center hover:bg-custom_violet"
                      }`}
                      type="button"
                      title="checkbox"
                    >
                      {fullTimeOnly && (
                        <figure>
                          <svg width="15" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1 6.57l3.572 3.572L13.714 1"
                              stroke="#FFF"
                              strokeWidth="2"
                              fill="none"
                              fillRule="evenodd"
                            />
                          </svg>
                        </figure>
                      )}
                    </label>
                    <p className="font-bold dark:text-white">Full time Only</p>
                  </div>
                  {/* submit */}
                  <div className="p-4">
                    <ButtonViolet type={"submit"} text={"Search"}></ButtonViolet>
                  </div>
                </div>
              </section>
            )}
          </form>
          {/* form table */}
          <form className="bg-white hidden sm:flex w-10/12 max-w-[1100px] mx-auto rounded-md absolute bottom-[-40px] left-[50%] translate-x-[-50%]  justify-between items-center z-10 h-[80px]  dark:bg-custom_very_dark_blue">
            <div
              onClick={() => {
                document.getElementById("searchtablettitle").focus();
              }}
              className="p-4 w-full cursor-pointer border-r border-r-custom_light_grey dark:border-r-custom_dark_grey"
            >
              <div className="flex gap-2 items-center">
                <label htmlFor="searchtablettitle">
                  <figure>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z"
                        fill="#5964E0"
                        fillRule="nonzero"
                      />
                    </svg>
                  </figure>
                </label>
                <input
                  className="w-full outline-none border-b border-b-transparent focus:border-b focus:border-b-custom_violet py-2 dark:bg-custom_very_dark_blue dark:text-white"
                  type="text"
                  name="title"
                  value={searchJob}
                  onChange={(e) => handleSearchJob(e)}
                  id="searchtablettitle"
                  placeholder="Filter by title, companies, expertise…"
                />
              </div>
            </div>
            {/* filter by location */}
            <div
              onClick={() => {
                document.getElementById("searchtablelocation").focus();
              }}
              className="p-4 w-full border-r gap-2 flex items-center border-r-custom_light_grey cursor-pointer dark:border-r-custom_dark_grey"
            >
              <label htmlFor="searchtablelocation">
                <figure>
                  <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
                      fill="#5964E0"
                      fillRule="nonzero"
                    />
                  </svg>
                </figure>
              </label>
              <input
                id="searchtablelocation"
                placeholder="Filter by location..."
                type="text"
                name="location"
                className="w-full outline-none border-b border-b-transparent focus:border-b focus:border-b-custom_violet py-2 dark:bg-custom_very_dark_blue dark:text-white"
              />
            </div>
            <div className="p-4 w-full flex items-center">
              {/* checkbox */}
              <div className="flex items-center w-full gap-4 px-4">
                <input
                  className="hidden"
                  id="fulltimecheckbox"
                  name="fulltimeonly"
                  type="checkbox"
                />
                <label
                  htmlFor="fulltimecheckbox"
                  onClick={() => filterCheck()}
                  className={`h-[24px] w-[24px] cursor-pointer flex bg-custom_light_grey hover:bg-[#5964e041] dark:bg-custom_dark_grey rounded-[3px] ${
                    fullTimeOnly &&
                    "bg-custom_violet dark:bg-custom_violet justify-center items-center hover:bg-custom_violet"
                  }`}
                  type="button"
                  title="checkbox"
                >
                  {fullTimeOnly && (
                    <figure>
                      <svg width="15" height="12" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 6.57l3.572 3.572L13.714 1"
                          stroke="#FFF"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                        />
                      </svg>
                    </figure>
                  )}
                </label>
                <p className="font-bold dark:text-white">Full time Only</p>
              </div>
              {/* submit */}
              <div className="">
                <ButtonViolet
                  className={
                    "bg-custom_violet rounded-[5px] text-white font-bold flex justify-center px-8 py-4 hover:bg-custom_light_violet"
                  }
                  type={"submit"}
                  text={"Search"}
                ></ButtonViolet>
              </div>
            </div>
          </form>
        </header>

        {/* main */}
        {/* main list */}

        <main className="mb-20">
          <section className="mt-32 max-w-[1100px] w-10/12 mx-auto flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 md:gap-x-4">
            {/* item */}

            {defaultItemsLoaded !== undefined &&
              defaultItemsLoaded.length > 0 &&
              defaultItemsLoaded.map((item, index) => {
                return (
                  <button
                    onClick={() => redirect(item.company, item.id)}
                    key={item.id}
                    className="bg-white p-6 flex flex-col rounded-md  relative dark:bg-custom_very_dark_blue shadow-lg"
                    type="button"
                  >
                    <div className="flex gap-2 items-center mt-6">
                      <p className="font-normal text-custom_dark_grey">{item.postedAt}</p>
                      <div className="h-[4px] w-[4px] rounded-full bg-custom_dark_grey"></div>
                      <p className="font-normal text-custom_dark_grey">{item.contract}</p>
                    </div>
                    <h2 className="font-bold text-custom_very_dark_blue text-xl text-left dark:text-white">
                      {item.position}
                    </h2>
                    <p className="font-normal text-custom_dark_grey mb-8 mt-2">{item.company}</p>
                    <p className="font-bold text-sm text-custom_violet">{item.location}</p>

                    {/* logo item Scoot */}
                    {item.company == "Scoot" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#E99210] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="12">
                          <path
                            fill="#FFF"
                            d="M3.648 11.424c1.045 0 1.856-.235 2.432-.704.576-.47.864-1.099.864-1.888v-.096c0-.715-.256-1.272-.768-1.672-.512-.4-1.173-.643-1.984-.728-.704-.075-1.19-.168-1.456-.28-.267-.112-.4-.296-.4-.552 0-.181.085-.333.256-.456.17-.123.427-.184.768-.184.373 0 .677.083.912.248.235.165.4.392.496.68l1.824-.736a3.533 3.533 0 00-.368-.696 2.777 2.777 0 00-.624-.656 3.153 3.153 0 00-.936-.48c-.368-.123-.803-.184-1.304-.184-.384 0-.757.053-1.12.16a2.99 2.99 0 00-.96.472 2.477 2.477 0 00-.672.76 2.06 2.06 0 00-.256 1.04v.096c0 .757.264 1.33.792 1.72.528.39 1.24.621 2.136.696.33.032.605.075.824.128.219.053.392.12.52.2.128.08.216.165.264.256.048.09.072.19.072.296 0 .181-.093.35-.28.504-.187.155-.53.232-1.032.232-.565 0-.984-.128-1.256-.384a1.819 1.819 0 01-.536-.896L0 8.928c.053.277.157.563.312.856.155.293.376.56.664.8.288.24.65.44 1.088.6.437.16.965.24 1.584.24zm8.196 0c1.13 0 2.035-.288 2.712-.864.677-.576 1.107-1.333 1.288-2.272l-1.984-.496c-.096.523-.307.939-.632 1.248-.325.31-.797.464-1.416.464-.288 0-.56-.045-.816-.136a1.881 1.881 0 01-.672-.408 1.931 1.931 0 01-.456-.68 2.442 2.442 0 01-.168-.936v-.096c0-.352.056-.67.168-.952.112-.283.264-.523.456-.72.192-.197.416-.35.672-.456a2.1 2.1 0 01.816-.16c.619 0 1.099.17 1.44.512.341.341.544.747.608 1.216l1.984-.512c-.181-.939-.616-1.696-1.304-2.272-.688-.576-1.587-.864-2.696-.864-.576 0-1.117.096-1.624.288a3.89 3.89 0 00-1.328.832c-.379.363-.675.8-.888 1.312-.213.512-.32 1.088-.32 1.728v.192c0 .64.107 1.21.32 1.712.213.501.507.923.88 1.264.373.341.813.603 1.32.784a4.832 4.832 0 001.64.272zm8.196 0c.544 0 1.064-.09 1.56-.272a3.999 3.999 0 001.32-.792 3.73 3.73 0 00.912-1.28c.224-.507.336-1.09.336-1.752v-.192c0-.65-.112-1.23-.336-1.736a3.815 3.815 0 00-.912-1.288 3.93 3.93 0 00-1.32-.8 4.507 4.507 0 00-1.56-.272c-.544 0-1.064.09-1.56.272a3.93 3.93 0 00-1.32.8 3.815 3.815 0 00-.912 1.288c-.224.507-.336 1.085-.336 1.736v.192c0 .661.112 1.245.336 1.752.224.507.528.933.912 1.28s.824.61 1.32.792a4.507 4.507 0 001.56.272zm0-1.92c-.288 0-.56-.048-.816-.144a1.98 1.98 0 01-.672-.416 1.964 1.964 0 01-.456-.664 2.234 2.234 0 01-.168-.888v-.32c0-.33.056-.627.168-.888.112-.261.264-.483.456-.664a1.98 1.98 0 01.672-.416c.256-.096.528-.144.816-.144.288 0 .56.048.816.144.256.096.48.235.672.416.192.181.344.403.456.664.112.261.168.557.168.888v.32c0 .33-.056.627-.168.888a1.964 1.964 0 01-.456.664 1.98 1.98 0 01-.672.416 2.305 2.305 0 01-.816.144zm8.292 1.92c.544 0 1.064-.09 1.56-.272a3.999 3.999 0 001.32-.792 3.73 3.73 0 00.912-1.28c.224-.507.336-1.09.336-1.752v-.192c0-.65-.112-1.23-.336-1.736a3.815 3.815 0 00-.912-1.288 3.93 3.93 0 00-1.32-.8 4.507 4.507 0 00-1.56-.272c-.544 0-1.064.09-1.56.272a3.93 3.93 0 00-1.32.8A3.815 3.815 0 0024.54 5.4c-.224.507-.336 1.085-.336 1.736v.192c0 .661.112 1.245.336 1.752.224.507.528.933.912 1.28s.824.61 1.32.792a4.507 4.507 0 001.56.272zm0-1.92c-.288 0-.56-.048-.816-.144a1.98 1.98 0 01-.672-.416 1.964 1.964 0 01-.456-.664 2.234 2.234 0 01-.168-.888v-.32c0-.33.056-.627.168-.888.112-.261.264-.483.456-.664a1.98 1.98 0 01.672-.416c.256-.096.528-.144.816-.144.288 0 .56.048.816.144.256.096.48.235.672.416.192.181.344.403.456.664.112.261.168.557.168.888v.32c0 .33-.056.627-.168.888a1.964 1.964 0 01-.456.664 1.98 1.98 0 01-.672.416 2.305 2.305 0 01-.816.144zM39.696 11.2V9.28h-2.144c-.288 0-.432-.16-.432-.48V5.184h2.864v-1.92H37.12V0h-2.016v3.264h-2.352v1.92h2.352v4.768c0 .363.115.661.344.896.23.235.525.352.888.352h3.36z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Blogr */}
                    {item.company == "Blogr" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#E54D25] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="17">
                          <path
                            fill="#FFF"
                            d="M8.207 17c3.215 0 5.935-2.441 5.935-6.42s-2.72-6.398-5.935-6.398c-1.35 0-2.384.34-3.126 1.063V0H0v16.774h4.834v-1.017C5.576 16.593 6.678 17 8.207 17zm-1.214-3.979c-1.125 0-2.002-.836-2.002-2.441s.877-2.42 2.002-2.42c1.124 0 2 .815 2 2.42s-.876 2.441-2 2.441zM18.033 17C19.717 17 21 15.78 21 14.061c0-1.74-1.282-2.893-2.968-2.893s-2.968 1.152-2.968 2.893c0 1.718 1.282 2.939 2.968 2.939z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Vector */}
                    {item.company == "Vector" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#34353F] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="3">
                          <path
                            fill="#FFF"
                            d="M3.229 2.912L4.913.088h-1.22L2.466 2.383 1.237.088H0l1.702 2.824h1.527zm7.88 0v-.838H7.775V1.72h2.72v-.442h-2.72V.926h3.326V.088H6.679v2.824h4.43zM15.652 3c.555 0 1.015-.047 1.38-.141.364-.094.64-.235.826-.424.188-.188.288-.422.303-.701h-1.14a.556.556 0 01-.194.214 1.134 1.134 0 01-.418.156 3.928 3.928 0 01-.757.058c-.375 0-.679-.022-.913-.066-.234-.045-.405-.114-.513-.208a.463.463 0 01-.162-.366c0-.165.054-.297.162-.397.108-.1.28-.173.513-.218.234-.046.538-.069.913-.069.319 0 .572.02.759.062.187.041.327.098.42.17a.565.565 0 01.194.25h1.14a1.092 1.092 0 00-.302-.72c-.187-.197-.464-.346-.83-.448C16.669.051 16.208 0 15.653 0c-.424 0-.804.025-1.14.075-.337.05-.624.133-.86.25a1.316 1.316 0 00-.544.467c-.126.196-.19.439-.19.73s.064.532.19.724c.125.19.307.341.543.452.237.11.524.188.86.234.337.045.717.068 1.14.068zm7.02-.088V.926h1.734V.088h-4.563v.838h1.733v1.986h1.097zM28.607 3c.637 0 1.15-.057 1.54-.17.389-.113.671-.28.848-.503.177-.222.266-.498.266-.827 0-.33-.089-.605-.266-.827-.177-.222-.46-.39-.848-.503-.39-.113-.903-.17-1.54-.17-.638 0-1.151.057-1.54.17-.389.113-.672.28-.849.503-.177.222-.265.498-.265.827 0 .33.088.605.265.827.177.222.46.39.85.503.388.113.901.17 1.539.17zm0-.838c-.301 0-.565-.019-.792-.055-.227-.037-.404-.103-.53-.199a.48.48 0 01-.192-.408.48.48 0 01.191-.408c.127-.096.304-.162.531-.199.227-.036.49-.055.792-.055.301 0 .561.019.78.055.22.037.39.103.51.199.12.095.18.232.18.408 0 .176-.06.313-.18.408-.12.096-.29.162-.51.199-.219.036-.479.055-.78.055zm5.692.75v-.794h1.715c.234 0 .407.008.52.026.112.018.185.05.219.095.034.046.05.112.05.2v.473H37.9v-.605c0-.13-.037-.228-.112-.297-.074-.07-.206-.117-.395-.144a2.963 2.963 0 00-.11-.013l-.039-.004.077-.014c.105-.02.201-.052.288-.094l.063-.034a.63.63 0 00.241-.247A.823.823 0 0038 1.06c0-.244-.062-.437-.186-.578a1.027 1.027 0 00-.505-.302 2.623 2.623 0 00-.717-.09H33.2v2.823h1.097zm2.294-1.531h-2.294V.97h2.294c.088 0 .161.014.221.041.06.028.09.08.09.157 0 .082-.03.138-.09.168a.5.5 0 01-.221.044z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Office Lite */}
                    {item.company == "Office Lite" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#2F4FC7] rounded-2xl flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsklink="http://www.w3.org/1999/xlink"
                          width="30"
                          height="20"
                        >
                          <defs>
                            <circle id="a" cx="10" cy="10" r="10" />
                          </defs>
                          <g fill="none" fillRule="evenodd">
                            <circle cx="20" cy="10" r="10" fill="#5175FF" />
                            <mask id="b" fill="#fff">
                              <use xlinkHref="#a" />
                            </mask>
                            <use fill="#5175FF" xlinkHref="#a" />
                            <circle
                              cx="20"
                              cy="10"
                              r="10"
                              fill="#B4C4FF"
                              mask="url(#b)"
                              opacity=".324"
                            />
                          </g>
                        </svg>
                      </figure>
                    )}
                    {/* logo item Pod */}
                    {item.company == "Pod" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#132034] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path
                            fill="#54E6AF"
                            fillRule="evenodd"
                            d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM9.943 5.926c-.658 0-1.182.45-1.277 1.094l-1.005 6.977c-.005.033-.017.118-.137.123-.115.005-.138-.073-.146-.107l-.325-1.431c-.212-.888-1.003-1.527-1.882-1.527a.576.576 0 00-.578.573c0 .316.259.573.578.573.342 0 .666.273.754.636l.324 1.43a1.286 1.286 0 001.326.997 1.283 1.283 0 001.232-1.103l1.005-6.978c.005-.036.016-.111.13-.111l.056.008c.062.02.07.074.074.103l1.41 9.777a1.279 1.279 0 001.297 1.114h.022c.68-.01 1.208-.484 1.284-1.153l.197-1.734a.574.574 0 00-.51-.633.577.577 0 00-.64.505l-.197 1.733c-.004.037-.015.134-.151.136-.135.003-.15-.095-.155-.13L11.217 7.02a1.26 1.26 0 00-1.274-1.095zm4.8 3.925c-.599.016-1.065.439-1.132 1.029l-.245 2.144a.574.574 0 00.51.634.577.577 0 00.64-.505l.245-2.145a.12.12 0 01.002-.01.065.065 0 01.022 0l.002.008.455 2.743a1.23 1.23 0 001.23 1.03c.573 0 1.065-.378 1.205-.935l.001-.007.205-.858c.113-.444.519-.778.946-.778.32 0 .578-.257.578-.573a.576.576 0 00-.578-.573c-.96 0-1.83.694-2.07 1.65l-.002.007-.204.859c-.007.027-.02.064-.087.062-.071-.003-.078-.044-.083-.07l-.454-2.744a1.145 1.145 0 00-1.185-.968z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Creative */}
                    {item.company == "Creative" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#4E1853] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                          <path
                            fill="#F94F4F"
                            fillRule="evenodd"
                            d="M13 0c6.08 0 11.186 4.175 12.607 9.814h-1.964c-.094.516-.283.93-.567 1.243-.284.312-.696.468-1.236.468-.486 0-1.013-.13-1.58-.387a52.835 52.835 0 01-1.845-.886 14.576 14.576 0 00-2.198-.875C15.413 9.126 14.532 9 13.572 9c-1.729 0-3.09.733-4.083 2.2-.937 1.384-1.432 3.234-1.484 5.551L8 17.165h4.357c.094-.502.307-.91.638-1.222.33-.312.773-.468 1.327-.468.46 0 .966.126 1.52.377a65.15 65.15 0 011.864.886c.69.339 1.449.634 2.28.885A9.31 9.31 0 0022.69 18c1.004 0 1.879-.275 2.625-.825C23.577 22.305 18.72 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Pomodoro */}
                    {item.company == "Pomodoro" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#4722C6] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="7">
                          <path
                            fill="#D7E0FF"
                            d="M1 7V4.904a1.64 1.64 0 001.109.416 1.624 1.624 0 001.472-.884c.146-.274.22-.586.22-.936 0-.35-.074-.662-.22-.936a1.624 1.624 0 00-1.473-.884c-.224 0-.434.04-.628.117a1.552 1.552 0 00-.51.331L.944 1.75H0V7h1zm.883-2.555a.825.825 0 01-.632-.27A.955.955 0 011 3.5c0-.27.083-.496.25-.675a.825.825 0 01.632-.27c.254 0 .465.09.632.27.167.18.25.404.25.675 0 .27-.083.496-.25.676a.825.825 0 01-.632.269zm4.189.875c.357 0 .674-.079.952-.236.278-.158.497-.374.658-.648.16-.274.241-.586.241-.936 0-.35-.08-.662-.241-.936-.161-.274-.38-.49-.658-.648a1.896 1.896 0 00-.952-.236c-.357 0-.675.079-.954.236a1.748 1.748 0 00-.66.648c-.16.274-.241.586-.241.936 0 .35.08.662.241.936.161.274.381.49.66.648.28.157.597.236.954.236zm0-.875a.825.825 0 01-.632-.27.955.955 0 01-.25-.675c0-.27.083-.496.25-.675a.825.825 0 01.632-.27c.255 0 .465.09.632.27.167.18.25.404.25.675 0 .27-.083.496-.25.676a.825.825 0 01-.632.269zm3.512.805V3.392c0-.278.063-.487.19-.627a.602.602 0 01.463-.21c.178 0 .33.068.457.203.126.135.189.338.189.609V5.25h1V3.392c0-.278.064-.487.191-.627a.602.602 0 01.462-.21c.179 0 .33.068.457.203.126.135.19.338.19.609V5.25h1V3.367c0-.53-.117-.943-.351-1.24-.234-.298-.562-.447-.983-.447-.266 0-.498.06-.695.179-.197.119-.353.289-.469.51-.222-.46-.6-.689-1.136-.689-.419 0-.751.147-.996.441l-.025-.371h-.945v3.5h1zm7.044.07c.357 0 .674-.079.952-.236.278-.158.497-.374.658-.648.161-.274.242-.586.242-.936 0-.35-.08-.662-.242-.936-.16-.274-.38-.49-.658-.648a1.896 1.896 0 00-.952-.236c-.356 0-.674.079-.953.236a1.748 1.748 0 00-.66.648c-.161.274-.242.586-.242.936 0 .35.08.662.242.936.16.274.38.49.66.648.279.157.597.236.953.236zm0-.875a.825.825 0 01-.632-.27.955.955 0 01-.25-.675c0-.27.083-.496.25-.675a.825.825 0 01.632-.27c.255 0 .466.09.633.27.166.18.25.404.25.675 0 .27-.084.496-.25.676a.825.825 0 01-.633.269zm3.96.875c.227 0 .437-.04.63-.117.194-.078.364-.189.51-.331l.024.378h.945V0h-1v2.096a1.64 1.64 0 00-1.109-.416 1.626 1.626 0 00-1.473.884 1.962 1.962 0 00-.218.936c0 .35.073.662.218.936a1.626 1.626 0 001.473.884zm.226-.875a.825.825 0 01-.632-.27.955.955 0 01-.25-.675c0-.27.083-.496.25-.675a.825.825 0 01.632-.27c.255 0 .466.09.632.27.167.18.25.404.25.675 0 .27-.083.496-.25.676a.825.825 0 01-.632.269zm4.398.875c.356 0 .674-.079.951-.236.278-.158.498-.374.659-.648.16-.274.241-.586.241-.936 0-.35-.08-.662-.241-.936-.161-.274-.38-.49-.659-.648a1.896 1.896 0 00-.951-.236c-.357 0-.675.079-.954.236a1.748 1.748 0 00-.66.648c-.16.274-.241.586-.241.936 0 .35.08.662.241.936.161.274.381.49.66.648.28.157.597.236.954.236zm0-.875a.825.825 0 01-.633-.27.955.955 0 01-.25-.675c0-.27.084-.496.25-.675a.825.825 0 01.633-.27c.254 0 .465.09.632.27.167.18.25.404.25.675 0 .27-.083.496-.25.676a.825.825 0 01-.632.269zm3.512.805V3.707c0-.37.082-.653.246-.853a.8.8 0 01.65-.299c.13 0 .261.022.396.067l.139-.872a1.657 1.657 0 00-.466-.07c-.442 0-.79.19-1.042.57l-.049-.5h-.875v3.5h1zm3.425.07c.356 0 .673-.079.951-.236.278-.158.498-.374.659-.648.16-.274.241-.586.241-.936 0-.35-.08-.662-.241-.936-.161-.274-.38-.49-.659-.648a1.896 1.896 0 00-.951-.236c-.357 0-.675.079-.954.236a1.748 1.748 0 00-.66.648c-.16.274-.241.586-.241.936 0 .35.08.662.241.936.161.274.381.49.66.648.28.157.597.236.954.236zm0-.875a.825.825 0 01-.633-.27.955.955 0 01-.25-.675c0-.27.084-.496.25-.675a.825.825 0 01.633-.27c.254 0 .465.09.632.27.166.18.25.404.25.675 0 .27-.084.496-.25.676a.825.825 0 01-.632.269z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Maker */}
                    {item.company == "Maker" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#21427D] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                          <path
                            fill="#3EE9E5"
                            fillRule="evenodd"
                            d="M10.057 0c5.01 0 9.166 3.664 9.931 8.46a8.172 8.172 0 01-11.53 11.528C3.664 19.221 0 15.067 0 10.057 0 4.502 4.503 0 10.057 0zm3.757 5.657a8.171 8.171 0 00-5.356 14.33 10.083 10.083 0 002.421.094 6.914 6.914 0 119.202-9.203 10.06 10.06 0 01-9.202 9.203 6.914 6.914 0 009.202-9.203 10.252 10.252 0 00-.093-2.418 8.15 8.15 0 00-6.174-2.803z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Coffeeroasters */}
                    {item.company == "Coffeeroasters" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#F2DECB] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path
                            fill="#0E8784"
                            d="M22.123 9.378c2.89 2.89 2.387 8.1-1.126 11.613-1.688 1.687-3.813 2.74-5.987 2.965-.29.029-.576.044-.856.044-1.87 0-3.539-.656-4.769-1.886-1.416-1.414-2.07-3.412-1.839-5.625.224-2.173 1.277-4.299 2.964-5.986 3.515-3.512 8.724-4.019 11.613-1.125zm-.18.18c-.961 1.16-1.67 2.482-2.851 3.453-1.257 1.033-2.64 1.41-4.161 1.85-3.338.97-4.988 3.791-5.369 7.075 1.043-1.253 1.808-2.657 3.125-3.663 1.152-.88 2.398-1.227 3.754-1.598 3.411-.936 5.105-3.781 5.502-7.117zM13.49 3.003a10.573 10.573 0 012.165 3.151c-1.68.29-3.308.992-4.75 2.046a7.17 7.17 0 00-1.837-.84c-1.519-.44-2.903-.816-4.16-1.85-1.18-.971-1.889-2.296-2.852-3.454.396 3.336 2.091 6.182 5.502 7.118.576.157 1.128.32 1.666.511-1.626 1.713-2.696 3.8-3.07 5.97A10.607 10.607 0 013 13.491C-.508 9.978-1.014 4.768 1.877 1.878 4.766-1.014 9.975-.51 13.489 3.003z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Mastercraft */}
                    {item.company == "Mastercraft" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#1F1F1F] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                          <g fill="none">
                            <path
                              fill="#444"
                              d="M2.558 12.102a1.93 1.93 0 012.605-.113l.123.113 10.142 10.141a1.93 1.93 0 01-2.606 2.841l-.123-.112L2.558 14.83a1.93 1.93 0 010-2.728z"
                            />
                            <path
                              fill="#FFF"
                              d="M23.182 1.017c1.007-.996 2.707-.34 2.806 1.026l.005.126v10.736c0 .9-.737 1.629-1.647 1.629a1.64 1.64 0 01-1.642-1.507l-.004-.122V6.1l-8.043 7.957c-1.007.995-2.707.34-2.806-1.026l-.005-.126V6.1l-8.043 7.957a1.66 1.66 0 01-2.223.095l-.105-.095a1.616 1.616 0 01-.096-2.2l.096-.104L12.328 1.017c1.007-.996 2.707-.34 2.806 1.026l.005.126v6.804l8.043-7.956z"
                            />
                          </g>
                        </svg>
                      </figure>
                    )}
                    {/* logo item Crowdfund */}
                    {item.company == "Crowdfund" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#37C790] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="6">
                          <path
                            fill="#FFF"
                            d="M2.166 6c.801 0 1.496-.42 1.848-1.062l-1.071-.617c-.131.288-.433.46-.793.46-.531 0-.924-.386-.924-.954s.393-.955.924-.955c.36 0 .654.172.793.46l1.07-.625c-.35-.634-1.054-1.054-1.847-1.054C.924 1.653 0 2.6 0 3.827 0 5.053.924 6 2.166 6zm3.386-.115v-1.86c0-.816.72-1.022 1.226-.94V1.687c-.515 0-1.062.264-1.226.815v-.733H4.326v4.117h1.226zM8.971 6a2.15 2.15 0 002.166-2.173A2.15 2.15 0 008.97 1.653a2.15 2.15 0 00-2.166 2.174A2.15 2.15 0 008.97 6zm0-1.202c-.532 0-.94-.387-.94-.971 0-.585.408-.972.94-.972.531 0 .94.387.94.972 0 .584-.409.971-.94.971zm4.522 1.087l.654-2.198.654 2.198h1.144l1.308-4.117h-1.308l-.588 2.207-.638-2.207h-1.144l-.638 2.207-.589-2.207h-1.307l1.307 4.117h1.145zM19.11 6c.548 0 .949-.19 1.218-.502v.387h1.226V.122h-1.226v2.033c-.27-.312-.67-.502-1.218-.502-1.07 0-1.953.947-1.953 2.174C17.157 5.053 18.04 6 19.11 6zm.246-1.169c-.564 0-.973-.387-.973-1.004 0-.618.409-1.005.973-1.005.564 0 .972.387.972 1.005 0 .617-.408 1.004-.972 1.004zm4.366 1.054V2.954h.76V1.768h-.76c0-.477.303-.617.76-.576V.007c-1.356-.083-1.986.609-1.986 1.761h-.547v1.186h.547v2.93h1.226zM26.185 6c.54 0 .948-.198 1.169-.502v.387h1.226V1.768h-1.226v2.248c0 .584-.311.848-.76.848-.393 0-.712-.239-.712-.75V1.769h-1.226v2.528c0 1.111.703 1.704 1.529 1.704zm4.301-.115V3.637c0-.584.31-.848.76-.848.393 0 .711.239.711.75v2.346h1.227V3.357c0-1.111-.703-1.704-1.529-1.704-.54 0-.948.198-1.169.502v-.387H29.26v4.117h1.226zm5.07.115c.548 0 .948-.19 1.218-.502v.387H38V.122h-1.226v2.033c-.27-.312-.67-.502-1.218-.502-1.071 0-1.954.947-1.954 2.174 0 1.226.883 2.173 1.954 2.173zm.245-1.169c-.564 0-.973-.387-.973-1.004 0-.618.41-1.005.973-1.005.564 0 .973.387.973 1.005 0 .617-.409 1.004-.973 1.004z"
                          />
                        </svg>
                      </figure>
                    )}
                    {/* logo item Typemaster */}
                    {item.company == "Typemaster" && (
                      <figure className="absolute top-[-24px] left-[24px] h-[50px] w-[50px] bg-[#F16718] rounded-2xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <g fill="none" fillRule="evenodd">
                            <path fill="#FFF" d="M0 0h24v24H0z" />
                            <path
                              fill="#F16718"
                              fillRule="nonzero"
                              d="M6.205 10.2c.11 0 .173-.066.173-.18V5.204c0-.047.027-.076.073-.076h1.466c.11 0 .173-.066.173-.179V3.78c0-.113-.064-.179-.173-.179H3.173c-.11 0-.173.066-.173.18v1.168c0 .113.064.18.173.18h1.42c.046 0 .073.028.073.075v4.818c0 .113.064.179.173.179h1.366zm3.943 0c.109 0 .173-.066.173-.18V6.694c0-.076.054-.085.09-.029l.565.971a.222.222 0 00.21.123h.637a.222.222 0 00.21-.123l.564-.97c.037-.057.091-.048.091.028v3.328c0 .113.064.179.173.179h1.366c.11 0 .173-.066.173-.18V3.78c0-.114-.064-.18-.173-.18H12.87a.222.222 0 00-.21.123l-1.1 1.857c-.028.057-.083.057-.11 0l-1.102-1.857a.222.222 0 00-.21-.123H8.783c-.11 0-.173.066-.173.18v6.24c0 .114.064.18.173.18h1.366z"
                            />
                          </g>
                        </svg>
                      </figure>
                    )}
                  </button>
                );
              })}
          </section>
          {/* load more */}
          {defaultItemsLoaded !== undefined && defaultItemsLoaded.length <= 10 && (
            <div className="flex justify-center mt-12">
              <ButtonViolet
                type={"button"}
                onClick={() => {
                  setDefaultItemsLoaded(() => {
                    return data.filter((item) => {
                      return item;
                    });
                  });
                }}
                text={"Load More"}
                className={
                  "bg-custom_violet rounded-[5px] text-white font-bold flex justify-center w-max px-10 py-4 hover:bg-custom_light_violet"
                }
              ></ButtonViolet>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
