-- Job Applications table for service request applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service_request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
  provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  qualifications TEXT NOT NULL,
  experience TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Providers can view their own applications"
  ON public.job_applications FOR SELECT
  USING (auth.uid() = provider_id);

CREATE POLICY "Clients can view applications to their service requests"
  ON public.job_applications FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Providers can create applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own applications"
  ON public.job_applications FOR UPDATE
  USING (auth.uid() = provider_id);

CREATE POLICY "Clients can update applications status"
  ON public.job_applications FOR UPDATE
  USING (auth.uid() = client_id);

-- Indexes
CREATE INDEX idx_job_applications_service_request_id ON public.job_applications(service_request_id);
CREATE INDEX idx_job_applications_provider_id ON public.job_applications(provider_id);
CREATE INDEX idx_job_applications_client_id ON public.job_applications(client_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
