import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/design/components/ui/dialog";
import { ReactNode } from "react";
import { Button } from "@/design/components/ui/button";

interface IConfirmModalProps {
  title: string;
  children?: ReactNode;
  description?: string;

  isOpen?: boolean;
  onSelect: (data: boolean) => void;
  onOpenChange: (data: boolean) => void;
}
export default function ConfirmModal(props: IConfirmModalProps) {
  const { title, isOpen, description, children, onSelect, onOpenChange } =
    props;

  const propsDialog = isOpen !== undefined ? { open: isOpen } : {};

  return (
    <Dialog {...propsDialog} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger>
            <Button
              className="mr-4"
              variant={"outline"}
              onClick={() => onSelect(false)}
            >
              Cancelar
            </Button>

            <Button onClick={() => onSelect(true)}>Confirmar</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
