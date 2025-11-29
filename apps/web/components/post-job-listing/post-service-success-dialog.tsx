import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@hanapp-ph/commons';

interface PostServiceSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostServiceSuccessDialog({
  open,
  onOpenChange,
}: PostServiceSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-600">
            Service Posted Successfully!
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          Your service listing is now live. Add specific services to your
          listing in the Create Service tab.
        </p>
      </DialogContent>
    </Dialog>
  );
}
