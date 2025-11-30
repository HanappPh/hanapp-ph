'use client';

import { JobData } from './data/jobsData';

interface ServicesSectionProps {
  selectedJob: JobData;
  setSelectedJob: (job: JobData) => void;
  jobsData: JobData[];
}

const ServicesSection = ({
  selectedJob,
  setSelectedJob,
  jobsData,
}: ServicesSectionProps) => {
  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Book fast,{' '}
          <span className="text-hanapp-primary">get helped faster.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Details Section - 1/2 width on large screens */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedJob.title}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {selectedJob.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{selectedJob.subtitle}</p>
                <p className="text-2xl font-bold text-hanapp-primary">
                  {selectedJob.price}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  About This Service
                </h4>
                <p className="text-gray-600 text-sm">
                  {selectedJob.detailedDescription}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Services Included
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedJob.services.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-hanapp-primary rounded-full mr-2"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">
                    Experience:
                  </span>
                  <p className="text-gray-600">{selectedJob.experience}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Response Time:
                  </span>
                  <p className="text-gray-600">{selectedJob.responseTime}</p>
                </div>
              </div>

              <div className="mb-4 text-sm">
                <span className="font-semibold text-gray-900">Warranty:</span>
                <p className="text-gray-600">{selectedJob.warranty}</p>
              </div>

              <button className="w-full bg-hanapp-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Book {selectedJob.title}
              </button>
            </div>
          </div>

          {/* Jobs Grid Section - 1/2 width on large screens */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobsData.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                    selectedJob.id === job.id
                      ? 'border-hanapp-primary ring-2 ring-hanapp-primary ring-opacity-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{job.subtitle}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-hanapp-primary font-semibold text-sm">
                      {job.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      Click for details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
