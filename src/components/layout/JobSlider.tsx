// JobSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { MapPin, Building, Clock, Briefcase } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const JobSlider = () => {
  return (
    <div className="relative w-full mb-12">
      <Swiper
        className="mySwiper"
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: "#custom-pagination" }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="detail-job relative flex flex-col md:flex-row h-[230px]"
            data-jobid="JOB0000787"
          >
            <div className="recommended bg-blue-500 text-white z-10 p-2 rounded-t">
              recommended job
            </div>
            <div className="swiper-slide-left md:w-[320px] w-full h-full p-8 pl-14 rounded-l border border-l-blue-500 bg-white flex items-center justify-center">
              <div className="w-[240px] h-[240px] flex items-center justify-center">
                <img
                  alt="job-img"
                  className="w-full h-full object-contain rounded-lg"
                  src="https://job-matching-prod.s3-ap-northeast-1.amazonaws.com/job/CLI0000350/JOB0000974/sub/1733108275037_JOB0000974.jpg"
                />
              </div>
            </div>
            <div
              className="swiper-slide-right flex-1 h-full p-6 rounded-r-lg flex flex-col justify-center shadow-lg"
              style={{ backgroundColor: "#3737378C" }}
            >
              <p className="text-2xl text-center font-bold text-white">
                Specialized Software Development
              </p>
              <p className="text-center mt-2 border-b-4 border-blue-700 pb-2">
                <span className="text-gray-200">
                  50% Remote Work, Biannual Bonus, and excellent support system.
                </span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-white/90">
                  <Building className="w-4 h-4 mr-2" />
                  <span>Tech Company Inc.</span>
                </div>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Kamaryut, Yangon</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>Full Time</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {["Python", "React", "AWS"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="detail-job relative flex flex-col md:flex-row h-[230px]"
            data-jobid="JOB0000237"
          >
            <div className="recommended bg-blue-500 text-white z-10 p-2 rounded-t">
              recommended job
            </div>
            <div className="swiper-slide-left md:w-[320px] w-full h-full p-8 pl-14 rounded-l border border-l-blue-500 bg-white flex items-center justify-center">
              <div className="w-[240px] h-[240px] flex items-center justify-center">
                <img
                  alt="job-img"
                  className="w-full h-full object-contain rounded-lg"
                  src="https://job-matching-prod.s3-ap-northeast-1.amazonaws.com/job/CLI0000146/JOB0000237/1722579461212_JOB0000237.png"
                />
              </div>
            </div>
            <div
              className="swiper-slide-right flex-1 h-full p-6 rounded-r-lg flex flex-col justify-center shadow-lg"
              style={{ backgroundColor: "#3737378C" }}
            >
              <p className="text-2xl text-center font-bold text-white">
                Web Development: Java, PHP & More!
              </p>
              <p className="text-center mt-2 border-b-4 border-blue-700 pb-2">
                <span className="text-gray-200">
                  100% Remote Work, Biannual Bonus, and competitive salary.
                </span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-white/90">
                  <Building className="w-4 h-4 mr-2" />
                  <span>Global Tech Inc.</span>
                </div>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Sanchaung, Yangon</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>Full Time</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {["Java", "PHP", "MySQL"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default JobSlider;
