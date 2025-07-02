// JobSlider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { MapPin, Building, Clock, Briefcase } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { fetchJobsByMaxSalaires } from "@/model/clients/job-client";
import { JobDetails } from "@/model/domains/job.domain";
import Link from "next/link";

const JobSlider = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobsByMaxSalaires(0, 5); // fetch top 5 high salary jobs
        const jobs = Array.isArray(data?.contents) ? data.contents : [];
        setJobs(jobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };

    loadJobs();
  }, []);

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
        {jobs.map((job) => (
          <SwiperSlide key={job.id}>
            <Link href={`/public-employer/${job.employer.id}/${job.id}`}>
              <div
                className="detail-job relative flex flex-col md:flex-row h-[230px]"
                data-jobid="JOB0000787"
              >
                <div className="recommended bg-blue-500 text-white z-10 p-2 rounded-t ">
                  recommended job
                </div>
                <div className="swiper-slide-left md:w-[300px] w-full h-full p-12 pl-14 rounded-l border border-l-blue-500 bg-white flex items-center justify-center">
                  <div className="flex items-center justify-center ">
                    <img
                      alt="job-img"
                      className="w-full h-full object-contain rounded-lg"
                      src={
                        `http://localhost:8080` +
                          job.employer.profilePictureUrl || "/default-job.png"
                      }
                    />
                  </div>
                </div>
                <div
                  className="swiper-slide-right flex-1 h-full p-6 rounded-r-lg flex flex-col justify-center shadow-lg"
                  style={{ backgroundColor: "#3737378C" }}
                >
                  <p className="text-2xl text-center font-bold text-white">
                    {job.title}
                  </p>
                  <p className="text-center mt-2 border-b-4 border-blue-700 pb-2">
                    <span className="text-gray-200">
                      {" "}
                      {job.description.length > 80
                        ? job.description.slice(0, 80) + "..."
                        : job.description}
                    </span>
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-white/90">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{job.employer.companyName}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{job.workMode}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{job.jobType}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center ">
                    <span className="bg-yellow-600/80 border border-yellow-200  text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                      {`Up to MMK ${job.salaryMax.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default JobSlider;
