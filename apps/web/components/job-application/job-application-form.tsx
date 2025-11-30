import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Label,
  Textarea,
} from '@hanapp-ph/commons';
import React, { useState } from 'react';

interface JobApplicationFormProps {
  onSubmit: (qualifications: string, experience: string) => void;
  isSubmitting?: boolean;
}

export default function JobApplicationForm({
  onSubmit,
  isSubmitting = false,
}: JobApplicationFormProps) {
  const [qualifications, setQualifications] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(qualifications, experience);
  };
  return (
    <>
      <Card className="sticky top-4 border-none shadow-none bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-hanapp-primary">
            Make the Application
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label className="block text-lg text-hanapp-secondary font-semibold mb-3">
                What are your qualifications for the job?
              </Label>
              <Textarea
                value={qualifications}
                onChange={e => setQualifications(e.target.value)}
                placeholder="Share your relevant qualifications..."
                className="w-full h-32 rounded-lg resize-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div>
              <Label className="block text-lg text-hanapp-secondary font-semibold mb-3">
                Tell me about your relevant experience(s)
              </Label>
              <Textarea
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="Describe your relevant experience..."
                className="w-full h-32 rounded-lg resize-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting || !qualifications.trim() || !experience.trim()
              }
              className="w-full bg-hanapp-accent hover:bg-hanapp-secondary transition-colors text-hanapp-secondary hover:text-hanapp-accent font-semibold py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center mt-6">
              There is no guarantee that your application will be accepted. Be
              honest in your responses for a better chance to qualify for the
              job.
            </p>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
