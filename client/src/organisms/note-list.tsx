import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "../attoms/ui/scroll-area";
import { cn } from "../lib/utils";
import { Badge } from "../attoms/ui/badge";
import { ComponentProps } from "react";
import useMail from "../utils";
import { Note } from "../types";

type NoteListProps = {
  items: Note[];
};

export function MailList({ items }: NoteListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-[calc(100vh-185px)]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items &&
          items.map((item: Note) => (
            <button
              key={item._id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-white",
                mail.selected === item._id && "bg-muted"
              )}
              onClick={() =>
                setMail({
                  ...mail,
                  selected: item._id,
                })
              }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.title}</div>
                    {/* {!item.read && ( */}
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    {/* )} */}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail.selected === item._id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDistanceToNow(new Date(item.updatedAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{`by ${item.userName}`}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.content.substring(0, 300)}
              </div>
              {item.filters.length ? (
                <div className="flex items-center gap-2">
                  {/* {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))} */}
                </div>
              ) : null}
            </button>
          ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
