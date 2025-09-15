import { Button, Card, Input } from '@hanapp-ph/commons';

export default function TestComponents() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Testing Shared Components</h2>

      <div className="space-y-2">
        <Button variant="default">Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>

      <Card className="p-4">
        <p>This is a shared Card component</p>
      </Card>

      <Input placeholder="This is a shared Input component" />
    </div>
  );
}
