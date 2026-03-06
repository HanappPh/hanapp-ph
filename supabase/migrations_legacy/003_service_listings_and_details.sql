-- Service Listings table (parent table for provider service offerings)
CREATE TABLE public.service_listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_from DECIMAL(10, 2),
  availability_schedule JSONB, -- Store schedule as JSON
  service_areas TEXT[] NOT NULL, -- Array of service locations
  images TEXT[], -- Array of image URLs
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_listings
CREATE POLICY "Service listings are viewable by everyone"
  ON public.service_listings FOR SELECT
  USING (is_active = true OR auth.uid() = provider_id);

CREATE POLICY "Providers can create their own service listings"
  ON public.service_listings FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own service listings"
  ON public.service_listings FOR UPDATE
  USING (auth.uid() = provider_id);

CREATE POLICY "Providers can delete their own service listings"
  ON public.service_listings FOR DELETE
  USING (auth.uid() = provider_id);

-- Indexes for service_listings
CREATE INDEX idx_service_listings_provider_id ON public.service_listings(provider_id);
CREATE INDEX idx_service_listings_category_id ON public.service_listings(category_id);
CREATE INDEX idx_service_listings_is_active ON public.service_listings(is_active);
CREATE INDEX idx_service_listings_created_at ON public.service_listings(created_at DESC);

-- Service Listing Details table (individual services within a listing)
CREATE TABLE public.service_listing_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.service_listings(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rate DECIMAL(10, 2) NOT NULL,
  charge TEXT NOT NULL, -- e.g., "per hour", "per day", "flat rate"
  is_addon BOOLEAN DEFAULT false, -- Whether this is an additional service
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_listing_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_listing_details
-- Anyone can view details of active listings
CREATE POLICY "Service listing details are viewable by everyone"
  ON public.service_listing_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_listings 
      WHERE service_listings.id = listing_id 
      AND (service_listings.is_active = true OR service_listings.provider_id = auth.uid())
    )
  );

-- Providers can create details for their own listings
CREATE POLICY "Providers can create details for their own service listings"
  ON public.service_listing_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.service_listings 
      WHERE service_listings.id = listing_id 
      AND service_listings.provider_id = auth.uid()
    )
  );

-- Providers can update details of their own listings
CREATE POLICY "Providers can update their own service listing details"
  ON public.service_listing_details FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.service_listings 
      WHERE service_listings.id = listing_id 
      AND service_listings.provider_id = auth.uid()
    )
  );

-- Providers can delete details of their own listings
CREATE POLICY "Providers can delete their own service listing details"
  ON public.service_listing_details FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.service_listings 
      WHERE service_listings.id = listing_id 
      AND service_listings.provider_id = auth.uid()
    )
  );

-- Indexes for service_listing_details
CREATE INDEX idx_service_listing_details_listing_id ON public.service_listing_details(listing_id);

-- Triggers for updated_at
CREATE TRIGGER update_service_listings_updated_at
  BEFORE UPDATE ON public.service_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_listing_details_updated_at
  BEFORE UPDATE ON public.service_listing_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Drop old services table if it exists (we're replacing it with the new structure)
-- Comment this out if you want to keep the old services table
-- DROP TABLE IF EXISTS public.services CASCADE;
