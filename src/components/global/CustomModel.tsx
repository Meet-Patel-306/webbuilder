"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModel } from "@/provider/model-provider";

type props = {
  title: string;
  subheading: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};
export default function CustomModel({
  title,
  subheading,
  defaultOpen,
  children,
}: props) {
  const { isOpen, setClose } = useModel();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
