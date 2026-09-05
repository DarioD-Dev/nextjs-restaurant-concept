// Single source of truth for the business's own contact details — the
// contact form sends here, and any page that displays an address/phone
// reads from here rather than repeating literals. Postal address stays in
// its local (German) form on both locales, same as a real business address
// would — opening hours are language content instead, so those live in
// messages/*.json (Contact.hours) rather than here.
export const RESTAURANT = {
  name: "Wurzelwerk",
  email: "dario.dominkovic@hotmail.com",
  phone: "+43 1 890 12 34",
  address: {
    street: "Margaretenstraße 45",
    postalCode: "1050",
    city: "Wien",
  },
} as const;
