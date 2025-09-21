import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onAgree,
  onDisagree,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Please review our privacy policy before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the actual privacy policy content.
            By clicking "Agree", you consent to our data collection and usage
            policies.
          </p>
          {/* Add more detailed privacy policy content here */}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onDisagree}>
            Disagree
          </Button>
          <Button onClick={onAgree}>Agree</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
