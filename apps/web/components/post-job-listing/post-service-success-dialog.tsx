import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@hanapp-ph/commons';
import { DialogDescription } from '@radix-ui/react-dialog';

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
        <DialogDescription className="text-gray-700">
          Your service has successfully been added to your listing.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
