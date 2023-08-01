import { LocalizedContent } from "@/cms/home";
import parse from "html-react-parser";

// import BackgroundVideo from "../../images/front-main/BlueX Page animated background.mp4";

export default function FrontMainSection({ content }: { content: LocalizedContent }) {
  return (
    <div
      className="relative w-full h-fit bg-white overflow-hidden"
    >
      <video
        id="BGMainVideo"
        className="relative w-screen mb-[-0.5rem] laptopx:h-[41.75rem] laptopx:w-auto mobilex:h-[47.5rem]"
        autoPlay={true}
        preload="auto"
        muted
        loop
      >
        <source
          src="https://www.bluexpay.com/static/24484696578bc710b212f3cae84878aa/Blue_X_Page_animated_background_Whats_App_Video_2022_08_26_at_7_54_42_PM_905b94067b.mp4"
          type="video/mp4"
        />
        <a
          href="https://www.bluexpay.com/static/5daa9eb7adaf5967ee82ab206970d731/Blue_X_Page_animated_background_preview_4b504b22b9.jpg"
          aria-label="Background_Video_Preview"
        >
          {" "}
        </a>
      </video>
      <div
        // MainSectionWrapper
        className="absolute flex top-0 w-full h-full items-center bg-[rgba(24,51,94,0.5)]"
      >
        <div
          // MainSectionContent
          className="flex flex-col md:flex-row w-full lg:w-[60rem] box-border md:px-5 mx-auto my-0 overflow-x-visible box-border box-sizing"
        >
          <div
            // TitleWrapper
            className="w-[25rem] flex flex-col mr-[6.25rem] laptopx:mr-0 mobilex:w-full"
          >
            <div
              // Title
              className="font-title w-[36rem] z-20 leading-[3rem] text-white not-italic text-[rgb(24,51,94)] text-[3.125rem] font-bold tracking-[normal] whitespace-pre-wrap text-left mb-[1.375rem]"
            >
              {parse(content.Section_1_Title)}
            </div>
            <div
              className="mb-[2.625rem]"
            >
              <div
                className="font-title font-normal not-italic text-white text-base tracking-[normal] whitespace-pre-wrap text-left"
              >
                {content.Section_1_Content}
              </div>
            </div>
            <button
              className="w-36 text-sm leading-6 font-bold normal-case text-center text-white px-2 py-1.5 bg-[#009bd2] rounded-[18px] border-none hover:bg-[#00afec]"
              // onClick={() => btnCallback(true)}
            >
              {content.Section_1_Button.text}
            </button>
          </div>
          {/* <ImgRelativeFrame>
            <ImgWrapper />
          </ImgRelativeFrame> */}
        </div>
      </div>
    </div>
  );
};
