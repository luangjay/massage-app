"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { Command } from "cmdk";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";

export function SearchShopInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [search, setSearch] = useState("");
  const tags = searchParams.getAll("tag");

  const addTag = useCallback(
    (tag: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      if (!updatedSearchParams.has("tag", tag)) {
        updatedSearchParams.append("tag", tag);
        router.replace(`?${updatedSearchParams.toString()}`);
      }
    },
    [router, searchParams]
  );

  const removeTag = useCallback(
    (tag: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("tag", tag);
      router.replace(`?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-start gap-2 overflow-auto whitespace-nowrap px-2 font-normal ring-gray-a7 scrollbar-hide"
          variant="outline"
          size="lg"
        >
          <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-gray-a8" />
          {tags.length === 0 ? (
            "Search by tags"
          ) : (
            <>
              {tags.length} tags
              <Separator orientation="vertical" />
              <div className="flex gap-1.5">
                {tags.map((tag) => (
                  <Badge key={tag} className="font-semibold" variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-64 p-2">
          <Command loop shouldFilter={false}>
            <div className="flex items-center px-3">
              <Label
                className="mr-2"
                onClick={() => void inputRef.current?.focus()}
              >
                <MagnifyingGlassIcon className="h-4 w-4 shrink-0 text-gray-a8" />
              </Label>
              <Command.Input
                className="flex h-10 w-full rounded bg-transparent text-sm outline-none placeholder:text-gray-a11 disabled:cursor-not-allowed disabled:text-gray-a8"
                placeholder="Search..."
                value={search}
                onValueChange={(value) => void setSearch(value)}
                ref={inputRef}
              />
            </div>
            <Separator className="mx-3 mb-2 w-auto" />
            <Command.List>
              {tags.length === 0 ? (
                <div className="flex h-[8.25rem] w-full items-center justify-center text-xs text-gray-a11">
                  <p className="max-w-[50%] text-center leading-normal">
                    Enter some tags...
                  </p>
                </div>
              ) : (
                <div className="h-[8.25rem] overflow-auto scrollbar-hide">
                  {tags.map((tag) => (
                    <Command.Item
                      key={tag}
                      className="relative flex select-none items-center gap-2 rounded-sm px-3 py-1.5 text-sm outline-none aria-selected:bg-gray-a3"
                      onSelect={() => {
                        removeTag(tag);
                        inputRef.current?.focus();
                      }}
                    >
                      <Checkbox checked={searchParams.has("tag", tag)} />
                      {tag}
                    </Command.Item>
                  ))}
                </div>
              )}
              <Separator className="mx-3 my-2 w-auto" />
              <Command.Item
                className="relative flex select-none items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm outline-none aria-disabled:text-gray-a8 aria-selected:bg-gray-a3"
                onSelect={() => {
                  addTag(search.trim());
                  inputRef.current?.focus();
                }}
                disabled={!search.trim()}
              >
                <PlusIcon className="mr-2 h-4 w-4 shrink-0" />
                Add
              </Command.Item>
            </Command.List>
          </Command>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
