import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@hanapp-ph/commons';
import { DialogDescription } from '@radix-ui/react-dialog';

interface PostListingSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostListingSuccessDialog({
  open,
  onOpenChange,
}: PostListingSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-600">
            Service Listing Posted Successfully!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-700">
          Your service listing is now live. Add specific services to your
          listing in the Create Service tab.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
