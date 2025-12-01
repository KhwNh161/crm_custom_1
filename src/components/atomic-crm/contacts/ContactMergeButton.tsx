import { Merge } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { ContactMergeDialog } from "./ContactMergeDialog";

export const ContactMergeButton = () => {
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="h-6 cursor-pointer"
        size="sm"
        onClick={() => setMergeDialogOpen(true)}
      >
        <Merge className="w-4 h-4" />
        Gộp với Liên hệ Khác
      </Button>
      <ContactMergeDialog
        open={mergeDialogOpen}
        onClose={() => setMergeDialogOpen(false)}
      />
    </>
  );
};
