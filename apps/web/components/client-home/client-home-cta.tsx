import { Button } from '@hanapp-ph/commons';

interface ClientHomeCtaProps {
  onPostJob?: () => void;
  onFindJob?: () => void;
}

export function ClientHomeCta({ onPostJob, onFindJob }: ClientHomeCtaProps) {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready ka na bang
              <br />
              mag-Hanapp?
            </h2>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
                onClick={onPostJob}
              >
                Post a Job
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={onFindJob}
              >
                Find a Job
              </Button>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="hidden lg:block relative">
            <div className="w-96 h-96 relative">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl" />

              {/* Placeholder for image - replace with actual image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center text-white text-6xl">
                  👨‍💼
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
