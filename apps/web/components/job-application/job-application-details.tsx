'use client';

import { Button, Card } from '@hanapp-ph/commons';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface JobDetailsCardProps {
  job: {
    service: string;
    category: string;
    pricing: string;
    description: string;
    location: string;
    date: string;
    time: string;
    qualifications: string[];
    attachedPhotos: string[];
  };
}

export default function JobDetailsCard({ job }: JobDetailsCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () =>
    setCurrentIndex(prev => (prev + 1) % job.attachedPhotos.length);

  const prevPhoto = () =>
    setCurrentIndex(
      prev => (prev - 1 + job.attachedPhotos.length) % job.attachedPhotos.length
    );

  return (
    <Card className="overflow-hidden border-none shadow-none">
      {job.attachedPhotos.length > 0 && (
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={job.attachedPhotos[currentIndex] || '/placeholder.svg'}
            alt={job.service}
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Pagination + arrows */}
          {job.attachedPhotos.length > 1 && (
            <>
              <Button
                variant="ghost"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-white p-2 rounded-full"
              >
                ‹
              </Button>
              <Button
                variant="ghost"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white hover:text-white p-2 rounded-full"
              >
                ›
              </Button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {job.attachedPhotos.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Job details */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl md:text-3xl font-bold text-hanapp-primary">
            {job.service}
          </h1>
          <span className="px-2 md:px-4 py-1 rounded-full border-2 border-hanapp-secondary text-sm font-medium text-hanapp-secondary">
            {job.category}
          </span>
        </div>

        <div className="bg-hanapp-accent text-hanapp-secondary rounded-full inline-block px-5 py-1 mb-6">
          <span className="text-lg md:text-2xl font-bold">{job.pricing}</span>
        </div>

        <div className="border-t-2 border-border mb-4" />

        <div className="space-y-4 mb-8">
          <p className="text-hanapp-secondary">{job.description}</p>

          <div className="flex items-start gap-3 text-hanapp-primary">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-hanapp-secondary">{job.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-hanapp-primary">
            <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Schedule</p>
              <p className="text-hanapp-secondary">
                {job.date} at {job.time}
              </p>
            </div>
          </div>
        </div>

        {job.qualifications.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg text-hanapp-primary mb-4">
              Additional Requirements
            </h3>
            <ul className="space-y-3">
              {job.qualifications.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-hanapp-secondary"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
