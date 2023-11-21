"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { type Shop } from "@/types/base/shop";
import { deleteShop } from "@/actions/delete-shop";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/toaster";

type DeleteShopDialogProps = {
  shop: Shop;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteShopDialog({
  shop,
  open,
  onOpenChange,
}: DeleteShopDialogProps) {
  const router = useRouter();

  const [_open, _setOpen] = useState<boolean | undefined>(open ?? false);
  const [deleting, setDeleting] = useState(false);

  const handleAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleting(true);
    const response = await deleteShop(shop._id);
    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to delete shop.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "The shop has been deleted.",
      });
      router.refresh();
      _setOpen(false);
      onOpenChange?.(false);
    }
    setDeleting(false);
  };

  useEffect(() => {
    if (open !== undefined && open !== _open) {
      _setOpen(open);
      onOpenChange?.(open);
    }
  }, [_open, open, onOpenChange]);

  return (
    <AlertDialog
      open={_open}
      onOpenChange={(open) => {
        _setOpen(open);
        onOpenChange?.(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this massage shop?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="danger" disabled={deleting} asChild>
            <AlertDialogAction onClick={(...a) => void handleAction(...a)}>
              <TrashIcon className="h-4 w-4 shrink-0" />
              Delete
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
