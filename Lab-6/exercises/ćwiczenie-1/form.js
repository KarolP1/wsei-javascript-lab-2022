/**
 * Napisz skrypt wykonaującywalidację formularza z pliku `form.html` wg założeń:
 * - nie ma połączenia między Krakowem a Gdańskiem i między Gdańskiem a Poznaniem
 * - data w polu "start-date" nie może być wcześniejsza od bieżącej daty
 * - data w polu "end-date" musi być późniejsza od daty w "start-date"
 * Rozwiązanie proste polega na zablokowaniu wysłania formularza dla niepoprawnych danych np. gdy wybrano Kraków i Gdańsk lub 1.02.2023 i 1.02.2023,
 * po próbie wysłania z błędami należy użytkownikowi wyświetlić błędy w odpowiednich elementach <span> pod polami formularza.
 * Rozwiązanie zaawansowane polega na dynamicznych zmianach w formularzu (zmian atrybutów pól), aby użytkownik nie mógł wybrać
 * niepoprawnych danych.
 * Uwaga!
 * Nie można zmieniać pliku `form.html`!
 * Wskazówki
 * zdarzenie 'input' wywoływane jest, gdy użytkownik wybierze lub wpisze dane w polu formularza
 * zdarzenie 'change' wywoływane jest, gdy użytkownik tylko zmieni wartość w polu
 * funkcja obiektu zdarzenia anulująca normalny tryb obsługi zdarzenia to preventDefault(), ale nie blokuje propagacji
 * Informacje na temat walidacji fomrularzy w JS: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
 */
const form = document.querySelector("form");
const startLocation = document.querySelector("#start-location");
const endLocation = document.querySelector("#end-location");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const errorSpans = document.querySelectorAll(".error");

window.addEventListener("load", () => {
  errorSpans.forEach((span) => {
    span.textContent = "";
  });
});

form.addEventListener("submit", (event) => {
  // prevent form submission
  event.preventDefault();

  // clear all error messages
  errorSpans.forEach((span) => {
    span.textContent = "";
  });

  // validate form
  let isValid = true;

  // check if start location is Krakow and end location is Gdansk, or if start location is Gdansk and end location is Poznan
  if (
    (startLocation.value === "S2" && endLocation.value === "E4") ||
    (startLocation.value === "S4" && endLocation.value === "E5")
  ) {
    errorSpans[0].textContent = "Brak połączenia między tymi miastami";
    errorSpans[1].textContent = "Brak połączenia między tymi miastami";
    isValid = false;
  } else {
    errorSpans[0].textContent = "";
    errorSpans[1].textContent = "";
  }

  // check if start date is earlier than current date
  const currentDate = new Date();
  if (startDate.valueAsDate < currentDate) {
    isValid = false;
    errorSpans[2].textContent =
      "Data rozpoczęcia pobytu nie może być wcześniejsza od bieżącej daty";
    errorSpans[3].textContent =
      "Data zakończenia pobytu musi być późniejsza od daty rozpoczęcia pobytu";
  } else {
    errorSpans[2].textContent = "";
    errorSpans[3].textContent = "";
  }

  // check if end date is earlier than start date
  if (endDate.valueAsDate < startDate.valueAsDate) {
    isValid = false;
  } else {
  }

  // submit form if all checks pass
  if (isValid) {
    form.submit();
  }
});
