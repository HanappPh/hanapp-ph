import { Button } from '@hanapp-ph/commons';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <Button variant="default">Click Me</Button>
    </div>
  );
}
