// Business fact for slot math only — the displayed opening hours text
// (Footer.hours in messages/*.json) stays the single source for what a
// visitor reads, this is the same fact in a form a function can compute
// with. Tue–Sun 11:30–22:00, closed Mondays.
const OPEN_WEEKDAY = [2, 3, 4, 5, 6, 0] as const; // Date#getDay(): 0 = Sunday
const OPENS = "11:30";
const CLOSES = "22:00";

function isOpenDay(date: Date): boolean {
  return (OPEN_WEEKDAY as readonly number[]).includes(date.getDay());
}

/**
 * The next `count` open days, starting tomorrow — a reservation "today, in
 * ten minutes" would be dishonestly optimistic for a site with no real
 * floor plan behind it. Closed Mondays simply don't appear, no gaps in the
 * list.
 */
export function nextOpenDays(count: number, from: Date = new Date()): Date[] {
  const days: Date[] = [];
  const day = new Date(from);
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() + 1);
  while (days.length < count) {
    if (isOpenDay(day)) days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return days;
}

/**
 * Start times in a 30-minute grid that still leave `diningMinutes` before
 * closing. No invented "already booked" gaps — there's no real floor plan
 * behind this, and faking occupancy would be exactly the kind of prop
 * these sites avoid. Every slot shown is genuinely available.
 */
export function timeSlots(date: Date, diningMinutes = 90, stepMinutes = 30): string[] {
  if (!isOpenDay(date)) return [];

  const [openH, openM] = OPENS.split(":").map(Number);
  const [closeH, closeM] = CLOSES.split(":").map(Number);
  const start = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  const slots: string[] = [];
  for (let t = start; t + diningMinutes <= end; t += stepMinutes) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}
