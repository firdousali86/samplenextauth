"use client";

import Calendar from "react-calendar";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { fullDateToSimple, getOneDayAhead } from "@/app/lib/utils";
import "react-calendar/dist/Calendar.css";

export default function SideNavCalendar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return (
    <div>
      {pathname.toLowerCase().includes("attendance") && (
        <Calendar
          onChange={(selectedDate: any, _event: any) => {
            const currLocale = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const params = new URLSearchParams(searchParams);

            params.set(
              "target-start-date",
              fullDateToSimple(currLocale, selectedDate)
            );
            params.set(
              "target-end-date",
              getOneDayAhead(currLocale, selectedDate)
            );

            replace(`${pathname}?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
}
